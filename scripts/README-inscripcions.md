# Inscripcions · Comissions mixtes 2026 (CCOO CSAPG)

La web està publicada a https://ccoocsapg.github.io/app/inscripcio-comissions.html, amb un camp nom/cognoms, vuit sessions i un botó Enviar.
No és anunciada a Inici/Eines i porta noindex, però la URL continua sent pública.

Google Sheet privat: https://docs.google.com/spreadsheets/d/1TSVtbABW4MEgLFufaRp8C5z2rD-_F_L5QEjDkymwjoA/edit

## Activar el registre directe (Google Apps Script)

1. Obre el Google Sheet anterior amb un compte que hi tingui permís d'edició.
2. Extensions > Apps Script, i enganxa tot el contingut del fitxer scripts/inscripcions-backend.gs.
3. Implementa > Nova implementació > Aplicació web.
   - Executa com a: Jo.
   - Accés: Qualsevol persona, perquè el POST pugui arribar-hi sense login (veure advertiment de seguretat a baix).
4. Autoritza permisos i copia l'URL final acabada en /exec (no /dev).
5. Edita inscripcions-config.json al mateix repositori i posa enabled=true i endpoint="URL_COMPLETA_DE_L_APLICACIO_WEB".
6. Fes una prova i comprova que a la pestanya Inscripcions apareix una fila per cada sessió seleccionada. Repeteix-la per comprovar deduplicació.

## Funcionament

- Fins que no s'activi Apps Script, el botó Enviar obre el correu del dispositiu amb la sol·licitud preparada: l'usuari ha de confirmar l'enviament. No es confirma ni es desa automàticament al full.
- Amb Apps Script desplegat, el formulari envia via POST i el servidor mostra una pàgina de confirmació NOMÉS si l'escriptura al Google Sheet ha funcionat.
- Al full Inscripcions, una fila per persona i sessió, estat inicial Pendent i no duplicació per nom + sessió.
- Al full Sessions, recomptes automàtics de candidatures i designacions.
- La part social decideix les designacions, no es fa cap selecció automàtica.
- La sessió de l'11/11 s'ha eliminat del formulari en aplicar la rectificació del 16/10.

## Privacitat i restriccions d'accés

Important: la web és pública encara que no s'anunciï i els cercadors rebin noindex.
Amb Apps Script publicat per a Qualsevol persona, qui en conegui l'URL pot enviar un nom.
Si cal garantir que només hi participin persones autentificades del comitè, és imprescindible afegir autenticació/autorització; ocultar l'enllaç no és suficient.
El full de càlcul ha de romandre privat, amb permisos limitats. No es demanen DNI, telèfons ni dades de salut.
Cal aplicar els criteris de conservació i informació de privacitat de CCOO.
