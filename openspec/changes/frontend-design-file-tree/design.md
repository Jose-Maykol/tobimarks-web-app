## Context

OpenSpec usa el schema `spec-driven` instalado por la CLI. Su configuracion admite
reglas por artefacto, pero las plantillas instaladas pertenecen al paquete global.
El proyecto necesita versionar su propia plantilla sin modificar archivos fuera del
repositorio ni acoplar la documentacion a una feature concreta.

## Goals / Non-Goals

**Goals:**

- Versionar un schema local con la misma secuencia de artefactos existente.
- Hacer que `design.md` indique cuando debe incluir el arbol de archivos frontend.
- Usar rutas reales, marcas de operacion y una seccion de impacto frontend
  coherente con `tasks.md`.
- Mantener la seleccion condicional para no sobrecargar cambios no relacionados
  con la interfaz.

**Non-Goals:**

- No cambiar el runtime de React ni el comportamiento de la aplicacion.
- No crear un componente, utilidad o dependencia dentro de `src/`.
- No sustituir las specs funcionales por decisiones de implementacion.

## File Structure

```text
tobimarks-web-app/
├── AGENTS.md                                        [MODIFY]
└── openspec/
    ├── config.yaml                                  [MODIFY]
    └── schemas/
        └── frontend-aware/
            ├── schema.yaml                          [NEW]
            └── templates/
                └── design.md                        [NEW]
```

## Decisions

### Local schema instead of global template modification

Se usara un schema local `frontend-aware` copiado desde `spec-driven`. Esto evita
que una actualizacion de la CLI sobrescriba la personalizacion y deja las reglas
revisables junto al proyecto. Modificar la plantilla global se descarta porque no
seria reproducible para otros colaboradores.

### Preserve the existing artifact graph

El schema mantendra `proposal`, `specs`, `design`, `tasks` y `apply` con las mismas
dependencias. Solo se especializaran la plantilla y las instrucciones de `design`,
por lo que las changes existentes no necesitan otro proceso.

### Conditional frontend section

La instruccion de `design` identificara impacto frontend por las superficies del
proyecto (`src/`, rutas, layouts, providers, UI, estado y estilos). La plantilla
ofrecera la estructura y sus marcas como guia; el documento solo completara
`## File Structure` y `### Frontend Impact` cuando la condicion se cumpla.

### Explicit change markers

El arbol usara `[NEW]`, `[MODIFY]`, `[DELETE]` y `[MOVE]`. Esta notacion facilita
comparar el diseño con `tasks.md` y evita que una lista de archivos ambigua se
convierta en trabajo no planificado.

### Agent-level schema selection

`AGENTS.md` documentara que `frontend-aware` es el schema local por defecto y
enumerara las superficies que activan la guia frontend. Esto evita que un agente
conozca la plantilla pero seleccione manualmente el schema global equivocado.

## Risks / Trade-offs

- [Divergencia con OpenSpec] -> Mantener el fork minimo y validar el schema con
  `openspec schema validate frontend-aware`.
- [La condicion depende del contexto del modelo] -> Repetir la deteccion en la
  regla `design` de `openspec/config.yaml` y exigir la sincronizacion con tareas.
- [Cambios existentes usan el schema anterior] -> Mantener el mismo grafo y
  actualizar el metadata de la change activa durante la migracion.

## Migration Plan

1. Crear el schema local a partir de `spec-driven`.
2. Personalizar `templates/design.md` y la instruccion del artefacto `design`.
3. Cambiar el schema por defecto del proyecto a `frontend-aware`.
4. Validar el schema, las specs y la generacion de instrucciones.
5. Revertir el valor `schema` a `spec-driven` si la validacion del schema local
   falla; no hay migracion de datos ni rollback de runtime.
