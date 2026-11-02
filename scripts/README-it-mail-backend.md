# Recepció de casos IT i permís per naixement · CCOO CSAPG

**Estat inicial:** el botó de correu de la web es manté desactivat fins a tenir una prova d'entrega real. WhatsApp no es modifica.

## Activació (única vegada)

1. Entra a https://script.google.com amb un compte Google autoritzat per a la gestió sindical (preferiblement el compte corporatiu de CCOO). Cal que aquest compte pugui fer enviaments amb MailApp.
2. Crea un projecte nou, anomena'l `CCOO CSAPG - Formulari IT` i substitueix el contingut de `Code.gs` amb el codi de `scripts/it-mail-backend.gs`.
3. Prem **Desplegar > Desplegament nou > Aplicació web**. Executar com a **Jo**; accés **Qualsevol persona**. Si l'administrador del compte ho impedeix, no es podrà desplegar amb aquell compte.
4. Autoritza el permís d'enviament de correu que Google et sol·liciti. Copia l'URL completa que acaba en `/exec` (no pas l'URL `/dev`).
5. Desplega el formulari **només en mode de prova** actualitzant `reclamacio-hores-mail-config.json` amb aquesta URL. Mantén `enabled:false` fins que s'hagi comprovat que el missatge de prova arriba a **ccoohrsc@csapg.cat**.
6. Després d'una prova real confirmada, posa `enabled:true` i publica. El formulari enviarà dades amb un POST estàndard al web app i Google mostrarà una pàgina amb la confirmació o l'error.

## Privacitat i seguretat

- El codi no desa dades en cap full de càlcul ni en el navegador. Envia un correu a `ccoohrsc@csapg.cat` des del compte propietari que ha autoritzat MailApp.
- Recull únicament nom, email de resposta, tipus d'absència laboral, any, possible incidència i observacions opcionals. No recollir ni demanar diagnòstics, informes ni informació clínica.
- Un honeypot i un petit límit de duplicats ajuden a reduir l'abús, però no substitueixen un control antispam complet. Comprova quotes, dades de caràcter especial i permisos de Google Workspace abans d'obrir-lo a tota la plantilla.
- L'accés "Qualsevol persona" implica un endpoint públic. No enganxis cap token privat ni credencial en fitxers accessibles des de GitHub Pages.
