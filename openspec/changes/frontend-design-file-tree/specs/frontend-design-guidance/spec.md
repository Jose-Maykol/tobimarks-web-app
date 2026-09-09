## Purpose

Define una guia versionada para que los disenos de cambios frontend documenten de
forma precisa los archivos afectados y las decisiones especificas de la interfaz.

## ADDED Requirements

### Requirement: Frontend design documents show the affected file tree

Cuando un cambio con `design.md` tenga impacto frontend, el documento MUST incluir
una seccion `## File Structure` con un arbol de los archivos afectados.

#### Scenario: Frontend change creates and modifies files

- **WHEN** un cambio frontend requiere crear un componente y modificar una pagina
- **THEN** `design.md` MUST mostrar las rutas exactas de ambos archivos en el arbol
- **AND** MUST marcar cada archivo con `[NEW]` o `[MODIFY]`

#### Scenario: Frontend change removes or moves files

- **WHEN** un cambio frontend elimina o mueve archivos existentes
- **THEN** `design.md` MUST incluir esos archivos con `[DELETE]` o `[MOVE]`
- **AND** MUST mostrar las rutas de origen y destino cuando corresponda

### Requirement: The file tree includes all implementation surfaces

El arbol MUST incluir archivos de codigo, tests, estilos, configuracion y
dependencias que formen parte del cambio, y MUST omitir archivos hipoteticos no
respaldados por el alcance o el diseño.

#### Scenario: Change includes validation and configuration

- **WHEN** un cambio frontend necesita un test y una modificacion de configuracion
- **THEN** ambos archivos MUST aparecer en `## File Structure`
- **AND** las tareas de `tasks.md` MUST poder relacionarse con ese arbol

### Requirement: Frontend impact is documented conditionally

Los cambios frontend MUST documentar flujo o ruta, composicion de UI, estado,
responsive, accesibilidad, tema visual y verificacion. Los cambios sin impacto
frontend MUST omitir ese detalle o declarar que no aplica.

#### Scenario: Design has frontend impact

- **WHEN** el cambio afecta una ruta, pagina, layout, provider, componente, hook,
  store, servicio, estilo o dependencia de UI
- **THEN** `design.md` MUST incluir `### Frontend Impact` despues del arbol
- **AND** MUST describir los estados de carga, error, vacio y exito cuando se
  consulte o modifique estado remoto

#### Scenario: Design has no frontend impact

- **WHEN** el cambio solo afecta documentacion, infraestructura o logica sin UI
- **THEN** `design.md` MUST NOT inventar un arbol o decisiones de presentacion

### Requirement: Agents select the frontend-aware schema for frontend changes

Las instrucciones del repositorio MUST indicar que los cambios con impacto
frontend usan el schema local `frontend-aware` y MUST describir las superficies que
activan esa seleccion.

#### Scenario: Agent starts a frontend change

- **WHEN** el cambio afecta rutas, paginas, layouts, providers, componentes, hooks,
  stores, servicios, estilos, dependencias de UI o archivos bajo `src/`
- **THEN** el agente MUST usar el flujo configurado con `frontend-aware`
- **AND** MUST aplicar las instrucciones de `## File Structure` y
  `### Frontend Impact` en el `design.md` generado

#### Scenario: Agent starts a non-frontend change

- **WHEN** el cambio no tiene impacto en la interfaz
- **THEN** el agente MUST conservar el flujo OpenSpec configurado sin inventar
  decisiones frontend
