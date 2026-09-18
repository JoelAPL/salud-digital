/* =========================================================================
   Salud Digital - Datos
   -------------------------------------------------------------------------
   Todas las cifras de este archivo provienen de informes públicos del
   Ministerio de Salud de Panamá (MINSA) y de la prensa que los reporta.
   Cada bloque indica su corte y su fuente para que sea verificable.
   ========================================================================= */

// ---- Corte del informe epidemiológico más reciente utilizado ----
const CORTE = {
    semana: 33,
    periodo: '16 al 22 de agosto de 2026',
    publicado: '2026-09-11',
    fuente: 'MINSA · Informe epidemiológico semanal',
    fuenteUrl: 'https://www.minsa.gob.pa/informacion-salud/dengue-2026'
};

// ---- Indicadores nacionales acumulados en 2026 (corte semana 33) ----
const indicadores = [
    {
        id: 'dengue',
        nombre: 'Dengue',
        valor: 7086,
        unidad: 'casos acumulados en 2026',
        detalle: '6,172 sin signos de alarma · 874 con signos de alarma · 40 graves',
        tendencia: 'baja',
        tendenciaTexto: '−36.8 % frente al mismo periodo de 2025',
        enlace: 'https://www.tvn-2.com/nacionales/influenza-deja-63-muertes-panama-fallecidos-vacunas_1_2260460.html'
    },
    {
        id: 'malaria',
        nombre: 'Malaria',
        valor: 5186,
        unidad: 'casos acumulados en 2026',
        detalle: 'Transmitida por la picadura del mosquito Anopheles',
        tendencia: 'sube',
        tendenciaTexto: 'Transmisión activa, sobre todo en áreas de difícil acceso',
        enlace: 'https://www.infobae.com/panama/2026/08/19/malaria-y-leishmaniasis-acumulan-mas-de-6400-casos-en-panama-durante-2026/'
    },
    {
        id: 'influenza',
        nombre: 'Influenza',
        valor: 63,
        unidad: 'defunciones en 2026',
        detalle: '98.4 % de los fallecidos no estaba vacunado · 61.9 % tenía 65 años o más',
        tendencia: 'sube',
        tendenciaTexto: '2 defunciones nuevas en la semana 33',
        enlace: 'https://www.tvn-2.com/nacionales/influenza-deja-63-muertes-panama-fallecidos-vacunas_1_2260460.html'
    },
    {
        id: 'gripal',
        nombre: 'Síndrome gripal',
        valor: 28441,
        unidad: 'casos acumulados en 2026',
        detalle: '741 casos en la semana 33, frente a 1,236 en la misma semana de 2025',
        tendencia: 'baja',
        tendenciaTexto: 'Menos casos semanales que en 2025',
        enlace: 'https://www.tvn-2.com/nacionales/influenza-deja-63-muertes-panama-fallecidos-vacunas_1_2260460.html'
    },
    {
        id: 'leishmaniasis',
        nombre: 'Leishmaniasis',
        valor: 1762,
        unidad: 'casos acumulados en 2026',
        detalle: 'La forma cutánea es la más frecuente; la visceral puede ser mortal',
        tendencia: 'sube',
        tendenciaTexto: '43 casos nuevos reportados en la semana 29',
        enlace: 'https://www.infobae.com/panama/2026/08/19/malaria-y-leishmaniasis-acumulan-mas-de-6400-casos-en-panama-durante-2026/'
    },
    {
        id: 'irag',
        nombre: 'IRAG',
        valor: 13379,
        unidad: 'infecciones respiratorias agudas graves',
        detalle: '482 casos notificados en la semana 33',
        tendencia: 'estable',
        tendenciaTexto: 'Vigilancia permanente en hospitales centinela',
        enlace: 'https://www.tvn-2.com/nacionales/influenza-deja-63-muertes-panama-fallecidos-vacunas_1_2260460.html'
    }
];

