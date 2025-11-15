# 🎓 Guía de Inicio - Paso a Paso (Para Principiantes)

Esta guía te explicará cómo poner en funcionamiento tu aplicación desde cero, paso a paso.

## 📋 ¿Qué necesitas tener instalado primero?

Antes de empezar, necesitas tener estas "herramientas" en tu computadora:

### 1. Node.js (Muy Importante)
- **¿Qué es?** Es como el "motor" que hace funcionar tu aplicación
- **¿Cómo instalarlo?**
  1. Ve a: https://nodejs.org/
  2. Descarga la versión que dice "LTS" (la más estable)
  3. Instálala haciendo doble clic (solo haz clic en "Siguiente" en todas las pantallas)
  4. **Verificar instalación:** Abre una terminal (PowerShell en Windows) y escribe:
     ```
     node --version
     ```
     Si te sale un número (como v20.10.0), ¡está bien instalado!

### 2. PostgreSQL (La Base de Datos)
- **¿Qué es?** Es como una "caja fuerte" donde se guarda toda la información de tu aplicación
- **¿Cómo instalarlo?**
  - Opción A (Más fácil para empezar): Usa Railway (lo explicaremos más adelante)
  - Opción B (Instalar local): 
    1. Ve a: https://www.postgresql.org/download/windows/
    2. Descarga el instalador
    3. Instálalo (usa la contraseña "postgres" para facilitar)
  
- **O mejor aún:** Railway te da la base de datos gratis, ¡usa esa!

### 3. Un Editor de Código
- **¿Qué es?** Es como un "bloc de notas" pero para programar
- **Recomendación:** VS Code
  1. Ve a: https://code.visualstudio.com/
  2. Descárgalo e instálalo

---

## 🚀 PASO 1: Abrir tu Proyecto

1. **Abre VS Code**
2. **Abre la carpeta del proyecto:**
   - Menú: `File` → `Open Folder`
   - Selecciona la carpeta `saas` (donde está todo tu código)
   - ¡Listo! Ahora ves todos tus archivos en el lado izquierdo

---

## 📦 PASO 2: Instalar las "Piezas" del Backend

**¿Qué hacemos aquí?** Le decimos a la computadora que descargue todas las "piezas" (librerías) que necesita tu aplicación para funcionar.

1. **Abre una terminal en VS Code:**
   - Menú: `Terminal` → `New Terminal`
   - O presiona: `Ctrl + Ñ` (control + eñe)

2. **Verifica que estás en la carpeta correcta:**
   - Deberías ver algo como: `C:\Users\talbf\Desktop\saas>`
   - Si no, escribe: `cd C:\Users\talbf\Desktop\saas`

3. **Instala las piezas del backend:**
   - Escribe esto y presiona Enter:
     ```
     npm install
     ```
   - **¿Qué hace esto?** Lee el archivo `package.json` y descarga todas las piezas necesarias
   - **Tiempo:** Puede tardar 2-5 minutos (primera vez)
   - **Verás muchas líneas** - ¡es normal! Está descargando cosas

4. **Espera hasta que termine:**
   - Cuando termine, verás algo como: `added 245 packages` o similar
   - **¡No te preocupes si ves algunas advertencias amarillas!** Es normal

---

## 📦 PASO 3: Instalar las "Piezas" del Frontend

Ahora hacemos lo mismo pero para la parte que el usuario verá en el navegador.

1. **Ve a la carpeta del frontend:**
   - En la terminal, escribe:
     ```
     cd frontend
     ```
   - Ahora deberías ver: `C:\Users\talbf\Desktop\saas\frontend>`

2. **Instala las piezas del frontend:**
   - Escribe:
     ```
     npm install
     
   - Espera a que termine (otra vez, puede tardar unos minutos)

3. **Vuelve a la carpeta principal:**
   - Escribe:
     ```
     cd ..
     ```
   - Ahora estás de vuelta en: `C:\Users\talbf\Desktop\saas>`

--

## 🗄️ PASO 4: Configurar la Base de Datos

### Opción A: Usar Railway (Recomendado - Más Fácil)

**¿Qué es Railway?** Es un servicio que te da una base de datos gratis y la mantiene en internet.

1. **Crea una cuenta:**
   - Ve a: https://railway.app/
   - Haz clic en "Login"
   - Regístrate con GitHub (es más fácil)

2. **Crea un nuevo proyecto:**
   - Haz clic en "New Project"
   - Selecciona "Provision PostgreSQL"
   - Railway creará una base de datos para ti

3. **Obtén la URL de conexión:**
   - Haz clic en tu base de datos PostgreSQL
   - Ve a la pestaña "Variables"
   - Busca `DATABASE_URL`
   - **¡IMPORTANTE!** Si ves una URL que dice `postgres.railway.internal`, esa es INTERNA y NO funcionará desde tu computadora
   - **Necesitas la URL PÚBLICA:**
     - En Railway, busca la pestaña "Connect" o "Connection"
     - O busca en las variables `DATABASE_URL` que NO tenga `railway.internal`
     - La URL pública se ve así: `postgresql://usuario:password@containers-us-west-XXX.railway.app:5432/railway`
     - Si solo ves la interna, haz clic en "Public Networking" o "Generate Public URL" (Railway puede darte ambas)
   - **Copia la URL PÚBLICA** (la que tiene un dominio como `.railway.app` en lugar de `.railway.internal`)

