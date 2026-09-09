## 1. Local Schema

- [x] 1.1 Fork `spec-driven` como schema local `frontend-aware` y verificar que conserva proposal, specs, design, tasks y apply
- [x] 1.2 Personalizar la plantilla local de `design.md` con la seccion condicional `## File Structure` y verificar las marcas `[NEW]`, `[MODIFY]`, `[DELETE]` y `[MOVE]`
- [x] 1.3 Personalizar las instrucciones del artefacto `design` con la condicion frontend y `### Frontend Impact`; verificar que las instrucciones enriquecidas incluyen ambas reglas

## 2. Project Integration

- [x] 2.1 Configurar `openspec/config.yaml` para usar `frontend-aware` y conservar las reglas de sincronizacion con `tasks.md`; verificar que el schema local se resuelve como default
- [x] 2.2 Actualizar el metadata de esta change al schema local y verificar que `openspec status --change frontend-design-file-tree --json` mantiene todos los artefactos
- [x] 2.3 Documentar en `AGENTS.md` cuando usar `frontend-aware` y verificar que la guia menciona sus superficies frontend y las secciones condicionales de `design.md`

## 3. Verification

- [x] 3.1 Validar el schema local con `openspec schema validate frontend-aware --json` y validar las specs con `openspec validate --specs --json --no-interactive`
- [x] 3.2 Ejecutar `npm run lint` y `npm run build` para confirmar que el cambio de workflow no afecta la aplicacion
