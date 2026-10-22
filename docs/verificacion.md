# Comprobaciones de la entrega

Verificación realizada el 22 de octubre de 2026 sobre la web servida por HTTP local.

| Comprobación | Resultado |
| --- | --- |
| Seis pantallas a 1440 × 1000 y 390 × 844 | Cargan, sin desbordamiento horizontal. |
| Consola del navegador | Sin errores de JavaScript durante los recorridos comprobados. |
| Solicitud de servicio | Completar, revisar, volver conservando el borrador y confirmar la simulación. |
| Búsqueda transversal | «Blau» devuelve una coincidencia con enlace al visor. |
| Salto al contenido | Conserva la ruta de servicio y sitúa el foco en `main`. |
| Descarga de guía | Archivo de texto descargado correctamente. |
| Agenda | Filtro Menorca reduce a una actividad, vista de lista e inscripción simulada completada. |
| Directorio | Búsqueda «Ona», estado vacío, limpieza, cambio de sede y sincronización de ficha/mapa comprobados. |
| Vista accesible | Tabla de Menorca con dos registros y Eivissa con dos registros. |
| Visor | Selección con Enter, cambio de sede, capas, 2D, zoom y entrada/salida del modo quiosco. |
| Foco del mapa | Dos activaciones Enter de zoom y Space en reinicio conservan el foco; el reinicio restaura el encuadre. |
| Exclusión de resultados | Un edificio excluido por filtro tiene `tabindex=-1`, `aria-disabled` y no dispone de manejador de selección. |
| Movilidad | Ruta de ejemplo dibujada, cuatro alternativas e itinerario textual. |
| Sostenibilidad | En el escenario inicial de bicicleta: 9,5 km × 40 trayectos × 120 g/km = 45,6 kg evitados. Al elegir coche, el ahorro pasa a 0 kg. |
| Idiomas | Cambio a catalán, inglés y castellano; título y navegación actualizados. |
| Contraste | El botón activa su estado y el tema de contraste. |
| Revisión visual independiente | Tres correcciones revisadas y resueltas: rótulos de mapa, foco y exclusión por filtros. |

Las comprobaciones de esta tabla se realizaron sobre el servidor local; no constituyen una auditoría de certificación WCAG. El navegador de pruebas permite HTTP/HTTPS y no admite abrir `file://`. La web usa scripts clásicos y recursos relativos, sin módulos ni peticiones a APIs.
