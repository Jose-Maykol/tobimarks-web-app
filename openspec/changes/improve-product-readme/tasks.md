## 1. Reestructuración del README

- [x] 1.1 Reescribir la apertura de `README.md` con la propuesta de valor y el problema que Tobimarks resuelve; verificar que una persona pueda identificar el producto sin leer el stack.
- [x] 1.2 Documentar cómo funciona Tobimarks, sus funcionalidades observables y un ejemplo rápido de uso; verificar cada afirmación contra las rutas y componentes actuales.
- [x] 1.3 Añadir sección de organización asistida por IA; verificar que describa únicamente auto-etiquetado y sugerencias o asignación automática de colecciones configurables.
- [x] 1.4 Añadir sección independiente de screenshots y demos con espacios claros para recursos reales; verificar que no incluya enlaces inventados ni imágenes inexistentes.

## 2. Documentación técnica y límites

- [x] 2.1 Reordenar referencia de API, instalación local, variables de entorno, arquitectura y stack después de la explicación del producto; verificar comandos, rutas y variables contra el repositorio.
- [x] 2.2 Documentar seguridad, limitaciones y licencia sin afirmar garantías o una licencia no respaldada; verificar que Google OAuth, dependencia de API y estado de licencia queden claros.
- [x] 2.3 Eliminar o corregir afirmaciones desactualizadas, incluyendo dependencias o funcionalidades no presentes; verificar que no se mencione `Framer Motion` si no existe en `package.json`.

## 3. Verificación final

- [x] 3.1 Revisar el Markdown renderizado y todos los enlaces internos y externos; verificar visualmente títulos, código, tablas y placeholders de screenshots o demos.
- [x] 3.2 Ejecutar `npm run lint` y `npm run build` para confirmar que el cambio documental no altera el proyecto; registrar cualquier fallo preexistente sin modificar archivos ajenos.
