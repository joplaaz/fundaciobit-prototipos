---
name: "Prototipos Fundació BIT"
description: "Sistema visual extraído de la implementación estática y de su dirección heredada."
colors:
  blue: "#003366"
  blue-dark: "#062744"
  cyan: "#007d86"
  cyan-bright: "#00a8b5"
  ink: "#152d40"
  muted: "#536574"
  line: "#dce3e5"
  page: "#fff"
  subtle: "#f4f6f5"
  tint: "#edf4f5"
  green: "#19694d"
  button-hover: "#0e507d"
  secondary-border: "#bacbd3"
  field-border: "#bdcdd4"
  tag-ink: "#275368"
  focus: "#008c99"
  map-ground: "#edf1e9"
typography:
  display:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "56px"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "44px"
    fontWeight: 650
    lineHeight: 1.17
    letterSpacing: "-.035em"
  title:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "28px"
    fontWeight: 650
    lineHeight: 1.17
    letterSpacing: "-.025em"
  heading-small:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "20px"
    fontWeight: 650
    lineHeight: 1.17
    letterSpacing: "-.015em"
  body:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "15px"
    lineHeight: 1.6
  button:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "13px"
    fontWeight: 650
    lineHeight: 1.35
  field:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "12px"
    lineHeight: 1.6
  label:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "11px"
    fontWeight: 650
    lineHeight: 1.6
  navigation:
    fontFamily: '"Avenir Next", "Segoe UI", Arial, sans-serif'
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  field: "4px"
  action: "5px"
  utility: "6px"
  panel: "8px"
  composite: "10px"
  surface: "12px"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "32": "32px"
  "40": "40px"
  "64": "64px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.page}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "13px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "13px 20px"
  input:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
    width: "100%"
  tag:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.tag-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.field}"
    padding: "5px 9px"
  navigation:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
---

# Design System: Prototipos Fundació BIT

## Overview

**Creative North Star: "Dirección heredada de la memoria"**

Este documento registra el sistema visual implementado en los seis prototipos estáticos. Hereda el azul, el turquesa y la interfaz limpia de las maquetas de la memoria; no establece una identidad oficial de Fundació BIT.

La jerarquía se apoya en textos oscuros, fondos blancos y superficies suaves. Las interacciones tienen selección visible, foco de teclado y una variante de alto contraste.

**Key Characteristics:**

- Paleta azul y turquesa heredada.
- Tipografía sans del sistema, sin descarga de fuentes.
- Bordes finos y cartografía esquemática.

## Colors

### Primary

El azul institucional (`blue`) identifica acciones principales, enlaces y títulos. Su variante oscura (`blue-dark`) sostiene la franja de demostración y el pie; `button-hover` indica el paso del puntero por la acción principal.

### Secondary

El turquesa (`cyan`) acompaña selección, accesibilidad y controles; `cyan-bright` marca la navegación activa y detalles de la marca recreada. El verde (`green`) identifica disponibilidad y sostenibilidad, acompañado de texto.

### Neutral

`page` es el fondo blanco; `subtle` y `tint` separan grupos sin oscurecer el contenido. `ink` y `muted` distinguen texto principal y apoyo; `line`, `secondary-border` y `field-border` delimitan regiones y controles. `tag-ink` sirve a las etiquetas, `focus` al foco visible y `map-ground` al fondo cartográfico. El modo de alto contraste redefine parte de esta paleta en la hoja de estilos existente.

## Typography

La familia compartida es Avenir Next, con Segoe UI, Arial y sans-serif como alternativas locales. No hay fuentes descargadas. La jerarquía usa los tamaños del frontmatter: portada (`display`), título de página (`headline`), sección (`title`) y subsección (`heading-small`). Los encabezados tienen peso seminegrita; cuerpo, controles y etiquetas mantienen una escala compacta.

En móvil, el cuerpo pasa a (14px), el título general a (34px) y el de portada a (42px). La portada también tiene ajustes intermedios a (47px) y (39px); estos valores son variantes existentes, no una escala proporcional nueva.

## Layout

El contenedor centra el contenido con un máximo de (1440px) y márgenes interiores de (64px). Desde (1600px), el máximo crece a (1520px). Los cortes de (1200px), (900px) y (640px) reducen los márgenes interiores a (36px), (26px) y (20px).

Las composiciones combinan columnas de contenido y mapas. Las tarjetas de agenda pasan de tres a dos y después a una columna. En móvil, servicio, directorio, visor y movilidad se apilan; la navegación se muestra mediante el control de menú y distribuye sus enlaces en dos columnas. Los espacios reutilizados se recogen en el frontmatter; existen ajustes locales adicionales.

## Elevation & Depth

Los contenidos usan fondos y bordes finos como separación principal. Las tarjetas de agenda no llevan sombra. La sombra compartida (`0 10px 34px #00000017`) corresponde al diálogo y a las notificaciones; los controles flotantes del mapa usan `0 3px 12px #0000001a`. El diálogo oscurece el fondo mediante un velo (`#102e486b`). Las extrusiones del mapa pertenecen a la representación sintética de edificios.

## Shapes

Los campos y etiquetas comparten esquinas pequeñas; acciones, controles auxiliares, paneles y superficies usan los radios del frontmatter. Las tarjetas de agenda emplean el radio de superficie y borde fino. Directorio, visor y planificador agrupan paneles dentro del radio compuesto. Indicadores de estado y algunos pasos de proceso son circulares.

## Components

- **Botón primario:** azul con texto blanco, altura mínima (48px), borde transparente y transición de fondo y texto (.18s). Al pasar el puntero toma `button-hover`; al deshabilitarse reduce la opacidad a (.6).
- **Botón secundario:** mismo tamaño y forma; fondo transparente, texto azul y borde `secondary-border`. Al pasar el puntero usa `tint` y borde azul.
- **Campo:** etiqueta visible, fondo blanco y borde `field-border`; altura mínima (45px), que pasa a (46px) en móvil. El foco usa trazo (3px) con separación (2px); el cursor de escritura es turquesa.
- **Etiqueta:** fondo `tint`, texto `tag-ink` y tipografía de etiqueta. Es una pieza informativa, sin estados de botón añadidos.
- **Navegación:** enlaces de altura mínima (53px), borde inferior activo turquesa brillante y cambio a turquesa al pasar el puntero. En móvil, la altura es (46px) y la página actual se subraya. El selector ES/CA/EN y el control de alto contraste pertenecen a la cabecera compartida.

El foco general usa un trazo (3px) con separación (4px). El mapa atenúa edificios con transiciones (.2s) y dibuja las rutas en (.8s), con `cubic-bezier(.16,1,.3,1)`. Las notificaciones animan transformación y opacidad (.2s). Con reducción de movimiento, las duraciones pasan a (.01ms) y el desplazamiento deja de ser suave.

Las cinco muestras de `.impeccable/design.json` contienen HTML y CSS independientes, con variables del proyecto y valores de respaldo; conservan los estados existentes.

## Do's and Don'ts

- **Do** conservar la paleta heredada y las funciones de cada color.
- **Do** mantener etiquetas, foco visible, alto contraste y reducción de movimiento.
- **Do** conservar los avisos de demostración y comprobar el espacio disponible en castellano, catalán e inglés.

- **Don't** presentar esta implementación como una identidad oficial.
- **Don't** sustituir los mapas esquemáticos por representaciones que prometan precisión geográfica.
- **Don't** eliminar el indicador de selección ni el foco al adaptar componentes.