// ---- Dengue por región de salud, corte semana 20 de 2026 ----
// Es el último desglose regional publicado con comparativo frente a 2025.
const dengueRegional = {
    corte: 'Semana epidemiológica 20 de 2026, comparada con el mismo periodo de 2025',
    publicado: '2026-06-11',
    fuente: 'MINSA',
    fuenteUrl: 'https://www.minsa.gob.pa/noticia/panama-reduce-en-488-los-casos-de-dengue-en-2026-tras-fortalecer-la-vigilancia',
    nacional: { casos2026: 2720, casos2025: 5311, hospitalizados: 341, defunciones: 8, tasa: 57.6 },
    regiones: [
        { region: 'Metropolitana', casos2026: 684, casos2025: 1059 },
        { region: 'Colón', casos2026: 493, casos2025: null },
        { region: 'Panamá Oeste', casos2026: 259, casos2025: 570 },
        { region: 'San Miguelito', casos2026: 238, casos2025: 1249 },
        { region: 'Panamá Norte', casos2026: 126, casos2025: 608 },
        { region: 'Otras regiones de salud', casos2026: 920, casos2025: null }
    ]
};

// ---- Defunciones por dengue según región, corte semana 28 de 2026 ----
const dengueDefunciones = {
    corte: 'Semana epidemiológica 28 de 2026, del 12 al 18 de julio',
    total: 14,
    casos: 4936,
    hospitalizaciones: 577,
    tasa: 106.8,
    fuente: 'MINSA',
    fuenteUrl: 'https://www.ecotvpanama.com/nacionales/panama-acumula-4936-casos-dengue-y-14-defunciones-lo-que-va-2026-n6087658',
    regiones: [
        { region: 'Bocas del Toro', defunciones: 3 },
        { region: 'Los Santos', defunciones: 3 },
        { region: 'Metropolitana', defunciones: 2 },
        { region: 'Chiriquí', defunciones: 2 },
        { region: 'Coclé', defunciones: 1 },
        { region: 'Colón', defunciones: 1 },
        { region: 'Panamá Norte', defunciones: 1 },
        { region: 'Veraguas', defunciones: 1 }
    ]
};

