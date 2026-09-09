# Arquitectura

## Decision

Tobimarks es una SPA React + Vite + TypeScript con arquitectura modular orientada verticalmente por features. No sigue MVC, Clean Architecture o Hexagonal de forma estricta.

Cada feature contiene su UI, estado, acceso a datos, mappers y tipos. `core` contiene infraestructura y UI transversal, no logica de negocio.

## Estructura

```text
src/
├── core/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── interceptors/
│   ├── layouts/
│   ├── providers/
│   └── stores/
├── features/
│   └── <feature>/
│       ├── components/
│       ├── constants/
│       ├── hooks/
│       ├── mappers/
│       ├── pages/
│       ├── services/
│       ├── stores/
│       └── types/
├── App.tsx
├── main.tsx
└── providers.tsx
```

Una feature actual puede omitir carpetas vacias. Las features existentes son `auth`, `bookmarks`, `collections`, `home`, `statistics`, `tags` y `user`.

## Responsabilidades

| Area | Responsabilidad | No debe hacer |
| --- | --- | --- |
| `core` | Axios, interceptors, providers, layouts, UI compartida y config | Contener logica de dominio |
| `pages` | Coordinar ruta, queries, mutations, estado de pantalla y composicion | Conocer DTOs o construir peticiones HTTP |
| `components` | Mostrar UI y emitir eventos mediante props | Llamar API o decidir navegacion global |
| `hooks` | Integrar React Query, React y comportamiento reutilizable | Sustituir al servicio HTTP |
| `services` | Encapsular endpoints y devolver modelos de dominio | Renderizar, navegar o mostrar toasts |
| `mappers` | Convertir DTOs y normalizar datos | Hacer HTTP o usar React |
| `types` | Definir dominio, DTOs y contratos | Contener efectos secundarios |
| `stores` | Estado cliente local o transversal | Ser cache duplicada de React Query |

## Direccion de dependencias

```text
App/providers -> pages -> hooks/components -> services -> mappers/types
features -> core -> librerias externas
```

Evita `core -> features`, servicios que importen componentes, mappers que importen Axios/React Query y features que accedan a internals de otras features.

La composicion de rutas puede conectar features con `core`. Las importaciones actuales de features desde `AuthLayout` o `Sidebar` son deuda tecnica; no las amplifiques en codigo nuevo.

## Flujo de datos

### Lectura

```text
Route -> Page -> useQuery/hook -> FeatureService -> Axios/interceptors -> API
      -> DTO -> mapper -> domain model -> React Query cache -> components
```

### Mutacion

```text
User action -> handler/useMutation -> FeatureService -> API
            -> invalidate/update related queries -> UI
```

## API y autenticacion

- Cada feature expone servicios como `UserService.getList()`, `BookmarkService.create()` o `CollectionService.getById(id)`.
- Todos los servicios usan el cliente Axios de `src/core/interceptors/`.
- El cliente centraliza `baseURL`, token y errores transversales.
- Los servicios no crean clientes Axios propios.
- Los componentes no leen `localStorage` para hacer peticiones.
- DTOs y modelos de dominio viven separados.
- Las respuestas se mapean antes de entregarse a la UI.

La implementacion actual combina cliente e interceptor en `auth.interceptor.ts`; puede mantenerse durante una migracion incremental.

## Tipos y mappers

```text
features/user/
├── types/user.type.ts       # Modelo de dominio
├── types/user.dto.ts        # Contrato externo de API
└── mappers/userMapper.ts    # DTO -> dominio
```

Los `*.d.ts` solo declaran tipos ambientales, modulos sin tipos o ampliaciones globales. No son contenedores de modelos de dominio.

Los mappers son funciones puras. Centralizan renombres, fechas, valores opcionales, defaults y estructuras anidadas de la API.

## Estado

### React Query

Fuente de verdad para bookmarks, collections, tags, perfil y estadisticas remotos. Las query keys incluyen todos los parametros del resultado:

```ts
queryKey: ['bookmarks', { collectionId, selectedTags, sortBy }]
```

Despues de una mutacion, invalida o actualiza las queries afectadas y las relacionadas.

### Zustand y React state

- `useState`: estado local de una pagina o componente.
- Zustand: sidebar, preferencias, sesion u otro estado cliente que deba compartirse.
- React Query: datos del servidor.

No mantengas una copia de bookmarks, collections o tags en Zustand si ya viven en React Query.

## Routing y providers

- `App.tsx` registra rutas y layouts.
- `src/providers.tsx` monta Router, Auth, Query Client, tema y OAuth.
- Los layouts contienen estructura persistente (`Header`, `Sidebar`, `Outlet`), no toda la logica de negocio.
- Una ruta nueva crea o reutiliza una pagina de su feature y define si requiere autenticacion.

## Componentizacion

Usa componentes con una responsabilidad clara. Extrae una pieza cuando tenga estado propio, se repita, sea testeable de forma independiente o haga dificil leer la pagina.

Divide responsabilidades asi:

- Pagina o container: datos, estado de pantalla y composicion.
- Componente presentacional: markup, props y eventos.
- Hook: comportamiento reusable y React Query.
- Modal, card, filtro o boton: interaccion focalizada.

Prefiere composicion y props sobre herencia o componentes monoliticos con muchas props booleanas.

## Patrones

- **Feature Module:** aisla cada dominio en `src/features/<feature>`.
- **Service Facade:** oculta URLs y HTTP tras `UserService.getList()`.
- **Mapper/Adapter:** protege la UI del contrato externo de API.
- **Container/Presentational:** separa coordinacion de presentacion.
- **Custom Hook:** reutiliza queries, mutations e interacciones.
- **Provider:** inyecta dependencias transversales reales.
- **Composition:** combina piezas pequenas en lugar de herencia.

## Evolucion

- Mantener rutas y nombres existentes salvo necesidad funcional.
- Introducir mappers en codigo nuevo y al tocar servicios existentes.
- No aumentar la duplicacion entre React Query y Zustand.
- No aumentar dependencias de `core` hacia features.
- Renombrar gradualmente archivos `.tsx` que no contienen JSX, como servicios.