### Opción B: Base de Datos Local

Si instalaste PostgreSQL en tu computadora:
- La URL sería: `postgresql://postgres:postgres@localhost:5432/review_management`

---

## ⚙️ PASO 5: Crear el Archivo de Configuración

**¿Qué es esto?** Un archivo que le dice a tu aplicación dónde está la base de datos y otras cosas importantes.

1. **En VS Code, busca el archivo `env.example`**
   - Está en la carpeta principal (no en frontend)

2. **Crea una copia llamada `.env`:**
   - Clic derecho en `env.example` → `Copy`
   - Clic derecho donde no haya archivo → `Paste`
   - Renombra el archivo nuevo a: `.env` (con el punto al inicio)

3. **Abre el archivo `.env` y edítalo:**
   - Debería verse así:
     ```
     DATABASE_URL="postgresql://..."
     JWT_SECRET="tu-secreto-super-seguro-aqui"
     PORT=3000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:5173
     ```

4. **Reemplaza los valores:**
   - `DATABASE_URL`: Pega la URL que copiaste de Railway (o la local)
   - `JWT_SECRET`: Escribe cualquier texto largo y aleatorio, por ejemplo: `mi-super-secreto-12345-abcde-fghij`
   - Los otros valores déjalos igual por ahora

5. **Guarda el archivo:** `Ctrl + S`

---

## 🏗️ PASO 6: Preparar la Base de Datos (Crear las Tablas)

**¿Qué hacemos?** Le decimos a Prisma (una herramienta) que cree todas las "tablas" necesarias en tu base de datos.

1. **Asegúrate de estar en la carpeta principal:**
   - En la terminal escribe: `cd C:\Users\talbf\Desktop\saas`
   - (Si ya estás ahí, no pasa nada)

2. **Genera el "cliente" de Prisma:**
   - Escribe:
     ```
     npm run prisma:generate
     ```
   - Esto crea un "traductor" entre tu código y la base de datos
   - Tarda unos segundos

3. **Crea las tablas en la base de datos:**
   - Escribe:
     ```
     npm run prisma:migrate
     ```
   - Te preguntará un nombre para esta migración
   - Escribe: `init` y presiona Enter
   - **¡Espera!** Esto creará todas las tablas necesarias
   - Si ves "Migration applied successfully", ¡todo bien! ✅

---

## 🎉 PASO 7: ¡Iniciar el Backend!

Ahora vamos a "encender" el servidor que maneja toda la lógica.

1. **En la terminal, asegúrate de estar en la carpeta principal**

2. **Inicia el servidor:**
   - Escribe:
     ```
     npm run dev
     ```
   - Verás muchas líneas aparecer
   - **Busca esta línea:** `Server running on port 3000`
   - **¡Si ves eso, el backend está funcionando!** 🎊

3. **¡NO CIERRES ESTA VENTANA!**
   - Déjala abierta
   - El servidor debe seguir corriendo

---

## 🎨 PASO 8: Iniciar el Frontend (en una Nueva Terminal)

Necesitas abrir OTRA terminal porque la primera está ocupada con el backend.

1. **Abre una nueva terminal:**
   - Menú: `Terminal` → `New Terminal`
   - O presiona: `Ctrl + Shift + Ñ`

2. **Ve a la carpeta del frontend:**
   - Escribe:
     ```
     cd frontend
     ```

3. **Inicia el frontend:**
   - Escribe:
     ```
     npm run dev
     ```
   - Verás algo como:np
     ```
     VITE v5.0.8  ready in 500 ms
     ➜  Local:   http://localhost:5173/
     ```
   - **¡Perfecto!** El frontend está corriendo

4. **Abre tu navegador:**
   - Ve a: http://localhost:5173
   - **¡Deberías ver tu aplicación funcionando!** 🎊🎊🎊

---

## 🧪 PASO 9: Probar la Aplicación

1. **Regístrate:**
   - En la página inicial, haz clic en "Sign Up"
   - Completa el formulario:
     - Email: algo@ejemplo.com
     - Password: cualquier contraseña
     - Company Name: (opcional) Mi Empresa
   - Haz clic en "Sign Up"
   - **¡Te debería llevar al Dashboard!**

