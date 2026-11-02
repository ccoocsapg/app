# Recepció de casos IT i permís per naixement · CCOO CSAPG

**Estat inicial:** el botó de correu de la web es manté desactivat fins a tenir una prova d'entrega real. WhatsApp no es modifica.

## Activació (única vegada)

1. Entra a https://script.google.com amb un compte Google autoritzat per a la gestió sindical (preferiblement el compte corporatiu de CCOO). Cal que aquest compte pugui fer enviaments amb MailApp.
2. Crea un projecte nou, anomena'l `CCOO CSAPG - Formulari IT` i substitueix el contingut de `Code.gs` amb el codi de `scripts/it-mail-backend.gs`.
3. A l'editor d'Apps Script, selecciona la funció **`CCOO_provaEnviament`** al menú de funcions i prem **Executar**. Autoritza l'enviament de correu amb el compte sindical quan Google ho demani. **Revisa que aquest correu de prova hagi arribat realment a `ccoohrsc@csapg.cat`**, també a spam i quarantena si cal. Fins llavors, no publiquis el servei.
4. Prem **Desplegar > Desplegament nou > Aplicació web**. Executar com a **Jo**; accés **Qualsevol persona**. Si l'administrador del compte ho impedeix, no es podrà desplegar amb aquell compte. Copia l'URL completa que acaba en `/exec` (no `/dev`).
5. Posa l'URL dins `reclamacio-hores-mail-config.json`, a `endpoint`. Mantén `enabled:false` fins que estigui confirmada la recepció de la prova de l'editor.
6. Un cop confirmada la recepció i verificat que el desplegament funciona, canvia `enabled:true`. L'opció de correu s'activarà a la web; mostrarà el resultat real de Google en una pestanya nova. Fes una prova del formulari amb **dades fictícies** abans d'utilitzar-lo amb persones treballadores.

## Privacitat i seguretat

- El codi no desa dades en cap full de càlcul ni en el navegador. Envia un correu a `ccoohrsc@csapg.cat` des del compte propietari que ha autoritzat MailApp.
- Recull únicament nom, email de resposta, tipus d'absència laboral, any, possible incidència i observacions opcionals. No recollir ni demanar diagnòstics, informes ni informació clínica.
- Un honeypot i un petit límit de duplicats ajuden a reduir l'abús, però no substitueixen un control antispam complet. Comprova quotes, dades de caràcter especial i permisos de Google Workspace abans d'obrir-lo a tota la plantilla.
- L'accés "Qualsevol persona" implica un endpoint públic. No enganxis cap token privat ni credencial en fitxers accessibles des de GitHub Pages.
