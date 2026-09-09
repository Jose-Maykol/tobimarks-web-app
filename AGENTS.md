# Instrucciones para agentes y colaboradores

Reglas operativas del repositorio. `ARCHITECTURE.md` describe la estructura y `CODING_RULES.md` las convenciones de implementacion.

## Contexto

- SPA: React 19, TypeScript y Vite.
- Features: `src/features/`.
- Infraestructura compartida: `src/core/`.
- API REST: Axios e interceptors.
- Estado remoto: TanStack React Query.
- Estado cliente: Zustand y estado local de React.
- Routing: React Router.
- UI: HeroUI y Tailwind CSS.

## OpenSpec obligatorio

Todo cambio no trivial del repositorio se trabaja mediante una change de OpenSpec: features, bugs, refactors, configuracion y documentacion con impacto funcional o estructural. No edites `src/`, configuracion o specs para cambios no triviales sin una change activa y su alcance definido.

Cambios triviales, como typos o ajustes de formato sin impacto funcional, no requieren una change.

OpenSpec usa el schema local `frontend-aware` configurado en `openspec/config.yaml`:

```text
openspec/
├── config.yaml
├── schemas/frontend-aware/
│   ├── schema.yaml                  # Flujo local basado en spec-driven
│   └── templates/design.md          # Plantilla frontend condicional
├── specs/<capability>/spec.md       # Comportamiento vigente
├── changes/<change>/
│   ├── proposal.md                  # Problema y alcance
│   ├── specs/<capability>/spec.md   # Delta de comportamiento
│   ├── design.md                    # Solucion y archivos afectados
│   └── tasks.md                     # Trabajo verificable
└── changes/archive/                 # Changes completadas
```

### Flujo

1. **Explorar:** revisa `openspec list --json`, `openspec/config.yaml`, specs relacionadas y el codigo actual. Usa `/opsx-explore` para investigar sin implementar.
2. **Planificar:** usa `/opsx-propose <nombre-kebab-case>` o `openspec new change "<nombre>"`. Crea los artefactos en orden de dependencias y consulta `openspec instructions <artifact-id> --change "<name>" --json`.
3. **Revisar:** proposal, delta specs, design y tasks deben estar completos antes de implementar. `/opsx-propose` solo planifica; no edita codigo.
4. **Implementar:** solo despues de una solicitud explicita, usa `/opsx-apply <name>`. Lee `openspec status --change "<name>" --json`, todos los `contextFiles` y ejecuta tasks en orden. Marca una task como completa solo cuando su comportamiento este implementado y verificado.
5. **Actualizar:** si cambia alcance o diseno, usa `/opsx-update <name>`. Este flujo solo modifica artefactos; despues vuelve a `/opsx-apply` para el codigo.
6. **Sincronizar y archivar:** usa `/opsx-sync <name>` para llevar deltas a specs principales cuando corresponda y `/opsx-archive <name>` para validar y mover la change a `openspec/changes/archive/`.

Reglas OpenSpec:

- Nunca crees `openspec/changes/<name>/` manualmente; usa `openspec new change` o `/opsx-propose`.
- Usa los paths devueltos por `openspec status`; no inventes nombres de artefactos ni rutas.
- Escribe specs en espanol sobre comportamiento observable, con `SHALL` o `MUST` y escenarios `WHEN/THEN` verificables.
- No inventes comportamiento del backend; separa hechos observados, supuestos y cambios propuestos.
- Usa `frontend-aware` para cualquier cambio que afecte rutas, paginas, layouts, providers, componentes, hooks, stores, servicios, estilos, tokens, dependencias de UI o archivos bajo `src/`. El schema ya esta seleccionado por `openspec/config.yaml`; no cambies a `spec-driven` manualmente.
- En cambios frontend, `design.md` debe incluir `## File Structure` con rutas reales y marcas `[NEW]`, `[MODIFY]`, `[DELETE]` o `[MOVE]`, seguido de `### Frontend Impact`.
- Mantiene `tasks.md` pequeno, verificable y sincronizado con `design.md`; incluye validacion visual o de interaccion cuando aplique.
- Reejecuta `openspec status --change "<name>" --json` despues de crear artefactos y `openspec validate --specs` cuando modifiques specs.
- Si hay varias changes activas, pide seleccion. Si se usa un store registrado, ejecuta `openspec store list --json` y conserva `--store <id>` en los comandos compatibles.

## Reglas obligatorias

- Ubica cada cambio en su feature o en `core` si es transversal.
- No pongas logica de negocio de una feature en `core`.
- Los componentes no hacen HTTP; usan hooks o callbacks.
- Los servicios usan el cliente Axios compartido y exponen fachadas como `UserService.getList()`.
- Los mappers convierten DTOs de API a modelos de dominio antes de llegar a la UI.
- React Query es la fuente de verdad para datos remotos; no los dupliques en Zustand.
- Las paginas coordinan datos y composicion; los componentes presentan datos y emiten eventos.
- No agregues nuevas dependencias de `core` hacia features. Las existentes son deuda tecnica.

## Ubicacion

| Necesidad | Ruta |
| --- | --- |
| Configuracion, constantes e infraestructura | `src/core/` |
| Componentes compartidos | `src/core/components/` |
| Layouts | `src/core/layouts/` |
| Providers | `src/core/providers/` o `src/providers.tsx` |
| Axios e interceptors | `src/core/interceptors/` |
| Store global de UI | `src/core/stores/` |
| Codigo de negocio | `src/features/<feature>/` |
| Paginas | `src/features/<feature>/pages/` |
| Componentes | `src/features/<feature>/components/` |
| Hooks | `src/features/<feature>/hooks/` |
| Servicios API | `src/features/<feature>/services/` |
| Mappers | `src/features/<feature>/mappers/` |
| Modelos, DTOs y tipos | `src/features/<feature>/types/` |
| Constantes y stores de feature | `src/features/<feature>/constants/`, `stores/` |

No crees carpetas globales para una necesidad de una sola feature. Solo sube una abstraccion a `core` si es estable y realmente transversal.

## Flujo de trabajo

### Antes de editar

1. Lee la feature afectada, sus tipos, servicios y componentes.
2. Busca servicios, mappers, hooks o componentes reutilizables.
3. Identifica si el cambio afecta API, estado remoto, estado cliente, routing o solo UI.
4. Revisa `git status` y conserva cambios ajenos.

### Durante la edicion

- Usa `apply_patch` para cambios manuales.
- Usa funciones flecha, comillas simples y sin punto y coma.
- Usa `import type` para imports de tipos.
- No introduzcas `any` para ocultar errores.
- No pongas toasts, navegacion o UI en servicios.
- No transformes DTOs dentro de componentes; usa mappers.
- No guardes secretos o valores reales de `.env`.
- No uses `git reset --hard` ni `git checkout --`.
- No hagas commit, amend, push o pull request salvo solicitud explicita.

## Nueva feature

```text
src/features/<feature>/
├── components/
├── constants/
├── hooks/
├── mappers/
├── pages/
├── services/
├── stores/
└── types/
```

Crea solo las carpetas necesarias. Flujo esperado:

```text
Page/component -> hook/React Query -> FeatureService -> Axios/interceptors
               -> API -> mapper DTO/domain -> React Query/UI
```

## Verificacion

Ejecuta siempre:

```bash
npm run lint
npm run build
```

Revisa loading, error, empty y success states; invalidacion de queries; expiracion de sesion; responsive; accesibilidad; imports sin usar; DTOs fuera de la UI y ausencia de HTTP duplicado.
