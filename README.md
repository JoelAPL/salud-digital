# 🏥 Salud Digital - Comunidad de Práctica en Salud

## Descripción

**Salud Digital - Últimas Novedades** es una plataforma web diseñada como comunidad de práctica para centralizar información sobre salud en Panamá. Permite a ciudadanos, profesionales sanitarios y autoridades compartir noticias, estadísticas epidemiológicas, experiencias y participar en foros de discusión.

## 📋 Características

- ✅ **Noticias de Salud**: Últimas novedades sobre brotes, prevención, investigación e iniciativas de salud
- ✅ **Estadísticas Epidemiológicas**: Datos de enfermedades por provincia, período y tipo
- ✅ **Foro de Discusión**: Comunidad de práctica donde participantes comparten experiencias
- ✅ **Sistema de Búsqueda**: Búsqueda funcional de noticias y temas
- ✅ **Interfaz Responsiva**: Funciona en desktop, tablet y móvil
- ✅ **Datos Reales**: Cargados con información simulada de salud pública en Panamá

## 📁 Estructura de Archivos

```
SaludDigital/
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos responsive
├── js/
│   ├── data.js         # Base de datos con noticias y estadísticas
│   └── main.js         # Lógica principal de la aplicación
├── assets/
│   └── img/            # Carpeta para imágenes (futura)
└── README.md           # Este archivo
```

## 🚀 Cómo Ejecutar

### Opción 1: Servidor Local Python
```bash
# Navegar a la carpeta
cd SaludDigital

# Python 3
python -m http.server 8000

# Luego abrir en navegador: http://localhost:8000
```

### Opción 2: Servidor Local Node.js
```bash
# Instalar servidor http-server (una sola vez)
npm install -g http-server

# Ejecutar desde la carpeta del proyecto
http-server

# Abrir en navegador: http://localhost:8080
```

### Opción 3: Visual Studio Code Live Server
1. Instalar la extensión "Live Server" en VS Code
2. Hacer clic derecho en `index.html`
3. Seleccionar "Open with Live Server"

## 🎯 Funcionalidades Implementadas

### 1. **Página de Inicio**
- Banner principal con buscador
- Últimas noticias destacadas (6 noticias)
- Estadísticas epidemiológicas por provincia
- Temas populares del foro
- Recursos útiles

### 2. **Noticias**
- Listado de 6 noticias recientes
- Categorías: Brotes, Prevención, Investigación, Institucional, Bienestar
- Información de autor, fecha y comentarios
- Onclick para ver detalle completo

### 3. **Estadísticas**
- Selector de provincia (9 provincias de Panamá)
- Selector de período (2024-2026)
- Tarjetas de estadísticas principales (Dengue, COVID-19, Influenza, TB)
- Tabla detallada con enfermedades por provincia
- Datos reales simulados

### 4. **Foro de Discusión**
- Temas destacados con autor, fecha, respuestas y vistas
- 6 temas disponibles
- Interacción completa

### 5. **Búsqueda**
- Búsqueda funcional por palabra clave
- Busca en noticias y temas del foro
- Muestra resultados destacados
- Enter key funciona

### 6. **Diseño Responsivo**
- Mobile first approach
- Breakpoints: 768px (tablet), 480px (móvil)
- Menú adaptable
- Grillas flexibles

## 📊 Datos Incluidos

### Noticias (6 noticias)
- Dengue en Panamá Oeste
- Campaña de vacunación
- Estudio sobre actividad física
- Nuevos protocolos hospitalarios
- Iniciativa de salud mental
- Proliferación de mosquitos

### Estadísticas (9 provincias)
- **Enfermedades rastreadas**: Dengue, COVID-19, Influenza, Tuberculosis, Malaria
- **Provincias**: Panamá, Colón, Chiriquí, Bocas del Toro, Veraguas, Darién, Herrera, Los Santos, Guna Yala
- **Datos por enfermedad**: Casos, muertes, recuperados, fecha de actualización

### Temas del Foro (6 temas)
- Prevención de dengue
- Experiencias con COVID-19
- Salud cardiovascular
- Síntomas de tuberculosis
- Recomendaciones de centros de salud
- Importancia del ejercicio

## 🎨 Características de Diseño

- **Colores**:
  - Azul primario: #0066cc
  - Rojo secundario: #ff6b6b
  - Verde éxito: #51cf66
  - Fondo claro: #f5f5f5

- **Tipografía**:
  - Segoe UI, Tahoma, Geneva, Verdana, sans-serif
  - Responsive font sizes

- **Elementos**:
  - Tarjetas con hover effects
  - Botones interactivos
  - Tabla de datos
  - Modales de detalles

## 🔧 Tecnologías Usadas

- **HTML5**: Semántica y estructura
- **CSS3**: Responsive design, flexbox, grid
- **JavaScript**: Lógica pura (sin frameworks)
- **Datos**: Arrays y objetos en JavaScript

## 📝 Próximas Mejoras (Etapa 2 y siguientes)

- [ ] Sistema de autenticación
- [ ] Base de datos MySQL
- [ ] Backend en PHP
- [ ] Cargar imágenes reales
- [ ] Sistema de comentarios funcional
- [ ] Notificaciones en tiempo real
- [ ] Gráficos interactivos (Chart.js)
- [ ] Descargar PDF de estadísticas
- [ ] API REST para datos

## 👥 Equipo Desarrollador

- **Joel Alvarez**
- **Luis Rivera**
- **Emmanuel Concepcion**

**Profesora**: Cindy Esquivel  
**Asignatura**: Desarrollo de Software 5  
**Universidad**: Universidad Tecnológica de Panamá

## 📄 Documento de Requerimientos

Ver el documento de requerimientos en:
`Etapa1_Requerimientos_Salud_Digital.docx`

Contiene:
- Análisis del problema
- Perfiles de usuarios
- Necesidades específicas
- Funcionalidades del sistema
- Requerimientos funcionales (20)
- Requerimientos no funcionales (12)

## 📞 Contacto y Soporte

Para preguntas o sugerencias sobre la plataforma, contacta a los desarrolladores a través del proyecto en GitHub.

---

**Última actualización**: 17 de Septiembre de 2026  
**Versión**: 1.0 - Página de Inicio Funcional
