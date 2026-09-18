# Salud Digital

Comunidad de práctica en salud para Panamá: reúne las cifras epidemiológicas
oficiales del Ministerio de Salud (MINSA) y las noticias que las reportan, con
la fuente siempre visible junto al dato.

Proyecto académico de **Desarrollo de Software 5**, Universidad Tecnológica de
Panamá.

## Qué muestra

- **Panorama nacional 2026** — dengue, malaria, influenza, síndrome gripal,
  leishmaniasis e IRAG, con el acumulado del año al cierre de la semana
  epidemiológica 33 (16 al 22 de agosto de 2026).
- **Noticias verificadas** — ocho notas reales del MINSA y de medios
  panameños, filtrables por tema y con enlace a la publicación original.
- **Dengue por región de salud** — casos 2026 frente a 2025 con la variación
  calculada, más el desglose de defunciones por región.
- **Recursos oficiales** — línea 169 del MINSA, SUME 911, MINSA, ICGES y OPS.
- **Comunidad de práctica** — vista previa del foro. Está marcada como
  contenido de demostración para no confundirla con los datos oficiales.

## Origen de los datos

Ninguna cifra del sitio es inventada. Todas provienen de los informes
epidemiológicos semanales del MINSA y de los medios que los publicaron; cada
indicador, tabla y noticia enlaza a su fuente desde la propia página. El
detalle de los cortes usados está en `js/data.js`.

Las fotografías son de Wikimedia Commons, en dominio público o con licencia
libre. La atribución completa está en [CREDITS.md](CREDITS.md).

## Cómo ejecutarlo

Es un sitio estático: no necesita backend ni instalación.

```bash
# Con XAMPP, colocándolo en htdocs
http://localhost/salud-digital/

# O con cualquier servidor estático
python -m http.server 8000
```

También se publica automáticamente con GitHub Pages desde la rama principal.

## Estructura

```
salud-digital/
├── index.html          # Estructura de la página
├── css/styles.css      # Estilos, adaptables a móvil
├── js/data.js          # Cifras, noticias y recursos, con sus fuentes
├── js/main.js          # Render, filtros, buscador y modal
├── assets/img/         # Fotografías de licencia libre
└── CREDITS.md          # Atribución de imágenes y fuentes
```

## Equipo

- Joel Alvarez
- Luis Rivera
- Emmanuel Concepción

Profesora: Cindy Esquivel

## Aviso

Sitio informativo sin fines comerciales. No sustituye la consulta médica ni la
información oficial del Ministerio de Salud.
