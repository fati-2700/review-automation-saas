# 🔍 Cómo Obtener la URL Pública de Railway (MUY IMPORTANTE)

## ⚠️ Problema Común

Si tienes una URL como esta:
```
postgresql://postgres:xxx@postgres.railway.internal:5432/railway
```

**¡Esta URL NO funcionará desde tu computadora!** 

La palabra `railway.internal` significa que es una URL **INTERNA** que solo funciona dentro de Railway, no desde tu casa.

---

## ✅ Solución: Buscar la URL Pública

Necesitas encontrar la URL **PÚBLICA** que se ve así:
```
postgresql://postgres:xxx@containers-us-west-XXX.railway.app:5432/railway
```

Nota cómo dice `.railway.app` en lugar de `.railway.internal`

---

## 📋 Pasos Detallados para Encontrar la URL Pública

### Método 1: Desde la Pestaña "Connect"

1. **En Railway, haz clic en tu base de datos PostgreSQL**

2. **Busca la pestaña "Connect" o "Connection"**
   - Está en la parte superior del panel de la base de datos
   - Puede tener un icono de conexión o engranaje

3. **Mira las opciones de conexión:**
   - Deberías ver algo como:
     - "Private Network" (interna - NO esta)
     - "Public Network" (pública - SÍ esta) ✅
   
4. **Haz clic en "Public Network"**
   - Ahí verás la URL pública
   - Copia esa URL completa

---

### Método 2: Desde Variables (Puede haber dos DATABASE_URL)

1. **Haz clic en tu base de datos PostgreSQL**

2. **Ve a la pestaña "Variables"**

3. **Busca TODAS las variables llamadas `DATABASE_URL`:**
   - Puede haber DOS diferentes:
     - Una con `.railway.internal` ← Esta NO sirve
     - Una con `.railway.app` ← Esta SÍ sirve ✅

4. **Copia la que tiene `.railway.app`**

---

### Método 3: Habilitar Public Networking (Si no la ves)

Si solo ves la URL interna, necesitas habilitar el acceso público:

1. **En Railway, haz clic en tu base de datos PostgreSQL**

2. **Busca la pestaña "Settings" o "Network"**

3. **Busca una opción como:**
   - "Public Networking"
   - "Enable Public Access"
   - "Generate Public URL"

4. **Actívala/Habilítala**
   - Railway generará una URL pública
   - Esta URL la podrás usar desde tu computadora

5. **Copia la nueva URL pública que se genera**

---

## 🎯 Verificar que Tienes la URL Correcta

### ✅ URL PÚBLICA (Correcta para tu computadora):
```
postgresql://postgres:password@containers-us-west-XXX.railway.app:5432/railway
```
- Tiene `.railway.app` al final del dominio
- Esta SÍ funcionará desde tu computadora

### ❌ URL INTERNA (No funciona desde tu casa):
```
postgresql://postgres:password@postgres.railway.internal:5432/railway
```
- Tiene `.railway.internal` al final
- Esta SOLO funciona dentro de Railway

---

## 📝 Ejemplo de URL Correcta

Tu URL debería verse algo así (pero con tus propios valores):
```
postgresql://postgres:lnzNMjLujYOAtJfdbefXlXnzvKQwhcrF@containers-us-west-123.railway.app:5432/railway
```

Nota:
- ✅ Empieza con `postgresql://`
- ✅ Tiene tu usuario: `postgres`
- ✅ Tiene tu contraseña: `lnzNMjLujYOAtJfdbefXlXnzvKQwhcrF`
- ✅ Tiene un dominio con `.railway.app` (NO `.railway.internal`)
- ✅ Termina con `:5432/railway`

---

## 🔧 Si No Encuentras la URL Pública

### Opción A: Habilitar Public Networking

1. En Railway → Tu Base de Datos → Settings
2. Busca "Public Networking" o "Network Access"
3. Actívalo
4. Copia la nueva URL que aparece

### Opción B: Usar una Base de Datos Local (Para desarrollo)

Si no puedes habilitar el acceso público, puedes usar PostgreSQL local:

1. **Instala PostgreSQL en tu computadora:**
   - Descarga de: https://www.postgresql.org/download/windows/
   - Durante la instalación, usa la contraseña: `postgres`

2. **Crea una base de datos:**
   - Abre "pgAdmin" o usa la terminal
   - Crea una base de datos llamada: `review_management`

3. **Usa esta URL en tu `.env`:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/review_management?schema=public"
   ```

---

## ✅ Después de Obtener la URL Correcta

1. **Crea tu archivo `.env`** en la carpeta principal
2. **Pega la URL pública ahí:**
   ```env
   DATABASE_URL="postgresql://postgres:xxx@containers-us-west-XXX.railway.app:5432/railway"
   ```
3. **Agrega el resto de variables:**
   ```env
   JWT_SECRET="mi-super-secreto-12345"
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
4. **Guarda el archivo**

---

## 🆘 ¿Necesitas Ayuda?

Si después de seguir estos pasos sigues teniendo problemas:

1. **Verifica que copiaste la URL completa** (desde `postgresql://` hasta el final)
2. **Asegúrate de que NO tenga espacios** al inicio o final
3. **Verifica que la URL esté entre comillas** en el archivo `.env`
4. **Intenta habilitar Public Networking** en Railway si no lo has hecho

---

## 🎯 Resumen Rápido

- ❌ `railway.internal` = No funciona desde tu casa
- ✅ `railway.app` = SÍ funciona desde tu casa
- 🔍 Busca en "Connect" o "Public Networking"
- 📋 Copia la URL que tiene `.railway.app`

¡Éxito! 🎉

