## Why

Los cambios frontend necesitan dejar claro, antes de implementar, que archivos se
crearan, modificaran, moveran o eliminaran. Las reglas actuales orientan al modelo,
pero no ofrecen una plantilla versionada del proyecto para documentar ese arbol de
forma consistente.

## What Changes

- Crear un schema local de OpenSpec basado en `spec-driven`.
- Personalizar la plantilla e instrucciones de `design.md` para cambios frontend.
- Exigir una seccion `## File Structure` con rutas reales y marcas de operacion.
- Mantener la seccion condicionada: los cambios sin impacto frontend no deben
  incluir detalles de UI.
- Configurar el proyecto para usar el schema local sin cambiar el flujo de
  `proposal -> specs -> design -> tasks`.

## Capabilities

### New Capabilities

- `frontend-design-guidance`: documenta el arbol de archivos y el impacto frontend
  de los cambios que generen `design.md`.

### Modified Capabilities

<!-- No se modifican capacidades funcionales existentes de Tobimarks. -->

## Impact

- Afecta `AGENTS.md`, `openspec/config.yaml` y el schema local bajo `openspec/schemas/`.
- Cambia la plantilla y las instrucciones usadas al generar `design.md`.
- No cambia el runtime, la API, las dependencias ni el comportamiento de la SPA.
