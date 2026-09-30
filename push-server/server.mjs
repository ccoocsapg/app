import express from 'express';
import cors from 'cors';
import webpush from 'web-push';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const PUBLIC_ORIGINS = String(process.env.PUBLIC_ORIGINS || 'https://ccoocsapg.github.io')
  .split(',').map(x => x.trim()).filter(Boolean);
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:ccoohrsc@csapg.cat';
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const MANIFEST_URL = process.env.MANIFEST_URL || 'https://ccoocsapg.github.io/app/data/published.json';
const POLL_MS = Math.max(60000, Number(process.env.POLL_MS || 300000));
const DATA_DIR = path.resolve(process.env.DATA_DIR || './data');
const SUBS_FILE = path.join(DATA_DIR, 'subscriptions.json');
const STATE_FILE = path.join(DATA_DIR, 'manifest-state.json');

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.warn('[push] VAPID keys are not configured. Subscriptions can be stored but notifications cannot be sent.');
} else {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

await fs.mkdir(DATA_DIR, { recursive: true });

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch { return fallback; }
}
async function writeJson(file, value) {
  const temp = file + '.tmp';
  await fs.writeFile(temp, JSON.stringify(value, null, 2), { mode: 0o600 });
  await fs.rename(temp, file);
}
function hashItem(item) {
  return crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');
}
function safeSubscription(input) {
  const sub = input?.subscription || input;
  if (!sub || typeof sub.endpoint !== 'string' || !sub.endpoint.startsWith('https://')) return null;
  if (!sub.keys || typeof sub.keys.p256dh !== 'string' || typeof sub.keys.auth !== 'string') return null;
  return { endpoint: sub.endpoint, expirationTime: sub.expirationTime ?? null, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } };
}

async function listSubscriptions() {
  const data = await readJson(SUBS_FILE, []);
  return Array.isArray(data) ? data : [];
}
async function saveSubscriptions(items) {
  await writeJson(SUBS_FILE, items);
}
async function upsertSubscription(subscription) {
  const items = await listSubscriptions();
  const next = items.filter(x => x.subscription?.endpoint !== subscription.endpoint);
  next.push({ subscription, createdAt: new Date().toISOString() });
  await saveSubscriptions(next);
}
async function removeSubscription(endpoint) {
  const items = await listSubscriptions();
  await saveSubscriptions(items.filter(x => x.subscription?.endpoint !== endpoint));
}

async function notifyAll(payload) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return { sent: 0, removed: 0, skipped: true };
  const items = await listSubscriptions();
  let sent = 0, removed = 0;
  const keep = [];
  for (const item of items) {
    try {
      await webpush.sendNotification(item.subscription, JSON.stringify(payload), { TTL: 86400 });
      sent++;
      keep.push(item);
    } catch (error) {
      const code = error?.statusCode;
      if (code === 404 || code === 410) removed++;
      else {
        keep.push(item);
        console.error('[push] send failed', code || '', error?.message || error);
      }
    }
  }
  if (removed) await saveSubscriptions(keep);
  return { sent, removed, skipped: false };
}

function itemLabel(item, type) {
  const title = item?.title?.ca || item?.title?.es || item?.title || '';
  return { title: String(title), type };
}
function flattenManifest(data) {
  const rows = [];
  for (const doc of Array.isArray(data?.documents) ? data.documents : []) {
    if (!doc?.id) continue;
    rows.push({ key: 'doc:' + doc.id, hash: hashItem(doc), item: doc, ...itemLabel(doc, 'document') });
  }
  for (const meeting of Array.isArray(data?.meetings) ? data.meetings : []) {
    if (!meeting?.id) continue;
    rows.push({ key: 'meeting:' + meeting.id, hash: hashItem(meeting), item: meeting, ...itemLabel(meeting, 'meeting') });
  }
  return rows;
}

let pollRunning = false;
async function pollManifest() {
  if (pollRunning) return;
  pollRunning = true;
  try {
    const response = await fetch(MANIFEST_URL, { cache: 'no-store', headers: { 'User-Agent': 'CCOO-CSAPG-Push/1.0' } });
    if (!response.ok) throw new Error('Manifest HTTP ' + response.status);
    const manifest = await response.json();
    const rows = flattenManifest(manifest);
    const previous = await readJson(STATE_FILE, null);
    const currentMap = Object.fromEntries(rows.map(x => [x.key, x.hash]));

    // Primer arranque: memoriza el estado sin enviar una avalancha de avisos antiguos.
    if (!previous || typeof previous !== 'object' || !previous.items) {
      await writeJson(STATE_FILE, { checkedAt: new Date().toISOString(), items: currentMap });
      console.log('[push] initial manifest state stored:', rows.length, 'items');
      return;
    }

    const changes = rows.filter(row => previous.items[row.key] !== row.hash);
    await writeJson(STATE_FILE, { checkedAt: new Date().toISOString(), items: currentMap });

    for (const change of changes) {
      const isNew = !previous.items[change.key];
      const isDoc = change.type === 'document';
      const payload = {
        title: isNew
          ? (isDoc ? 'CCOO CSAPG · Nou document' : 'CCOO CSAPG · Nova informació')
          : (isDoc ? 'CCOO CSAPG · Document actualitzat' : 'CCOO CSAPG · Informació actualitzada'),
        body: change.title || 'Hi ha una novetat publicada.',
        url: isDoc
          ? 'https://ccoocsapg.github.io/app/#/documents'
          : 'https://ccoocsapg.github.io/app/#/reunions',
        tag: change.key,
        renotify: false
      };
      const result = await notifyAll(payload);
      console.log('[push] manifest change', change.key, result);
    }
  } catch (error) {
    console.error('[push] manifest poll failed:', error?.message || error);
  } finally {
    pollRunning = false;
  }
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || PUBLIC_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error('Origin not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/health', async (_req, res) => {
  const subs = await listSubscriptions();
  res.json({ ok: true, subscriptions: subs.length, pushReady: !!(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) });
});

app.post('/v1/subscribe', async (req, res) => {
  const subscription = safeSubscription(req.body);
  if (!subscription) return res.status(400).json({ ok: false, error: 'invalid_subscription' });
  await upsertSubscription(subscription);
  res.status(201).json({ ok: true });
});

app.post('/v1/unsubscribe', async (req, res) => {
  const endpoint = String(req.body?.endpoint || '');
  if (endpoint) await removeSubscription(endpoint);
  res.json({ ok: true });
});

app.post('/v1/broadcast', async (req, res) => {
  if (!ADMIN_TOKEN || req.get('authorization') !== 'Bearer ' + ADMIN_TOKEN) {
    return res.status(401).json({ ok: false });
  }
  const payload = {
    title: String(req.body?.title || 'CCOO CSAPG'),
    body: String(req.body?.body || 'Hi ha una nova informació publicada.'),
    url: String(req.body?.url || 'https://ccoocsapg.github.io/app/#/inicio'),
    tag: String(req.body?.tag || 'ccoo-csapg-manual'),
    renotify: !!req.body?.renotify
  };
  const result = await notifyAll(payload);
  res.json({ ok: true, ...result });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('[push] listening on http://127.0.0.1:' + PORT);
  pollManifest();
  setInterval(pollManifest, POLL_MS).unref();
});
