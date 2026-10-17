/**
 * CCOO CSAPG · Registre intern de comissions mixtes (novembre 2026).
 * Vinculat a la pàgina pública inscripcio-comissions.html.
 *
 * Desplegament: Extensió > Apps Script (a l'arxiu de Google Sheets).
 * Desplega com aplicació web executant-la amb el teu compte.
 *
 * L'URL de /exec només s'ha d'afegir a inscripcions-config.json després
 * de comprovar que l'aplicació web ha estat desplegada correctament.
 */
const DOCUMENT_ID = '1TSVtbABW4MEgLFufaRp8C5z2rD-_F_L5QEjDkymwjoA';
const TAB_NAME = 'Inscripcions';
const TZ = 'Europe/Madrid';
const BACK_URL = 'https://ccoocsapg.github.io/app/inscripcio-comissions.html';
const SESSIONS = Object.freeze({
  '2026-11-02-TCAI-HRSC': ['02/11/2026','09:30–12:00','TCAI','HRSC',"Sala d'actes"],
  '2026-11-02-PORT-HRSC': ['02/11/2026','12:00–13:30','Portalliteres','HRSC',"Sala d'actes"],
  '2026-11-03-SDI-HCAP': ['03/11/2026','09:30–13:00','Tècnics SDI','HCAP','Sala Sumoll'],
  '2026-11-04-TCAI-HCAP': ['04/11/2026','09:30–13:00','TCAI','HCAP','Sala Xarel·lo'],
  '2026-11-05-INF-HCAP': ['05/11/2026','09:30–13:00','Infermeria','HCAP','Sala Sumoll'],
  '2026-11-09-TCAI-HSAA': ['09/11/2026','09:30–13:00','TCAI','HSAA','Sala Formació'],
  '2026-11-10-INF-HCAP': ['10/11/2026','09:30–13:00','Infermeria','HCAP','Sala Sumoll'],
  '2026-11-12-INF-HCAP': ['12/11/2026','09:30–13:00','Infermeria','HCAP','Sala Sumoll']
});

function doGet() {
  return page_(false, 'Enllaç de registre', 'Utilitza el formulari de CCOO CSAPG per enviar una sol·licitud.');
}

function doPost(e) {
  const rawName = String(e && e.parameter && e.parameter.fullName || '');
  const person = rawName.normalize('NFKC').replace(/[\u0000-\u001F\u007F]/g,' ').replace(/\s+/g,' ').trim();
  let selected = e && e.parameters && e.parameters.sessions || [];
  if (!Array.isArray(selected)) selected = [selected];

  // Camp trampa: no es desa el contingut de bots.
  if (e && e.parameter && String(e.parameter.website || '').trim()) {
    return page_(true, 'Sol·licitud rebuda', 'La petició s’ha processat.');
  }
  if (person.length < 4 || person.length > 120) {
    return page_(false, 'Revisa el nom', 'Escriu el teu nom i cognoms.');
  }

  const sessions = [...new Set(selected.map(String))];
  if (!sessions.length || sessions.length > 8 || sessions.some(x => !Object.prototype.hasOwnProperty.call(SESSIONS,x))) {
    return page_(false, 'Falta seleccionar una sessió', 'Torna al formulari i marca almenys una opció vàlida.');
  }

  const mutex = LockService.getScriptLock();
  try {
    mutex.waitLock(15000);
    const document = SpreadsheetApp.openById(DOCUMENT_ID);
    const sheet = document.getSheetByName(TAB_NAME);
    if (!sheet) throw new Error('No existeix la pestanya Inscripcions.');
    const bottom = sheet.getLastRow();
    const previous = bottom > 1 ? sheet.getRange(2,2,bottom-1,2).getDisplayValues() : [];
    const existing = new Set(previous.map(row => key_(row[0],row[1])));
    const seen = new Set();
    const now = Utilities.formatDate(new Date(),TZ,'dd/MM/yyyy HH:mm:ss');
    const safeName = /^[=+\-@]/.test(person) ? "'" + person : person;
    const entries = [];
    for(const sessionId of sessions){
      const key = key_(safeName,sessionId);
      if(existing.has(key) || seen.has(key))continue;
      seen.add(key);
      const record = SESSIONS[sessionId];
      entries.push([now,safeName,sessionId,record[0],record[1],record[2],record[3],record[4],'Pendent','']);
    }
    if(entries.length){
      sheet.getRange(sheet.getLastRow()+1,1,entries.length,10).setValues(entries);
      SpreadsheetApp.flush();
    }
    return page_(true,'Inscripció registrada',
      entries.length
        ? 'Hem rebut la teva disponibilitat per a ' + entries.length + (entries.length===1?' sessió.':' sessions.') + ' La designació es comunicarà més endavant.'
        : 'Aquestes sessions ja figuraven registrades amb el teu nom. No hem creat cap duplicat.'
    );
  } catch (error) {
    console.error('CCOO CSAPG: ERROR DE REGISTRE',error);
    return page_(false,'No s’ha pogut registrar','No hem pogut desar la sol·licitud. Torna-ho a provar o comunica-ho a CCOO HRSC.');
  } finally {
    try {mutex.releaseLock()}catch(ignore){}
  }
}

function key_(name,id){
  return String(name).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim() + '\u0000' + String(id);
}

function htmlEscape_(text){
  return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function page_(ok,title,message){
  const page='<!doctype html><html lang="ca"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<title>'+htmlEscape_(title)+' · CCOO CSAPG</title>'+
    '<style>body{margin:0;background:#f4f4f4;font:16px/1.5 Arial,sans-serif;color:#191919}main{margin:10vh auto;max-width:520px;padding:28px;background:#fff;border-top:7px solid #D42E12}'+
    'h1{font-size:27px;margin:5px 0 12px}p{color:#444}a{display:inline-block;background:#D42E12;padding:12px 18px;color:white;text-decoration:none;font-weight:bold;margin-top:16px}</style>'+
    '</head><body><main><strong>CCOO Sanitat · CSAPG</strong><h1>'+htmlEscape_(title)+'</h1><p>'+htmlEscape_(message)+'</p>'+
    '<a href="'+BACK_URL+'">Torna al formulari</a></main></body></html>';
  return HtmlService.createHtmlOutput(page).setTitle(title + ' · CCOO CSAPG');
}