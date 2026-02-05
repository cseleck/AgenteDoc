# Chatbot IA con OpenAI GPT-4o Mini

Un chatbot inteligente desarrollado con Next.js 14 y OpenAI GPT-4o Mini, listo para desplegar en Vercel.

## 🚀 Características

- ✨ Interfaz moderna y responsiva
- 🤖 Integración con OpenAI GPT-4o Mini
- 💬 Chat en tiempo real
- 🎨 Diseño con Tailwind CSS
- 🌙 Soporte para modo oscuro
- ⚡ Optimizado para Vercel

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Una cuenta en OpenAI con acceso a la API
- Una cuenta en Vercel (gratis)

## 🛠️ Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd AgenteDoc
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   OPENAI_API_KEY=tu_api_key_aqui
   ```
   
   Obtén tu API key en: https://platform.openai.com/api-keys

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   Visita: http://localhost:3000

## 🌐 Desplegar en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <tu-repositorio-github>
   git push -u origin main
   ```

2. **Importar en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js

3. **Configurar Variables de Entorno**
   - En la configuración del proyecto en Vercel
   - Agrega: `OPENAI_API_KEY` con tu clave de OpenAI
   - Click en "Deploy"

### Opción 2: Desde la CLI de Vercel

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login en Vercel**
   ```bash
   vercel login
   ```

3. **Desplegar**
   ```bash
   vercel
   ```

4. **Configurar variables de entorno**
   ```bash
   vercel env add OPENAI_API_KEY
   ```

5. **Redesplegar con las variables**
   ```bash
   vercel --prod
   ```

## 📁 Estructura del Proyecto

```
AgenteDoc/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # API endpoint para OpenAI
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página del chatbot
├── public/                    # Archivos estáticos
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Configuración

### Cambiar el Modelo de OpenAI

Edita [app/api/chat/route.ts](app/api/chat/route.ts):

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini', // Cambia aquí el modelo
  // ...
});
```

Modelos disponibles:
- `gpt-4o-mini` (recomendado - más rápido y económico)
- `gpt-4o`
- `gpt-4-turbo`
- `gpt-3.5-turbo`

### Personalizar el Chatbot

Puedes agregar un mensaje de sistema en [app/api/chat/route.ts](app/api/chat/route.ts):

```typescript
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'Eres un asistente útil y amigable...'
    },
    ...messages
  ],
  // ...
});
```

## 💰 Costos

- **Vercel**: Gratuito para proyectos personales
- **OpenAI GPT-4o Mini**: ~$0.15 por millón de tokens de entrada

## 🐛 Solución de Problemas

### Error: "Invalid API key"
- Verifica que tu `OPENAI_API_KEY` esté correctamente configurada
- Asegúrate de que la clave tenga créditos disponibles

### Error en el despliegue de Vercel
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs en el dashboard de Vercel

## 📝 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

---

Hecho con ❤️ usando Next.js y OpenAI
