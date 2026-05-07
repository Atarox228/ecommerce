# Ecommerce Tia

Aplicación de ecommerce construida con React + Vite, con un backend ligero para leer el catálogo desde Google Sheets.

## Desarrollo local

Instala dependencias y levanta el frontend:

```bash
npm install
npm run dev
```

Si quieres usar el proxy local del catálogo, ejecuta también:

```bash
npm run start:server
```

El frontend consume el endpoint `/api/catalogo`, que en local responde desde `server.js` y en Vercel desde la función serverless.

## Variables de entorno

El backend necesita estas variables:

- `SHEET_ID`: ID de la hoja de Google Sheets.
- `GID`: gid de la pestaña que contiene el catálogo.
- `CACHE_TTL_SECONDS`: tiempo de caché en segundos. Opcional, por defecto `3600`.

Puedes definirlas en un archivo `.env` para desarrollo local y en las Environment Variables de Vercel para producción.

## Deploy en Vercel

Este proyecto está preparado para desplegarse como una SPA con una función serverless para el catálogo.

1. Sube el repositorio a Vercel.
2. Usa la configuración por defecto de Vite para el frontend.
3. Define las variables `SHEET_ID`, `GID` y `CACHE_TTL_SECONDS` en el proyecto de Vercel.
4. La ruta `/api/catalogo` se resuelve con `api/catalogo.js`.
5. Las rutas del frontend se reescriben a `index.html` para evitar errores al recargar páginas.

## Estructura relevante

- `server.js`: servidor Express para desarrollo local.
- `catalogo-service.js`: lógica compartida para leer y normalizar el catálogo.
- `api/catalogo.js`: función serverless para Vercel.
- `vercel.json`: rewrites para la SPA.

## Build

```bash
npm run build
```
