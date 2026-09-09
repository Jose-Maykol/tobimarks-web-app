## Context

El README actual mezcla presentación del producto, instalación, arquitectura y despliegue desde el inicio. El código confirma que Tobimarks permite guardar URLs, administrar marcadores, usar etiquetas y colecciones, marcar favoritos, registrar accesos, consultar un resumen estadístico y configurar automatizaciones de IA.

La documentación debe reflejar capacidades observadas en el frontend y separar claramente información de producto de información de desarrollo. Ver `proposal.md` para la motivación del cambio.

## Goals / Non-Goals

**Goals:**

- Hacer que el valor de Tobimarks sea comprensible antes de leer detalles técnicos.
- Ordenar el README según las secciones acordadas: propuesta de valor, problema, funcionamiento, funcionalidades, IA, ejemplo, screenshots y demos, API, instalación, arquitectura y seguridad.
- Mantener instrucciones locales reproducibles con las variables y comandos existentes.
- Documentar limitaciones explícitas cuando una capacidad todavía depende de la API o no está implementada en el frontend.

**Non-Goals:**

- Modificar funcionalidades, rutas, servicios o componentes.
- Crear screenshots, vídeos, enlaces de demo o documentación del backend que no existan.
- Diseñar una nueva identidad visual o añadir dependencias para mostrar capturas.
- Inventar licencia, políticas de privacidad o garantías de seguridad.

## Decisions

- **README centrado en producto:** abrir con una frase de valor y el problema resuelto. Esto sirve a usuarios, colaboradores y revisores mejor que abrir con React o Vite.
- **Funcionalidades basadas en código observado:** describir solo acciones presentes en las páginas y componentes actuales. No prometer búsqueda textual u otras capacidades no verificadas.
- **Screenshots y demos como sección propia:** incluir una sección preparada para recursos reales, con marcadores claros si todavía no hay enlaces. Evita mezclar material visual con instrucciones de instalación.
- **Referencia de API separada:** explicar que el frontend consume la API mediante `VITE_API_URL` y enlazar o describir endpoints solo cuando estén respaldados por el repositorio. No duplicar una especificación backend inexistente.
- **Seguridad y limitaciones con lenguaje preciso:** documentar Google OAuth, variables públicas `VITE_*`, dependencia del backend y ausencia de afirmaciones sobre garantías que el repositorio no demuestra.
- **Información técnica al final:** conservar stack, arquitectura, scripts, despliegue y troubleshooting, pero reducir su protagonismo inicial.

### Alternatives Considered

- **Mantener README técnico y añadir un resumen:** descartado porque el producto seguiría quedando oculto entre detalles de implementación.
- **Crear un README separado para usuarios:** descartado porque este repositorio necesita una única entrada que sirva para producto y desarrollo.
- **Añadir recursos visuales ficticios o externos sin validar:** descartado porque reduce la confianza y puede dejar enlaces rotos.

## Risks / Trade-offs

- **[Recursos visuales todavía no disponibles]** La sección de screenshots y demos puede quedar sin contenido final. Mitigación: dejar estructura explícita y marcar qué recurso falta, sin simular una demo.
- **[Desfase entre frontend y backend]** Algunas automatizaciones de IA dependen del comportamiento de la API. Mitigación: describirlas como preferencias configurables y evitar prometer resultados no verificables.
- **[Licencia desconocida]** No debe asumirse una licencia. Mitigación: declarar que la licencia queda pendiente o reflejar únicamente un archivo de licencia existente.
- **[README demasiado extenso]** La información técnica puede volver a ocultar el producto. Mitigación: usar un resumen corto por sección y mantener detalles profundos en `ARCHITECTURE.md`.

## Migration Plan

1. Reescribir `README.md` con la estructura aprobada.
2. Revisar nombres de funcionalidades contra el código actual y eliminar afirmaciones no respaldadas.
3. Validar enlaces, comandos, variables y formato Markdown.
4. Si el README nuevo introduce un error, restaurar únicamente el contenido anterior de `README.md`; no requiere migración de código ni rollback de datos.

## Open Questions

- URL oficial de la demo, si existe.
- Screenshots definitivas que deben incluirse.
- Licencia que el proyecto desea declarar, si todavía no está definida.
- URL o repositorio oficial de la API para completar su referencia.
