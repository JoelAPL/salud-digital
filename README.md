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

## Páginas

| Página | Qué hace |
|---|---|
| `index.html` | Inicio: panorama, noticias, estadísticas, recursos y foro |
| `registro.html` | Crear cuenta con correo institucional `@utp.ac.pa` |
| `login.html` | Iniciar sesión |
| `temas.html` | Catálogo de temas con sus noticias, discusiones y recursos |
| `foro.html` | Buscar, filtrar y ordenar temas; abrir un tema nuevo |
| `publicacion.html` | Un tema con sus respuestas: útil, guardar, reportar y responder |
| `recursos.html` | Material de la comunidad y contactos oficiales |
| `perfil.html` | Publicaciones, guardados y edición del perfil |

La cuenta y lo que se publica en el foro son una **sesión de demostración**:
se guardan solo en el navegador (`localStorage`) y la contraseña nunca se
almacena. Se reemplazará por PHP y MySQL en la etapa de servidor.

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
├── index.html          # Inicio
├── registro.html       # Crear cuenta
├── login.html          # Iniciar sesión
├── temas.html          # Catálogo de temas
├── foro.html           # Foro de la comunidad
├── publicacion.html    # Vista de un tema del foro
├── recursos.html       # Repositorio de recursos
├── perfil.html         # Perfil del usuario
├── css/styles.css      # Estilos, adaptables a computadora, tableta y teléfono
├── js/data.js          # Cifras, noticias, temas y recursos, con sus fuentes
├── js/comun.js         # Menú, sesión de demostración y validación compartida
├── js/main.js          # Inicio: render, filtros, buscador y modal
├── js/acceso.js        # Registro e inicio de sesión
├── js/temas.js         # Catálogo de temas
├── js/foro.js          # Lista del foro y nuevo tema
├── js/publicacion.js   # Respuestas, útil, guardar y reportar
├── js/recursos.js      # Tabla de recursos y formulario para compartir
├── js/perfil.js        # Perfil, pestañas y edición
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
