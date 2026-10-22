# Correspondencia con la memoria y guion de demostración

Los seis prototipos convierten en recorridos navegables las propuestas de la memoria. Las páginas de referencia son las numeradas en su pie, verificadas al renderizar el documento original.

| Propuesta | Referencia | Implementación |
| --- | --- | --- |
| Portada institucional | 1.3, págs. 40–42 | `#/inicio`: búsqueda, accesos, agenda y sedes. |
| Ficha de proyecto o servicio | 1.3, págs. 41–42 | `#/servicio`: programa, documentación y solicitud en dos pasos. |
| Agenda TIC, noticias y eventos | 1.3, págs. 41–42 | `#/agenda`: actividad filtrable, archivo e inscripción simulada. |
| Directorio y mapa integrado | 1.3, pág. 41; 2.1, pág. 74 | `#/directorio`: selección bidireccional y espacios disponibles. |
| Planificador «Cómo llegar» | 2.1, pág. 73 | `#/movilidad`: origen, destino, cuatro modos e itinerario textual. |
| Móvil accesible y recarga | 2.1, pág. 75 | Diseño móvil, capa de recarga y alternativa accesible. |
| Visor cartográfico y 2.5D | 2.2, págs. 80 y 85 | `#/visor`: edificios extruidos, capas, selección, orientación y zoom. |
| Imagen del visor pendiente | 2.2, págs. 86–87 | Sustituida en esta entrega por una interfaz real del visor que puede capturarse como imagen. |
| Movilidad y sostenibilidad | 2.3, págs. 91–92 | `#/movilidad`: mapa, comparación y escenario de emisiones. |
| Demos de sprint | 1.5, pág. 60 | El índice `#/prototipos` ofrece los recorridos para realizar la presentación. No programa reuniones ni genera actas. |

## Presentación de cinco minutos

1. En **Inicio**, busca «Blau» y abre el resultado para localizarlo en el visor.
2. En **Proyectos y servicios**, abre «Probar solicitud», completa datos ficticios, continúa, vuelve atrás para comprobar el borrador y confirma la simulación.
3. En **Agenda TIC**, filtra Menorca; cambia entre lista y tarjetas. Abre el evento, prueba la inscripción con datos ficticios y descarga el calendario de ejemplo.
4. En **Empresas y espacios**, activa «Solo espacios disponibles», selecciona un edificio y observa la sincronización de mapa y ficha. Abre una solicitud de visita y ciérrala.
5. En **Visor cartográfico**, cambia entre Palma, Menorca y Eivissa. Alterna 2D/2.5D, activa o desactiva recarga, mueve el zoom y prueba la vista accesible y el quiosco.
6. Desde una ficha, abre **Cómo llegar aquí**, calcula la ruta, compara los cuatro modos y cambia los trayectos mensuales para ver el escenario de CO₂.

El resultado esperado de los formularios es «Simulación completada». No se envía información. Para repetir la presentación, usa «Reiniciar demostración» en el índice de demos.

## Componentes que necesitaría una versión de producción

La conexión a datos oficiales, cartografía geográfica y horarios; el CMS y APIs; los formularios administrativos y reservas; la autenticación; la revisión del contenido legal y de marca; la validación especializada de accesibilidad y el despliegue institucional. Estos servicios no forman parte del prototipo estático.