// ---- Noticias reales, con enlace a la publicación original ----
const noticias = [
    {
        id: 1,
        titulo: 'Influenza deja 63 muertes en Panamá y el 98.4 % de los fallecidos no estaba vacunado',
        resumen: 'El informe de la semana epidemiológica 33 suma dos defunciones nuevas por influenza. El 61.9 % de los fallecidos tenía 65 años o más y el 57.1 % eran hombres. El síndrome gripal acumula 28,441 casos en el año.',
        categoria: 'Vigilancia',
        medio: 'TVN Noticias',
        fecha: '2026-09-11',
        imagen: 'assets/img/influenza-vacuna.jpg',
        credito: 'Foto: U.S. Navy · dominio público',
        enlace: 'https://www.tvn-2.com/nacionales/influenza-deja-63-muertes-panama-fallecidos-vacunas_1_2260460.html'
    },
    {
        id: 2,
        titulo: 'Panamá reduce en 48.8 % los casos de dengue tras reforzar la vigilancia y el control del vector',
        resumen: 'A la semana 20 de 2026 el país registraba 2,720 casos frente a 5,311 en el mismo periodo de 2025. Las hospitalizaciones bajaron de 460 a 341 y la tasa de incidencia nacional cayó de 116.2 a 57.6 por cada 100 mil habitantes.',
        categoria: 'Dengue',
        medio: 'Ministerio de Salud',
        fecha: '2026-06-11',
        imagen: 'assets/img/dengue-aedes.jpg',
        credito: 'Foto: Wee Hong · CC BY-SA 4.0',
        enlace: 'https://www.minsa.gob.pa/noticia/panama-reduce-en-488-los-casos-de-dengue-en-2026-tras-fortalecer-la-vigilancia'
    },
    {
        id: 3,
        titulo: 'Malaria y leishmaniasis acumulan más de 6,400 casos en Panamá durante 2026',
        resumen: 'El MINSA reportó 4,887 casos de malaria y 1,606 de leishmaniasis al corte de la semana 29. La malaria mantiene transmisión activa y la leishmaniasis sumó 43 casos nuevos en una sola semana.',
        categoria: 'Vectoriales',
        medio: 'Infobae Panamá',
        fecha: '2026-08-19',
        imagen: 'assets/img/malaria-microscopio.jpg',
        credito: "Foto: President's Malaria Initiative · dominio público",
        enlace: 'https://www.infobae.com/panama/2026/08/19/malaria-y-leishmaniasis-acumulan-mas-de-6400-casos-en-panama-durante-2026/'
    },
    {
        id: 4,
        titulo: 'Las hospitalizaciones por dengue bajan 32 % en lo que va del 2026',
        resumen: 'Con corte a la semana 12, el país registraba 214 pacientes hospitalizados frente a 314 en el mismo periodo de 2025. La Región Metropolitana concentraba la mayor carga con 456 casos y la tasa nacional era de 38.0 por 100 mil habitantes.',
        categoria: 'Dengue',
        medio: 'Ministerio de Salud',
        fecha: '2026-04-15',
        imagen: 'assets/img/hospital-nacional.jpg',
        credito: 'Foto: Virpana · CC0',
        enlace: 'https://minsa.gob.pa/noticia/en-un-32-disminuyen-hospitalizaciones-por-dengue-en-lo-que-va-del-2026'
    },
    {
        id: 5,
        titulo: 'Panamá acumula 4,936 casos de dengue y 14 defunciones en lo que va de 2026',
        resumen: 'Al cierre de la semana 28 se contabilizaban 577 hospitalizaciones y una tasa de incidencia de 106.8 por 100 mil habitantes. Bocas del Toro y Los Santos reportaban tres defunciones cada uno.',
        categoria: 'Dengue',
        medio: 'ECO TV Panamá',
        fecha: '2026-07-22',
        imagen: 'assets/img/jornada-minsa.jpg',
        credito: 'Foto: U.S. Air Force · dominio público',
        enlace: 'https://www.ecotvpanama.com/nacionales/panama-acumula-4936-casos-dengue-y-14-defunciones-lo-que-va-2026-n6087658'
    },
    {
        id: 6,
        titulo: 'Influenza, dengue y leishmaniasis presionan el sistema de salud panameño',
        resumen: 'El seguimiento semanal del MINSA muestra tres frentes abiertos a la vez. El Instituto Conmemorativo Gorgas confirmó la subclada K del virus A(H3N2), lo que llevó a reforzar la búsqueda activa de casos y la toma de muestras.',
        categoria: 'Vigilancia',
        medio: 'Infobae Panamá',
        fecha: '2026-05-15',
        imagen: 'assets/img/laboratorio-salud.jpg',
        credito: 'Foto: USAID · dominio público',
        enlace: 'https://www.infobae.com/panama/2026/05/15/influenza-dengue-y-leishmaniasis-presionan-el-sistema-de-salud-en-panama/'
    },
    {
        id: 7,
        titulo: 'Panamá arranca 2026 con 675 casos de malaria y transmisión activa',
        resumen: 'Las primeras semanas del año ya mostraban focos de transmisión en comunidades de difícil acceso, donde el diagnóstico oportuno y el tratamiento completo son el principal reto operativo.',
        categoria: 'Vectoriales',
        medio: 'Infobae Panamá',
        fecha: '2026-02-16',
        imagen: 'assets/img/darien-comunidad.jpg',
        credito: 'Foto: Francesco Veronesi · CC BY-SA 2.0',
        enlace: 'https://www.infobae.com/panama/2026/02/16/panama-arranca-2026-con-675-casos-de-malaria-y-transmision-activa/'
    },
    {
        id: 8,
        titulo: 'La vacuna contra la influenza 2026 ya se aplica en todo el país',
        resumen: 'La vacunación arrancó el 8 de abril de 2026. Esta temporada circulan principalmente A(H1N1), A(H3N2) y el linaje B/Victoria, las tres cepas incluidas en la vacuna disponible en Panamá.',
        categoria: 'Prevención',
        medio: 'Telemetro',
        fecha: '2026-04-08',
        imagen: 'assets/img/leishmaniasis-flebotomo.jpg',
        credito: 'Foto: CDC / Frank Collins · dominio público',
        enlace: 'https://www.telemetro.com/nacionales/minsa-inicia-vacuna-contra-la-influenza-2026-panama-donde-aplicarse-n6075204'
    }
];

