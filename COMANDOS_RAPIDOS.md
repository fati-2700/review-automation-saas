# ⚡ Comandos Rápidos - Guía de Referencia

Una lista rápida de todos los comandos que necesitas, organizados por tarea.

## 📍 Importante: Ubicación de Carpetas

```
saas/                    ← Carpeta principal (aqui es donde empiezas)
├── src/                 ← Código del backend
├── frontend/            ← Código del frontend
├── prisma/              ← Configuración de base de datos
└── package.json         ← Archivo de configuración del backend
```

---

## 🔧 SETUP INICIAL (Solo la primera vez)

### 1. Instalar dependencias del Backend
```bash
# Asegúrate de estar en: C:\Users\talbf\Desktop\saas
npm install
```

### 2. Instalar dependencias del Frontend
```bash
# Primero ve a la carpeta frontend
cd frontend

# Luego instala
npm install

# Vuelve a la carpeta principal
cd ..
```

### 3. Configurar Base de Datos
```bash
# Genera el cliente de Prisma
npm run prisma:generate

# Crea las tablas en la base de datos
npm run prisma:migrate
# (Cuando te pregunte el nombre, escribe: init)
```

---

## 🚀 INICIAR LA APLICACIÓN (Cada vez que quieras usarla)

### Terminal 1: Backend
```bash
# Ve a la carpeta principal
cd C:\Users\talbf\Desktop\saas

# Inicia el servidor
npm run dev
```
✅ Deberías ver: `Server running on port 3000`

### Terminal 2: Frontend
```bash
# Ve a la carpeta frontend
cd C:\Users\talbf\Desktop\saas\frontend

# Inicia el frontend
npm run dev
```
✅ Deberías ver: `Local: http://localhost:5173/`

### Terminal 3 (Opcional): Prisma Studio
```bash
# Desde la carpeta principal
cd C:\Users\talbf\Desktop\saas

# Abre Prisma Studio
npm run prisma:studio
```
✅ Se abre en: http://localhost:5555

---

## 🗄️ COMANDOS DE BASE DE DATOS

```bash
# Generar cliente de Prisma (si cambias el schema)
npm run prisma:generate

# Crear nuevas tablas/cambios (desarrollo)
npm run prisma:migrate

# Aplicar cambios en producción
npm run prisma:deploy

# Ver/editar datos en navegador
npm run prisma:studio
```

---

## 🏗️ COMANDOS DE CONSTRUCCIÓN

### Backend
```bash
# Compilar TypeScript a JavaScript
npm run build

# Ejecutar versión compilada (producción)
npm start
```

### Frontend
```bash
# Ir a la carpeta frontend
cd frontend

# Construir para producción
npm run build

# Previsualizar versión de producción
npm run preview
```

---

## 🔍 VERIFICAR QUE TODO ESTÁ BIEN

### Verificar Node.js
```bash
node --version
```
✅ Debería mostrar algo como: `v20.10.0`

### Verificar npm
```bash
npm --version
```
✅ Debería mostrar algo como: `10.2.3`

### Verificar que estás en la carpeta correcta
```bash
# En Windows PowerShell
pwd
```
✅ Para backend deberías ver: `C:\Users\talbf\Desktop\saas`
✅ Para frontend deberías ver: `C:\Users\talbf\Desktop\saas\frontend`

---

## 🐛 COMANDOS DE SOLUCIÓN DE PROBLEMAS

### Si las dependencias están corruptas
```bash
# Eliminar carpetas node_modules
# (En la carpeta principal)
rmdir /s node_modules

# (En frontend)
cd frontend
rmdir /s node_modules
cd ..

# Reinstalar todo
npm install
cd frontend
npm install
cd ..
```

### Ver qué proceso está usando el puerto 3000
```bash
# En Windows PowerShell (como administrador)
netstat -ano | findstr :3000
```

### Ver qué proceso está usando el puerto 5173
```bash
netstat -ano | findstr :5173
```

---

## 📝 COMANDOS ÚTILES

### Ver archivos en una carpeta
```bash
# Windows PowerShell
dir

# O en cualquier sistema
ls
```

### Cambiar de carpeta
```bash
# Ir a una carpeta
cd nombre-carpeta

# Volver atrás
cd ..

# Ir a carpeta específica
cd C:\Users\talbf\Desktop\saas
```

### Limpiar la terminal
```bash
# Windows PowerShell
cls

# Linux/Mac
clear
```

---

## 🎯 FLUJO DE TRABAJO TÍPICO

### Primera vez (Setup)
1. `npm install` (en carpeta principal)
2. `cd frontend` → `npm install` → `cd ..`
3. Configurar `.env` con DATABASE_URL
4. `npm run prisma:generate`
5. `npm run prisma:migrate`
6. `npm run dev` (Terminal 1 - Backend)
7. `cd frontend` → `npm run dev` (Terminal 2 - Frontend)

### Cada vez que trabajas
1. Abre VS Code en la carpeta del proyecto
2. Terminal 1: `npm run dev` (desde carpeta principal)
3. Terminal 2: `cd frontend` → `npm run dev`
4. Abre navegador en http://localhost:5173

### Si cambias el schema de Prisma
1. Edita `prisma/schema.prisma`
2. `npm run prisma:generate`
3. `npm run prisma:migrate` (te pedirá un nombre)

---

## 💡 TRUCOS ÚTILES

### Abrir varias terminales en VS Code
- `Ctrl + Ñ` = Nueva terminal
- `Ctrl + Shift + Ñ` = Otra terminal nueva

### Navegar rápido entre carpetas
- Clic derecho en una carpeta en VS Code → "Open in Terminal"

### Ver qué está corriendo
- Revisa las terminales: deberían tener actividad constante
- Si una terminal está "congelada" sin nada, algo falló

---

## ⚠️ RECUERDA

1. **Siempre verifica en qué carpeta estás** antes de ejecutar comandos
2. **El backend debe estar corriendo** antes de usar el frontend
3. **No cierres las terminales** mientras usas la aplicación
4. **Si algo falla, lee el error completo** - usualmente te dice qué está mal

---

## 📚 URLs Importantes

- **Frontend (tu app):** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Health Check:** http://localhost:3000/health
- **Prisma Studio:** http://localhost:5555

---

¡Guarda este archivo para referencia rápida! 🚀



