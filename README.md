# CCOO Sanitat · CSAPG

Aplicación web/PWA pública para trabajadores y trabajadoras del CSAPG.

## Objetivos
- Consulta de documentos oficiales y pactos.
- Previsualización y descarga desde Google Drive.
- Resúmenes de reuniones/comunicados claramente diferenciados de la fuente oficial.
- Herramientas prácticas (incluida la calculadora de convocatorias internas).
- Contacto y sugerencias mediante correo electrónico sin almacenar datos en la web.
- Instalación como acceso directo/app en móvil y escritorio.

## Publicación
Repositorio pensado para GitHub Pages.

- Source: Deploy from a branch
- Branch: main
- Folder: /(root)

URL prevista:
https://ccoocsapg.github.io/app/

## Google Drive
Los documentos enlazados mediante Drive deben compartirse como **“Cualquier persona con el enlace”** si se desea que puedan verse desde una web pública sin iniciar sesión.

La app usa:
- Vista: `https://drive.google.com/file/d/<ID>/view`
- Preview: `https://drive.google.com/file/d/<ID>/preview`
- Descarga: `https://drive.google.com/uc?export=download&id=<ID>`

## Contacto
El formulario no almacena información ni usa servicios externos de formularios. Genera un correo preparado en el dispositivo del usuario. El correo de destino se configura en `CONFIG.contactEmail` dentro de `app.js`.

## Contenido
Los resúmenes son informativos. Siempre debe prevalecer el texto del convenio, pacto, procedimiento o comunicación oficial correspondiente.