2. **Crea una Ubicación (Necesario para reviews):**
   - Desde el Dashboard, necesitas crear una ubicación primero
   - Puedes hacerlo con una herramienta como Postman, o...
   - **Más fácil:** Usa Prisma Studio para agregar datos

3. **Abre Prisma Studio (En otra terminal nueva):**
   - En VS Code, abre otra terminal
   - Escribe: `npm run prisma:studio`
   - Se abrirá en: http://localhost:5555
   - Aquí puedes ver y editar datos directamente

4. **Crea una Ubicación en Prisma Studio:**
   - Haz clic en "Location"
   - Haz clic en "Add record"
   - Llena los campos:
     - `userId`: Copia el ID de tu usuario (de la tabla User)
     - `name`: "Sucursal Principal"
     - `address`: "Calle Principal 123"
     - `isActive`: true
   - Guarda

5. **Crea un Review:**
   - En Prisma Studio, ve a "Review"
   - Haz clic en "Add record"
   - Llena:
     - `locationId`: El ID de la ubicación que acabas de crear
     - `userId`: Tu ID de usuario
     - `rating`: 5 (por ejemplo)
     - `reviewText`: "Excelente servicio!"
     - `customerName`: "Juan Pérez"
     - `reviewDate`: Fecha de hoy
     - `status`: "pending"
   - Guarda

6. **Vuelve al Dashboard:**
   - Recarga la página: http://localhost:5173/dashboard
   - **¡Deberías ver el review que acabas de crear!**
   - Haz clic en él para ver la respuesta generada

---

## 🐛 Problemas Comunes y Soluciones

### ❌ Error: "Cannot find module..."
**Solución:** Ejecuta `npm install` otra vez en la carpeta donde ocurre el error

### ❌ Error: "ECONNREFUSED" o problemas de conexión a la base de datos
**Solución:** 
- Verifica que el `DATABASE_URL` en tu `.env` sea correcto
- Si usas Railway, asegúrate de copiar la URL completa

### ❌ Error: "Port 3000 is already in use"
**Solución:**
- Algo más está usando el puerto 3000
- Cierra otros programas que puedan estar usándolo
- O cambia el `PORT` en el `.env` a otro número (como 3001)

### ❌ El frontend no se conecta al backend
**Solución:**
- Verifica que el backend esté corriendo (deberías ver "Server running on port 3000")
- Verifica que en `frontend/.env` (si existe) o en el código, la URL sea `http://localhost:3000`

### ❌ Prisma no encuentra la base de datos
**Solución:**
- Verifica que `DATABASE_URL` esté correcto en `.env`
- Ejecuta `npm run prisma:generate` otra vez
- Si usas Railway, verifica que la base de datos esté activa

---

## 📚 Resumen Visual de las Ventanas Necesarias

Cuando todo esté corriendo, deberías tener:

```
Terminal 1: Backend corriendo
> npm run dev
Server running on port 3000

Terminal 2: Frontend corriendo
> npm run dev
VITE ready on http://localhost:5173

Terminal 3 (Opcional): Prisma Studio
> npm run prisma:studio
Studio running on http://localhost:5555
```

---

## 🎯 Próximos Pasos (Después de que Todo Funcione)

1. **Configura Brand Voice:**
   - Ve a Settings en tu app
   - Ajusta el tono y sign-off

2. **Crea más reviews:**
   - Usa Prisma Studio para agregar datos de prueba

3. **Experimenta:**
   - Edita respuestas en el Dashboard
   - Prueba los filtros
   - Publica respuestas

---

## 🆘 ¿Necesitas Ayuda?

Si algo no funciona:
1. Lee el error completo en la terminal
2. Busca en Google el mensaje de error
3. Verifica que seguiste todos los pasos
4. Asegúrate de que todas las terminales estén en las carpetas correctas

---

## ✅ Lista de Verificación

Marca cada cosa cuando la completes:

- [ ] Node.js instalado (`node --version` funciona)
- [ ] VS Code instalado
- [ ] Base de datos configurada (Railway o local)
- [ ] `.env` creado y configurado
- [ ] `npm install` ejecutado en la carpeta principal
- [ ] `npm install` ejecutado en la carpeta frontend
- [ ] `npm run prisma:generate` ejecutado
- [ ] `npm run prisma:migrate` ejecutado
- [ ] Backend corriendo (`npm run dev` en carpeta principal)
- [ ] Frontend corriendo (`npm run dev` en carpeta frontend)
- [ ] Aplicación abierta en http://localhost:5173
- [ ] Usuario creado (signup funciona)
- [ ] Dashboard visible

¡Éxito! 🎉



