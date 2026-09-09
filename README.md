# Tobimarks

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/HeroUI-000000?style=for-the-badge&logo=heroui&logoColor=white" alt="HeroUI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge" alt="Zustand" />
</p>

> Guarda una URL. Tobimarks se encarga de enriquecerla y ayudarte a organizarla.

Tobimarks es la interfaz web para gestionar bookmarks personales. Guarda una URL, agrúpala en una colección, añade etiquetas y vuelve a ella cuando la necesites.

La organización asistida por IA es opcional. Cuando está activada, Tobimarks usa la API para relacionar el contenido del bookmark con las etiquetas y colecciones del usuario.

Este repositorio contiene el frontend web. La API y el backend viven en el repositorio [tobimarks](https://github.com/Jose-Maykol/tobimarks).

## Propuesta de valor

Tobimarks convierte una lista de enlaces difícil de mantener en una biblioteca personal organizada. El producto combina captura rápida, organización flexible, favoritos, filtros y registro de accesos en un mismo espacio.

El frontend de este repositorio funciona como una SPA autenticada. Necesita una instancia de la API de Tobimarks para guardar y consultar los datos.

## Problema que resuelve

Guardar un enlace es fácil. Encontrarlo semanas después suele ser más difícil.

Tobimarks ayuda a resolver este problema al permitir:

- Centralizar enlaces en una cuenta personal.
- Separar recursos por colecciones.
- Clasificar marcadores con etiquetas reutilizables.
- Destacar favoritos.
- Filtrar por etiquetas, favoritos y periodo de acceso.
- Ordenar por fecha de creación, último acceso o cantidad de visitas.
- Registrar cuándo y cuántas veces se abre un marcador.

## Cómo funciona

1. Inicia sesión con Google.
2. Guarda una URL desde la aplicación.
3. Edita el marcador y asígnale etiquetas o una colección.
4. Usa favoritos, filtros y ordenamiento para volver a encontrarlo.
5. Abre o copia el enlace. Tobimarks registra los accesos para mostrar actividad posterior.

## Funcionalidades del producto

### Marcadores

- Crear un marcador a partir de una URL.
- Editar título y etiquetas.
- Abrir el enlace en una pestaña nueva.
- Copiar la URL al portapapeles.
- Marcar o quitar un marcador de favoritos.
- Asignar o quitar una colección.
- Eliminar marcadores.
- Mostrar dominio, favicon, etiquetas, cantidad de accesos y último acceso.

### Organización

- Crear, editar y eliminar colecciones.
- Configurar nombre, descripción, icono y color de una colección.
- Crear, editar y eliminar etiquetas globales.
- Ver los marcadores asociados a una colección.
- Combinar colección, etiquetas y filtros de acceso.

### Recuperación y actividad

- Ver todos los marcadores o solo los favoritos.
- Filtrar por etiquetas.
- Filtrar por accesos de esta semana o este mes.
- Ordenar por más recientes, más antiguos, más visitados o últimos visitados.
- Consultar un dashboard con totales de marcadores, colecciones y etiquetas.

### Cuenta y preferencias

- Iniciar sesión con Google OAuth.
- Consultar el perfil de usuario.
- Configurar automatizaciones de IA.
- Cambiar entre tema claro y oscuro.

## Organización asistida por IA

Desde el perfil, Tobimarks permite activar preferencias para automatizar parte de la organización:

- **Auto-etiquetado inteligente:** la IA analiza el contenido del sitio guardado y propone o asigna etiquetas relevantes.
- **Organización automática en colecciones:** la IA sugiere o asigna una colección según el contenido del marcador.

Estas opciones son preferencias configurables. El frontend envía su estado a la API; el resultado final depende de la implementación, disponibilidad y reglas del backend. Tobimarks no garantiza una etiqueta o colección específica para cada enlace.

## Ejemplo rápido de uso

Caso: guardar recursos para un proyecto de frontend.

1. Inicia sesión con Google.
2. Crea una colección llamada `Proyecto frontend`.
3. Guarda una URL de documentación o inspiración.
4. Añade etiquetas como `react`, `ui` o `referencia`.
5. Marca como favorito el recurso más importante.
6. Filtra la colección por `ui` o por los enlaces visitados este mes.
7. Abre el recurso y deja que Tobimarks registre el acceso.

## Screenshots y demos

Sección reservada para material visual del producto.

### Screenshots

- Dashboard: pendiente de captura.
- Lista de marcadores y filtros: pendiente de captura.
- Colecciones: pendiente de captura.
- Perfil y automatizaciones de IA: pendiente de captura.

### Demo

- Demo pública: todavía no configurada.
- Vídeo o GIF de flujo principal: pendiente.

No se incluyen imágenes ni enlaces ficticios. Cuando exista una demo pública o material visual definitivo, se añadirán aquí.

## Referencia de la API

Esta sección documenta la integración usada por el frontend. No reemplaza una especificación OpenAPI ni define contratos adicionales del backend.

### URL base

Configura `VITE_API_URL` con el origen de la API, sin `/api` ni `/` final:

```text
VITE_API_URL=http://localhost:3000
```

El cliente Axios usa `${VITE_API_URL}/api` como base final. Por ejemplo:

```text
http://localhost:3000/api/bookmarks
```

### Autenticación

| Método  | Endpoint             | Uso                                                     |
| ------- | -------------------- | ------------------------------------------------------- |
| `POST`  | `/auth/google`       | Intercambia el `idToken` de Google por un access token. |
| `GET`   | `/users/me`          | Obtiene el perfil del usuario autenticado.              |
| `PATCH` | `/users/me/settings` | Actualiza `aiAutoTags` o `aiAutoCollections`.           |

El frontend guarda el access token recibido y envía `Authorization: Bearer <token>` en las peticiones autenticadas.

### Marcadores

| Método   | Endpoint                    | Uso                           |
| -------- | --------------------------- | ----------------------------- |
| `POST`   | `/bookmarks`                | Crea un marcador con una URL. |
| `GET`    | `/bookmarks`                | Lista marcadores.             |
| `PATCH`  | `/bookmarks/:id`            | Actualiza título y etiquetas. |
| `PATCH`  | `/bookmarks/:id/favorite`   | Marca como favorito.          |
| `DELETE` | `/bookmarks/:id/favorite`   | Quita de favoritos.           |
| `PATCH`  | `/bookmarks/:id/access`     | Registra un acceso.           |
| `PATCH`  | `/bookmarks/:id/collection` | Asigna una colección.         |
| `DELETE` | `/bookmarks/:id/collection` | Quita la colección asignada.  |
| `DELETE` | `/bookmarks/:id`            | Elimina el marcador.          |

`GET /bookmarks` acepta estos parámetros usados por el frontend: `isFavorite`, `tags`, `sortBy`, `sortDirection`, `accessedWithin` y `collectionId`.

### Colecciones

| Método   | Endpoint           | Uso                                |
| -------- | ------------------ | ---------------------------------- |
| `GET`    | `/collections`     | Lista colecciones.                 |
| `GET`    | `/collections/:id` | Obtiene una colección y sus datos. |
| `POST`   | `/collections`     | Crea una colección.                |
| `PATCH`  | `/collections/:id` | Actualiza una colección.           |
| `DELETE` | `/collections/:id` | Elimina una colección.             |

### Etiquetas y estadísticas

| Método   | Endpoint              | Uso                                   |
| -------- | --------------------- | ------------------------------------- |
| `GET`    | `/tags`               | Lista etiquetas.                      |
| `POST`   | `/tags`               | Crea una etiqueta con nombre y color. |
| `PATCH`  | `/tags/:id`           | Actualiza nombre o color.             |
| `DELETE` | `/tags/:id`           | Elimina una etiqueta.                 |
| `GET`    | `/statistics/summary` | Obtiene totales para el dashboard.    |

## Instalación local

### Requisitos

- Node.js 20 o superior.
- npm.
- API de Tobimarks ejecutándose localmente o disponible en una URL accesible.
- Google OAuth Client ID para iniciar sesión.

### Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Jose-Maykol/tobimarks-web-app.git
   cd tobimarks-web-app
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Crea `.env` a partir de `.env.example` y completa sus valores:

   ```env
   VITE_API_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. Registra `http://localhost:5173` como origen autorizado en Google Cloud Console.

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre [http://localhost:5173](http://localhost:5173).

### Scripts

| Comando           | Uso                                                            |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Inicia Vite con recarga en desarrollo.                         |
| `npm run build`   | Ejecuta TypeScript y genera la build de producción en `dist/`. |
| `npm run lint`    | Ejecuta ESLint.                                                |
| `npm run preview` | Sirve localmente la build de `dist/`.                          |

### Despliegue

La salida de `npm run build` contiene archivos estáticos. Puede alojarse en Vercel, Netlify, un servidor Nginx u otro proveedor compatible con SPA.

Configura `VITE_API_URL` y `VITE_GOOGLE_CLIENT_ID` en el entorno de build. El servidor debe redirigir las rutas de la SPA a `index.html` y permitir la comunicación con la API.

## Arquitectura y stack

### Arquitectura

Tobimarks usa una SPA React con módulos organizados por feature:

```text
src/
├── core/                    # Infraestructura y UI transversal
└── features/
    ├── auth/                # Inicio de sesión y sesión
    ├── bookmarks/           # Marcadores y filtros
    ├── collections/         # Colecciones
    ├── home/                # Dashboard
    ├── statistics/          # Resumen estadístico
    ├── tags/                # Etiquetas
    └── user/                # Perfil y preferencias
```

Flujo general de datos:

```text
Page -> React Query -> FeatureService -> Axios/interceptor -> API
API -> modelo de dominio -> React Query cache -> componentes
```

Responsabilidades principales:

- `src/features/`: lógica y UI de cada dominio.
- `src/core/`: Axios, autenticación transversal, providers, layouts y UI compartida.
- React Query: estado remoto y caché de marcadores, colecciones, etiquetas, perfil y estadísticas.
- Zustand: estado cliente como sesión, sidebar y preferencias locales.
- `App.tsx`: rutas públicas y protegidas.

Consulta [ARCHITECTURE.md](ARCHITECTURE.md) para reglas de dependencias, flujo de datos y convenciones detalladas.

### Stack

| Área           | Tecnología            |
| -------------- | --------------------- |
| UI             | React 19 + TypeScript |
| Build          | Vite                  |
| Routing        | React Router 7        |
| Componentes    | HeroUI                |
| Estilos        | Tailwind CSS 4        |
| Estado remoto  | TanStack React Query  |
| Estado cliente | Zustand               |
| HTTP           | Axios                 |
| Autenticación  | Google OAuth          |
| Tema           | next-themes           |
| Iconos         | Lucide React          |

## Seguridad, limitaciones y licencia

### Seguridad

- Google OAuth gestiona el inicio de sesión. El backend recibe el `idToken` mediante `/auth/google`.
- Las variables `VITE_*` quedan expuestas en el bundle del navegador. No guardes secretos en ellas.
- El access token se almacena en `localStorage`; usa HTTPS en entornos reales y revisa la política de seguridad de la API.
- La autorización, validación de tokens, propiedad de datos y protección de endpoints deben aplicarse en el backend. El frontend no sustituye esos controles.
- Usa un `VITE_API_URL` confiable y configura correctamente los orígenes permitidos para Google OAuth y la API.

### Limitaciones actuales

- La aplicación depende de una API de Tobimarks. Sin backend, las pantallas de datos no funcionan.
- Google OAuth requiere un Client ID y una configuración de origen autorizada.
- La sección de screenshots y demos todavía no contiene material público.
- La referencia de API refleja únicamente los endpoints usados por este frontend; no es una especificación completa del backend.
- La organización asistida por IA depende de servicios y reglas del backend.
- La interfaz actual centra la recuperación en colecciones, etiquetas, favoritos y filtros. No se documenta una búsqueda textual global como funcionalidad disponible.

### Licencia

Este repositorio no incluye actualmente un archivo `LICENSE`. No se asume una licencia hasta que el proyecto publique una de forma explícita.
