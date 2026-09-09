# Reglas de codigo

Aplican al codigo nuevo y a los archivos modificados. Las migraciones deben ser incrementales y conservar el comportamiento.

## Formato

- Comillas simples en TS, JS y JSX.
- Sin punto y coma.
- Dos espacios de indentacion.
- `printWidth: 100`, trailing commas y parentesis en funciones flecha, segun `.prettierrc.js`.
- Imports ordenados por ESLint y `simple-import-sort`.
- Ejecuta `npm run lint` y `npm run build`.

```tsx
const UserCard = ({ user }: UserCardProps) => {
  return <div>{user.displayName}</div>
}
```

## Nombres

- Componentes y paginas: `PascalCase.tsx`.
- Hooks: `useCamelCase.ts`.
- Servicios: `camelCaseService.ts`.
- Mappers: `camelCaseMapper.ts`.
- Dominio: `noun.type.ts`.
- DTO: `noun.dto.ts`.
- Stores: `useNounStore.ts`.
- Declaraciones ambientales: `*.d.ts`.
- Constantes exportadas: `UPPER_SNAKE_CASE`.

Ejemplo:

```ts
export const API_BASE_PATH = '/api'
export const AUTH_TOKEN_KEY = 'auth_token'
```

## TypeScript

- Respeta `strict: true`; no uses `any` para silenciar errores.
- Usa `unknown` en errores y valida antes de acceder.
- Usa `import type` para imports de tipos.
- Declara retornos en servicios, mappers, hooks publicos y funciones exportadas.
- Prefiere unions para valores cerrados y evita `enum` innecesarios.
- Usa `interface` para contratos de objetos publicos y `type` para unions/composiciones.
- Evita casts y `// @ts-ignore`; valida o mapea en el limite de la API.

## Tipos, DTOs y mappers

```text
features/user/
├── types/user.type.ts       # Modelo usado por la app
├── types/user.dto.ts        # Forma externa de la API
└── mappers/userMapper.ts    # Conversion pura
```

- `*.type.ts` no contiene HTTP.
- `*.dto.ts` refleja la API, incluidos nombres como `created_at`.
- `*.d.ts` solo declara tipos ambientales o modulos.
- No expongas DTOs a la UI cuando requieran transformacion.
- Mappers: funciones flecha puras; convierten nombres, fechas, defaults y estructuras anidadas.

```ts
export const mapUserFromApi = (dto: UserDto): User => ({
  id: dto.id,
  displayName: dto.name,
  createdAt: new Date(dto.created_at),
})
```

## Servicios API

Usa un objeto con nombre PascalCase y metodos orientados al dominio:

```ts
import api from '../../../core/interceptors/auth.interceptor'
import { mapUserFromApi } from '../mappers/userMapper'
import type { UserListResponseDto } from '../types/user.dto'
import type { User } from '../types/user.type'

const UserService = {
  getList: async (): Promise<User[]> => {
    const { data } = await api.get<UserListResponseDto>('/users')
    return data.data.users.map(mapUserFromApi)
  },
}

export default UserService
```

Reglas:

- Usa siempre el cliente Axios compartido.
- Metodos comunes: `getList`, `getById`, `create`, `update`, `delete`.
- Devuelve modelos de dominio, no la respuesta Axios completa.
- Mantiene serializacion y parametros HTTP; delega normalizacion al mapper.
- No importa React, componentes, UI, toasts o navegacion.

## React y componentes

- Usa funciones flecha nuevas y props explicitas.
- Cada componente tiene una responsabilidad visual o de interaccion.
- Paginas/containers coordinan datos; componentes presentan y emiten eventos.
- No hagas Axios ni transformaciones de API dentro del JSX.
- Prefiere composicion y `children` a muchas props booleanas.
- Usa keys estables, labels, `aria-label`, foco visible y estados disabled.
- Usa `lazy` solo cuando el beneficio de carga diferida sea real.
- No uses `useMemo` o `useCallback` por defecto.
- No uses `useEffect` para valores derivados ni para sustituir React Query.

## Estado y queries

- React Query: listas, detalles, cache, revalidacion y mutations de API.
- Zustand: estado cliente compartido; no cache de recursos remotos.
- `useState`: estado local de pagina o componente.
- Query keys deben incluir todos los parametros relevantes:

```ts
const bookmarksQueryKey = ['bookmarks', { collectionId, selectedTags, sortBy }]
```

Tras una mutacion, invalida o actualiza queries afectadas y relacionadas.

## Errores y calidad

Toda pantalla remota contempla, cuando aplique, loading, pending, error, empty, success, permisos y sesion expirada.

Los servicios propagan errores; la pagina o hook decide como mostrarlos. No uses `console.log` para feedback de usuario.

Los comentarios explican decisiones no obvias, limitaciones externas o migraciones temporales; no describen cada linea.