// ---- Recursos oficiales, todos con enlace o teléfono real ----
const recursos = [
    {
        icono: '☎️',
        titulo: 'Línea 169 del MINSA',
        descripcion: 'Centro de llamadas del Ministerio de Salud. Atiende 24 horas los 7 días de la semana para orientación en salud.',
        accion: 'Llamar al 169',
        enlace: 'tel:169'
    },
    {
        icono: '🚑',
        titulo: 'Emergencias SUME 911',
        descripcion: 'Sistema Único de Manejo de Emergencias. Para toda urgencia prehospitalaria se marca el 911.',
        accion: 'Llamar al 911',
        enlace: 'tel:911'
    },
    {
        icono: '🦟',
        titulo: 'Dengue 2026 · MINSA',
        descripcion: 'Página oficial con los informes epidemiológicos semanales de dengue y el material de prevención.',
        accion: 'Abrir el sitio del MINSA',
        enlace: 'https://www.minsa.gob.pa/informacion-salud/dengue-2026'
    },
    {
        icono: '🔬',
        titulo: 'Instituto Conmemorativo Gorgas',
        descripcion: 'Laboratorio nacional de referencia. Publica la vigilancia genómica de los virus que circulan en el país.',
        accion: 'Abrir el sitio del ICGES',
        enlace: 'https://www.gorgas.gob.pa/'
    },
    {
        icono: '🌎',
        titulo: 'OPS/OMS Panamá',
        descripcion: 'Organización Panamericana de la Salud, oficina de país: datos regionales, alertas y guías técnicas.',
        accion: 'Abrir el sitio de la OPS',
        enlace: 'https://www.paho.org/es/panama'
    },
    {
        icono: '🏥',
        titulo: 'Directorio institucional del MINSA',
        descripcion: 'Contactos de las regiones de salud, hospitales y centros de atención en todo el país.',
        accion: 'Ver el directorio',
        enlace: 'https://www.minsa.gob.pa/directorio-institucional'
    }
];

// ---- Foro: contenido de demostración de la comunidad de práctica ----
// No son mensajes reales. Se muestran con la etiqueta "demostración" en la
// interfaz para no confundirlos con los datos oficiales de arriba.
const temasForo = [
    { id: 1, titulo: 'Cómo organizamos el operativo de eliminación de criaderos en el barrio', autor: 'Promotora de salud', fecha: '2026-09-15', respuestas: 8, vistas: 234 },
    { id: 2, titulo: 'Qué hacer cuando un paciente con dengue presenta signos de alarma', autor: 'Enfermero de urgencias', fecha: '2026-09-12', respuestas: 15, vistas: 456 },
    { id: 3, titulo: 'Estrategias que funcionaron para vacunar a adultos mayores contra la influenza', autor: 'Equipo de vacunación', fecha: '2026-09-09', respuestas: 12, vistas: 389 },
    { id: 4, titulo: 'Diagnóstico de malaria en comunidades de difícil acceso: nuestra experiencia', autor: 'Técnica de laboratorio', fecha: '2026-09-04', respuestas: 6, vistas: 178 },
    { id: 5, titulo: 'Cómo explicamos la leishmaniasis cutánea sin alarmar a la familia', autor: 'Médico general', fecha: '2026-08-30', respuestas: 9, vistas: 298 },
    { id: 6, titulo: 'Errores comunes al llenar la ficha epidemiológica del caso', autor: 'Estadístico de región', fecha: '2026-08-26', respuestas: 18, vistas: 567 }
];
