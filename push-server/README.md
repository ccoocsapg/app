# CCOO CSAPG · Web Push

Servidor mínimo para enviar notificaciones de nuevas publicaciones de la web pública.

## Privacidad por diseño

El servidor guarda únicamente la suscripción técnica Web Push necesaria para entregar avisos: endpoint, clave pública `p256dh`, clave `auth` y fecha de alta. No pide ni almacena nombre, email, contenido de formularios, búsquedas ni datos de las herramientas.

Las suscripciones inválidas (HTTP 404/410 del proveedor Push) se eliminan automáticamente.

## Compatibilidad

Web Push depende del navegador y sistema operativo. En iPhone/iPad, la web debe estar añadida a la pantalla de inicio y se necesita iOS/iPadOS 16.4 o posterior. En Android y escritorio funciona en navegadores modernos compatibles.

## Puesta en marcha

1. Instalar Node.js 20+.
2. `npm install`
3. Generar claves VAPID con `npm run generate-vapid`.
4. Copiar `.env.example` a un fichero de entorno seguro. **Nunca subir la clave privada al repositorio.**
5. Ejecutar detrás de HTTPS (Nginx/Caddy/Traefik) con un subdominio propio.
6. Configurar `push-config.json` de la web con:
   - `enabled: true`
   - `apiBase: "https://<subdominio-push>"`
   - `vapidPublicKey: "<clave pública VAPID>"`
7. Reiniciar el servicio.

## Avisos automáticos

Cada 5 minutos (configurable con `POLL_MS`) el servidor consulta `data/published.json` de la web. El primer arranque memoriza el estado y no notifica contenido antiguo. Después envía un aviso cuando detecta:
- un documento nuevo,
- una reunión/comunicado nuevo,
- o una entrada existente que cambia.

## Endpoint manual

`POST /v1/broadcast` requiere `Authorization: Bearer <ADMIN_TOKEN>` y permite enviar un aviso manual.

## HTTPS

La API Push y el registro del Service Worker requieren contexto seguro. GitHub Pages ya usa HTTPS; el servidor de suscripciones también debe publicarse por HTTPS.
