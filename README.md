# Prototipos interactivos de Fundació BIT

Abre `index.html` para explorar seis prototipos conectados. La web está preparada para GitHub Pages: solo utiliza HTML, CSS y JavaScript, sin instalación, compilación, claves ni servicios externos.

[Abrir los prototipos en GitHub Pages](https://joplaaz.github.io/fundaciobit-prototipos/) · [Repositorio](https://github.com/joplaaz/fundaciobit-prototipos)

## Publicar en GitHub Pages

1. Sube **el contenido de esta carpeta** a la raíz de tu repositorio, incluyendo `index.html`, `assets/` y `.nojekyll`.
2. En el repositorio, abre **Settings → Pages**.
3. Selecciona **Deploy from a branch**, la rama existente que contiene los archivos y la carpeta **/ (root)**. Guarda la configuración.
4. Cuando GitHub termine la publicación, abre la URL que aparece en Pages.

No hace falta crear otra rama ni configurar una acción de compilación. Si guardas esta carpeta dentro de otra carpeta de un repositorio, la URL de la demo llevará también ese nombre. Pages solo permite seleccionar la raíz o `/docs` como carpeta de publicación desde una rama; para la opción directa, sube el contenido a la raíz.

Referencia: [configurar la fuente de publicación en la documentación oficial de GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Todos los recursos tienen rutas relativas y las pantallas usan `#/…`, por lo que también funcionan en una web de proyecto como `https://TU_USUARIO.github.io/TU_REPOSITORIO/`.

## Pantallas y recorridos

| Pantalla | Enlace local | Qué permite probar |
| --- | --- | --- |
| Portada institucional | `index.html#/inicio` | Búsqueda transversal, accesos a servicios, actividades y sedes. |
| Ficha de proyecto o servicio | `index.html#/servicio` | Información Emprenbit, requisitos, descarga y solicitud con revisión del borrador. |
| Agenda TIC | `index.html#/agenda` | Filtros por sede, temática y modalidad, archivo, lista/tarjetas, inscripción simulada y descarga `.ics`. |
| Directorio y espacios | `index.html#/directorio` | Empresas ficticias, filtros, disponibilidad, selección en mapa y solicitud de visita. |
| Visor cartográfico | `index.html#/visor` | Tres sedes, capas, edificios 2D/2.5D, zoom, desplazamiento con ratón, orientación, vista accesible y quiosco. |
| Movilidad y sostenibilidad | `index.html#/movilidad` | Comparación de cuatro modalidades, itinerario accesible y escenario de emisiones. |
| Índice de demos | `index.html#/prototipos` | Acceso a los seis prototipos, referencias en la memoria y reinicio de la sesión de demostración. |

Prueba este recorrido: **Inicio → Busco un espacio → Seleccionar edificio → Cómo llegar aquí → Calcular ruta → Comparar bicicleta y coche**.

La interfaz se puede cambiar a castellano, catalán o inglés. El botón de contraste aumenta el contraste. En móvil, el botón de menú despliega la navegación. Los edificios del mapa se pueden seleccionar con Tab y Enter. Escape cierra los diálogos y sale del modo quiosco.

## Ejecutar con un servidor local opcional

No es necesario para la demo. Si prefieres servirla por HTTP, ejecuta desde esta carpeta:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8000`. Detén el servidor con Ctrl+C.

## Datos y límites

Los datos de empresas, disponibilidad, aforos, rutas y métricas son sintéticos. Los nombres de los centros y algunos edificios proceden de la memoria, pero sus posiciones en el visor son esquemáticas. El mapa no tiene escala geográfica ni sirve para navegar sobre el terreno.

Los formularios no envían ni guardan datos personales. El borrador solo vive en memoria mientras el diálogo permanece abierto. La selección de idioma y contraste usa `localStorage` si el navegador lo permite. Las inscripciones simuladas guardan únicamente el identificador del evento en `sessionStorage`.

Las fechas de la agenda son ejemplos fijos; el archivo se separa con la fecha de referencia 22 de octubre de 2026. El calendario descargado incluye `[DEMO]` en el título. Los documentos descargados son guías de ejemplo, no bases oficiales.

El cálculo de CO₂ usa 120 g/km para coche, 40 g/pasajero-km para bus/metro y 0 g de emisiones directas para pie/bicicleta. No incluye ciclo de vida, ocupación real, tráfico ni datos oficiales en tiempo real. El panel es un escenario del modo elegido, no una estadística observada del parque.

No se integran Strapi, Figma, GTFS, geoservicios OGC, autenticación, reservas reales ni expedientes administrativos. El alcance de esta entrega es la demostración de las experiencias de usuario. No se declara una certificación WCAG ni carácter oficial.

## Modificar el proyecto

| Archivo | Función |
| --- | --- |
| `assets/js/data.js` | Datos de ejemplo y factores de cálculo. |
| `assets/js/i18n.js` | Textos de la interfaz en tres idiomas. |
| `assets/js/map.js` | Dibujo y controles del mapa esquemático. |
| `assets/js/app.js` | Pantallas, navegación, formularios y cálculos. |
| `assets/css/styles.css` | Diseño adaptable y estados de interacción. |
| `docs/alcance.md` | Correspondencia con la memoria y guion de demostración. |

El repositorio de publicación utiliza su rama principal `main`, sin ramas adicionales.
