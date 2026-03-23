# MediAlert — Sitio Web

## Estructura de archivos

```
medialert-web/
├── index.html          ← Página principal (no tocar)
├── styles.css          ← Estilos (no tocar)
├── app.js              ← Lógica del sitio (no tocar)
├── version.json        ← ✏️ EDITAR para publicar actualizaciones
├── MediAlert-Setup.exe ← 🔄 REEMPLAZAR con cada nueva versión
└── README.md           ← Este archivo
```

---

## Cómo publicar una actualización

### 1. Reemplaza el instalador
Renombra tu nuevo `.exe` a `MediAlert-Setup.exe` y reemplaza el que está en la carpeta.

### 2. Actualiza version.json
Abre `version.json` y agrega la nueva versión al inicio del array `versions`:

```json
{
  "latest": "1.1.0",
  "download": "MediAlert-Setup.exe",
  "versions": [
    {
      "version": "1.1.0",
      "date": "Abril 2026",
      "title": "Título de la actualización",
      "notes": [
        "Nueva función agregada",
        "Bug corregido",
        "Mejora de rendimiento"
      ]
    },
    {
      "version": "1.0.0",
      ...versión anterior...
    }
  ]
}
```

### 3. Sube los archivos a GitHub
```bash
git add .
git commit -m "v1.1.0"
git push
```

La página se actualiza automáticamente en minutos.

---

## Cómo publicar en GitHub Pages (primera vez)

1. Crea cuenta en github.com
2. Crea repositorio nuevo llamado `medialert`
3. Sube todos los archivos de esta carpeta
4. Ve a Settings → Pages → Source: main branch → /root
5. Tu URL será: `https://tuusuario.github.io/medialert`

---

## Notificaciones a usuarios existentes

La app consulta `version.json` al arrancar. Si quieres que los usuarios
reciban un aviso cuando hay versión nueva, agrega en `main.js` de la app:

```js
// Verificar actualización al arrancar
async function checkForUpdates() {
  try {
    const res  = await fetch('https://tuusuario.github.io/medialert/version.json')
    const data = await res.json()
    const APP_VERSION = '1.0.0'
    if (data.latest !== APP_VERSION) {
      // Mostrar aviso de actualización
    }
  } catch(e) {}
}
```
