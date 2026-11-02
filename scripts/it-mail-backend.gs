/**
 * CCOO CSAPG · Recepció de casos IT / naixement.
 * Google Apps Script, execució com a propietari, accés "Qualsevol persona".
 * No introdueix cap contrasenya, token SMTP ni dades laborals al codi públic.
 * ACTIVAR només després de prova real amb la bústia sindical.
 */
var CCOO_CASE_DESTINATION = 'ccoohrsc@csapg.cat';
var CCOO_CASE_PAGE = 'https://ccoocsapg.github.io/app/reclamacio-hores-it-naixement.html';

/**
 * Prova inicial: executar manualment des de l'editor d'Apps Script,
 * amb el compte sindical que autoritzarà el servei.
 * Només envia un correu de prova, sense dades personals.
 */
function CCOO_provaEnviament() {
  MailApp.sendEmail({
    to: CCOO_CASE_DESTINATION,
    subject: 'CCOO CSAPG · PROVA DE RECEPCIÓ DEL FORMULARI',
    body: 'Aquest és un missatge de prova enviat des del compte Google autoritzat de CCOO. Si arriba a la bústia ccoohrsc@csapg.cat, la recepció funciona. No conté cap dada de cap treballador.',
    name: 'CCOO Sanitat · CSAPG'
  });
  return 'Sol·licitud d’enviament efectuada. Comprova l’entrada a la bústia sindical.';
}

function doGet() {
  return CCOO_renderResult_(false, 'Aquest servei només accepta enviaments des del formulari.');
}

function doPost(e) {
  var p = (e && e.parameter) || {};
  var cacheKey = '';
  try {
    // Honeypot: les persones no veuen aquest camp.
    if (String(p.website || '').trim() !== '') {
      return CCOO_renderResult_(false, 'La sol·licitud no s’ha acceptat.');
    }
    if (p.accepted !== 'yes') {
      return CCOO_renderResult_(false, 'Cal confirmar la informació de privacitat.');
    }
    var name = CCOO_clean_(p.person, 100);
    var email = CCOO_clean_(p.email, 180).toLowerCase();
    var year = CCOO_clean_(p.year, 12);
    var leave = CCOO_clean_(p.leave, 12);
    var issue = CCOO_clean_(p.issue, 16);
    var centre = CCOO_clean_(p.centre, 100);
    var more = CCOO_clean_(p.more, 250);

    var leaveLabels = {
      it: 'Incapacitat temporal (IT)',
      birth: 'Permís per naixement',
      both: 'IT i permís per naixement'
    };
    var issueLabels = {
      negative: 'Hores negatives',
      recover: 'Hores o dies recuperats',
      changes: 'Canvis al calendari',
      other: 'Una altra incidència',
      unsure: 'Dubtes / no ho sé'
    };
    if (name.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
        !['2025', '2026', '2025-2026'].includes(year) ||
        !Object.prototype.hasOwnProperty.call(leaveLabels, leave) ||
        !Object.prototype.hasOwnProperty.call(issueLabels, issue)) {
      return CCOO_renderResult_(false, 'Falten dades o hi ha alguna dada no vàlida. Torna al formulari.');
    }
    // Limitació bàsica contra enviaments duplicats; no guarda la sol·licitud.
    var digest = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256, email + '|' + year + '|' + leave + '|' + issue);
    cacheKey = 'case-' + Utilities.base64EncodeWebSafe(digest).substring(0, 40);
    var cache = CacheService.getScriptCache();
    if (cache.get(cacheKey)) {
      return CCOO_renderResult_(false, 'Ja hem rebut una sol·licitud equivalent recentment. Si és una altra incidència, escriu-nos per WhatsApp.');
    }
    cache.put(cacheKey, '1', 90);

    var body = [
      'Nova comunicació des del formulari de CCOO CSAPG',
      '',
      'Nom i cognoms: ' + name,
      'Correu de resposta: ' + email,
      'Situació: ' + leaveLabels[leave],
      'Any: ' + year,
      'Possible incidència: ' + issueLabels[issue],
      'Centre o servei: ' + (centre || 'No indicat'),
      'Observacions: ' + (more || 'Sense observacions'),
      '',
      'Enviat mitjançant: ' + CCOO_CASE_PAGE,
      'No es demanen informes mèdics ni diagnòstics.'
    ].join('\n');
    MailApp.sendEmail({
      to: CCOO_CASE_DESTINATION,
      replyTo: email,
      name: 'CCOO Sanitat · CSAPG',
      subject: 'CCOO CSAPG · Cas IT/naixement · ' + year,
      body: body
    });
    return CCOO_renderResult_(true, 'La teva comunicació s’ha enviat correctament al correu sindical. Gràcies per col·laborar.');
  } catch (err) {
    if (cacheKey) {
      try { CacheService.getScriptCache().remove(cacheKey); } catch (ignored) {}
    }
    // Mai retornem errors interns ni dades personals en una pàgina pública.
    return CCOO_renderResult_(false, 'No s’ha pogut confirmar el lliurament. Torna-ho a provar o contacta per WhatsApp.');
  }
}

function CCOO_clean_(value, maxLen) {
  return String(value || '').trim().slice(0, maxLen).replace(/[\u0000-\u001f\u007f]+/g, ' ');
}

function CCOO_renderResult_(ok, message) {
  var col = ok ? '#208f48' : '#c52b16';
  var title = ok ? 'Comunicació enviada' : 'Enviament no confirmat';
  var html = '<!doctype html><html lang="ca"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>CCOO · ' + title + '</title></head><body style="background:#f6f5f2;color:#1b1b1b;font:16px/1.55 Arial,Helvetica,sans-serif;margin:0">' +
    '<main style="max-width:620px;margin:55px auto;padding:30px;background:#fff;border-top:8px solid ' + col + '">' +
    '<p style="font-size:13px;color:#555;font-weight:bold">CCOO SANITAT · CSAPG</p>' +
    '<h1 style="font-size:30px;line-height:1.16">' + title + '</h1>' +
    '<p>' + message + '</p>' +
    '<a href="' + CCOO_CASE_PAGE + '" target="_top" style="display:inline-block;margin-top:16px;padding:14px 20px;background:#c92e1a;color:white;text-decoration:none;font-weight:bold">Tornar al formulari</a>' +
    '</main></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('CCOO Sanitat · CSAPG');
}
