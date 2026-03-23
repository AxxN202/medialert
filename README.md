# 📋 Cómo preparar tu Excel para MediAlert

MediAlert lee automáticamente los archivos Excel que ya usas en tu farmacia.
No necesitas cambiar tu flujo de trabajo — solo asegúrate de que las columnas
tengan los nombres correctos y la app hace el resto.

---

## ✅ Requisitos mínimos

Tu Excel necesita tener **al menos estas dos columnas** para que funcione:

| Columna obligatoria | Qué debe contener |
|---|---|
| `NOMBRE GENERICO` | Nombre del medicamento (ej: `ACETAMINOFÉN 500 MG`) |
| `FECHA VENCIMIENTO` | Fecha en formato `MM/DD/AAAA` (ej: `03/15/2027`) |

Con solo estas dos columnas la app ya carga y muestra los vencimientos.
Las demás columnas son opcionales pero se muestran en el dashboard si existen.

---

## 📌 Nombres de columnas reconocidos

MediAlert busca las columnas por nombre. El nombre **no distingue mayúsculas/minúsculas**
pero debe coincidir con alguna de las variantes de la lista:

### Nombre del medicamento
```
NOMBRE GENERICO
NOMBRE GENÉRICO
NOMBRE GEN
```

### Nombre comercial (opcional)
```
NOMBRE COMERCIAL
NOMBRE COM
```

### Laboratorio (opcional)
```
LABORATORIO
LAB
```

### Fecha de vencimiento ⚠️
```
FECHA VENCIMIENTO
FECHA VENC
FECHA DE VENC
VENCIMIENTO
```

### Cantidad (opcional)
```
CANTIDAD
CANTIDAD RECIBIDA
CANT
```

### Lote (opcional)
```
LOTE
```

> **Tip:** Si tienes el nombre exacto ya en tu Excel pero con una variante diferente
> y no funciona, escríbenos por WhatsApp y lo agregamos a la lista.

---

## 📅 Formato de fecha

Este es el punto más importante. MediAlert acepta varios formatos de fecha:

| Formato | Ejemplo | ¿Funciona? |
|---|---|---|
| `MM/DD/AAAA` | `03/15/2027` | ✅ Sí |
| `DD/MM/AAAA` | `15/03/2027` | ✅ Sí |
| `AAAA-MM-DD` | `2027-03-15` | ✅ Sí |
| `DD-MM-AAAA` | `15-03-2027` | ✅ Sí |
| Fecha de Excel | Número serial de Excel | ✅ Sí |
| `MARZO 2027` | Solo mes y año | ❌ No |
| `15/03/27` | Año de 2 dígitos | ❌ No |

> **Recomendación:** Usa siempre el formato `MM/DD/AAAA`. Es el más confiable.

---

## 🗂️ Estructura del archivo

### Una sola hoja

```
┌─────────────────────────────────────────────────────┐
│ FARMACIA XYZ                            (fila 1)    │
│ ACTA DE RECEPCIÓN N° 001                (fila 2)    │
│─────────────────────────────────────────────────────│
│ NOMBRE GENERICO │ LABORATORIO │ FECHA VENCIMIENTO   │  ← Encabezados
│─────────────────────────────────────────────────────│
│ ACETAMINOFÉN... │ Genfar      │ 03/15/2027          │
│ IBUPROFENO ...  │ Tecnoquím.. │ 11/20/2026          │
└─────────────────────────────────────────────────────┘
```

### Varias hojas (actas)

MediAlert lee **todas las hojas** del archivo automáticamente.
Puedes tener una hoja por acta de recepción — cada una se identifica
por el nombre de la pestaña (ej: "ACTA 001", "ACTA 002").

```
📄 Excel
 ├── 📋 ACTA 001-2026    ← Hoja 1
 ├── 📋 ACTA 002-2026    ← Hoja 2
 └── 📋 ACTA 003-2025    ← Hoja 3
```

Desde el dashboard puedes filtrar por acta usando el selector de hojas.

---

## 🏗️ Estructura recomendada

Esta es la estructura ideal para sacar el máximo provecho de MediAlert:

```
Fila 1: Nombre de la farmacia (opcional, se ignora)
Fila 2: Título del acta      (opcional, se ignora)
Fila 3: Datos del proveedor  (opcional — ver nota abajo)
Fila 4: ENCABEZADOS DE COLUMNAS  ← La app busca los nombres aquí
Fila 5 en adelante: Un medicamento por fila
```

> **Proveedor:** Si en alguna fila antes de los encabezados escribes la palabra
> `PROVEEDOR` seguida del nombre, la app lo captura automáticamente.
> Ejemplo: `PROVEEDOR: Distribuidora Médica SAS`

---

## 📊 Ejemplo de Excel correcto

| N° | NOMBRE GENERICO | NOMBRE COMERCIAL | LABORATORIO | LOTE | FECHA VENCIMIENTO | CANTIDAD |
|---|---|---|---|---|---|---|
| 1 | ACETAMINOFÉN 500 MG | Dolex | Genfar S.A. | GF2025A1 | 03/15/2027 | 200 |
| 2 | IBUPROFENO 400 MG | Buscapina | Tecnoquímicas | TQ2025B2 | 11/20/2026 | 150 |
| 3 | AMOXICILINA 500 MG | Amoxil | Lafrancol | LF2026C3 | 08/10/2028 | 80 |

---

## ⚠️ Errores comunes

### La app carga 0 medicamentos

**Causa más frecuente:** Los encabezados de columnas no coinciden con los nombres
que MediAlert reconoce.

**Solución:** Revisa que la fila de encabezados tenga exactamente:
`NOMBRE GENERICO` y `FECHA VENCIMIENTO` (sin tildes obligatorias).

---

### Aparecen menos medicamentos de los que hay

**Causa:** Algunos registros tienen la columna `NOMBRE GENERICO` vacía,
o la fecha está en un formato que la app no reconoce.

**Solución:**
- Verifica que cada fila tenga nombre Y fecha
- Confirma que las fechas estén en formato `MM/DD/AAAA`
- Las fechas anteriores a 2020 se ignoran automáticamente

---

### El proveedor aparece como "ACTA 001" en vez del nombre real

**Causa:** La app usa el nombre de la hoja como proveedor cuando no encuentra
la palabra `PROVEEDOR` en las filas anteriores al encabezado.

**Solución:** No es un error — es el comportamiento esperado cuando no se especifica
proveedor. Si quieres el nombre real, agrégalo en las filas de encabezado:

```
Fila 3:  PROVEEDOR    Distribuidora Médica SAS
```

---

## 📥 Archivo de ejemplo

En el repositorio encontrarás el archivo `ACTAS_DEMO_PulsoVital.xlsx` con
37 medicamentos de ejemplo distribuidos en 3 hojas. Puedes usarlo como
plantilla para crear tu propio Excel.

---

## 💬 ¿Necesitas ayuda?

Si tu Excel tiene una estructura diferente y no logras que funcione,
escríbenos — adaptamos la app a tu formato.

📱 **WhatsApp:** [301 462 8473](https://wa.me/573014628473)
✉️ **Correo:** manuelayalaarias@gmail.com
