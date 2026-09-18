// ===== DATOS DE NOTICIAS =====
const noticias = [
    {
        id: 1,
        titulo: "Minsa reporta nuevos casos de dengue en Panamá Oeste",
        contenido: "El Ministerio de Salud reportó 47 nuevos casos de dengue confirmados en los últimos 7 días, principalmente en las comunidades de Arraiján y Capira. Se insta a la ciudadanía a reforzar medidas preventivas.",
        categoria: "Brotes",
        autor: "Dr. Luis Martínez",
        fecha: "2026-09-17",
        comentarios: 12,
        imagen: "https://via.placeholder.com/300x200?text=Dengue+Alert"
    },
    {
        id: 2,
        titulo: "Campaña de vacunación contra influenza comienza en octubre",
        contenido: "El Ministerio de Salud anuncia el inicio de la campaña de vacunación contra la influenza estacional en octubre. Prioridad para adultos mayores, niños y personal de salud.",
        categoria: "Prevención",
        autor: "Dra. María González",
        fecha: "2026-09-16",
        comentarios: 8,
        imagen: "https://via.placeholder.com/300x200?text=Vacunacion"
    },
    {
        id: 3,
        titulo: "Estudio revela importancia de la actividad física en la prevención de enfermedades crónicas",
        contenido: "Investigadores del Instituto de Investigación Médica descubrieron que 30 minutos diarios de ejercicio moderado reduce en un 40% el riesgo de desarrollar enfermedades cardiovasculares.",
        categoria: "Investigación",
        autor: "Dra. Sofía Ruiz",
        fecha: "2026-09-15",
        comentarios: 24,
        imagen: "https://via.placeholder.com/300x200?text=Ejercicio+Salud"
    },
    {
        id: 4,
        titulo: "Nuevos protocolos de atención en emergencias implementados en hospitales",
        contenido: "Los principales hospitales de Panamá implementan nuevos protocolos de atención para mejorar los tiempos de respuesta en emergencias. Se espera reducir tiempos de atención en un 25%.",
        categoria: "Institucional",
        autor: "Dr. Carlos Ponce",
        fecha: "2026-09-14",
        comentarios: 15,
        imagen: "https://via.placeholder.com/300x200?text=Hospital"
    },
    {
        id: 5,
        titulo: "Salud mental: iniciativa comunitaria ofrece apoyo gratuito",
        contenido: "Una nueva iniciativa comunitaria ofrece asesoría psicológica gratuita para personas en situación de estrés y ansiedad. Se han reportado más de 500 consultas en el primer mes.",
        categoria: "Bienestar",
        autor: "Psic. Andrea López",
        fecha: "2026-09-13",
        comentarios: 19,
        imagen: "https://via.placeholder.com/300x200?text=Salud+Mental"
    },
    {
        id: 6,
        titulo: "Alertan sobre proliferación de mosquitos en el verano panameño",
        contenido: "Autoridades sanitarias advierten sobre el aumento en la población de mosquitos transmisores de dengue y malaria durante la estación lluviosa. Se recomiendan medidas preventivas inmediatas.",
        categoria: "Brotes",
        autor: "Ing. Roberto Silva",
        fecha: "2026-09-12",
        comentarios: 31,
        imagen: "https://via.placeholder.com/300x200?text=Mosquitos"
    }
];

// ===== DATOS DE ESTADÍSTICAS POR PROVINCIA =====
const estadisticas = {
    panama: [
        { enfermedad: "Dengue", casos: 342, muertes: 2, recuperados: 289, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 115, muertes: 1, recuperados: 98, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 56, muertes: 0, recuperados: 45, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 23, muertes: 1, recuperados: 18, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 8, muertes: 0, recuperados: 6, actualizacion: "2026-09-16" }
    ],
    colon: [
        { enfermedad: "Dengue", casos: 198, muertes: 1, recuperados: 167, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 67, muertes: 0, recuperados: 58, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 34, muertes: 0, recuperados: 28, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 12, muertes: 0, recuperados: 9, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 3, muertes: 0, recuperados: 2, actualizacion: "2026-09-16" }
    ],
    chiriqui: [
        { enfermedad: "Dengue", casos: 267, muertes: 1, recuperados: 224, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 89, muertes: 1, recuperados: 76, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 42, muertes: 0, recuperados: 35, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 18, muertes: 0, recuperados: 14, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 5, muertes: 0, recuperados: 4, actualizacion: "2026-09-16" }
    ],
    bocas: [
        { enfermedad: "Dengue", casos: 145, muertes: 0, recuperados: 123, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 45, muertes: 0, recuperados: 40, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 22, muertes: 0, recuperados: 18, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 7, muertes: 0, recuperados: 5, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 12, muertes: 1, recuperados: 9, actualizacion: "2026-09-16" }
    ],
    veraguas: [
        { enfermedad: "Dengue", casos: 178, muertes: 0, recuperados: 152, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 56, muertes: 0, recuperados: 48, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 28, muertes: 0, recuperados: 23, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 9, muertes: 0, recuperados: 7, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 2, muertes: 0, recuperados: 1, actualizacion: "2026-09-16" }
    ],
    darién: [
        { enfermedad: "Dengue", casos: 89, muertes: 0, recuperados: 76, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 23, muertes: 0, recuperados: 20, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 12, muertes: 0, recuperados: 10, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 5, muertes: 0, recuperados: 4, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 34, muertes: 2, recuperados: 28, actualizacion: "2026-09-16" }
    ],
    herrera: [
        { enfermedad: "Dengue", casos: 134, muertes: 1, recuperados: 114, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 38, muertes: 0, recuperados: 32, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 19, muertes: 0, recuperados: 16, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 6, muertes: 0, recuperados: 5, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 1, muertes: 0, recuperados: 1, actualizacion: "2026-09-16" }
    ],
    lossantos: [
        { enfermedad: "Dengue", casos: 92, muertes: 0, recuperados: 78, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 28, muertes: 0, recuperados: 24, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 14, muertes: 0, recuperados: 12, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 4, muertes: 0, recuperados: 3, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 0, muertes: 0, recuperados: 0, actualizacion: "2026-09-16" }
    ],
    emberá: [
        { enfermedad: "Dengue", casos: 45, muertes: 0, recuperados: 38, actualizacion: "2026-09-17" },
        { enfermedad: "COVID-19", casos: 12, muertes: 0, recuperados: 10, actualizacion: "2026-09-17" },
        { enfermedad: "Influenza", casos: 6, muertes: 0, recuperados: 5, actualizacion: "2026-09-17" },
        { enfermedad: "Tuberculosis", casos: 2, muertes: 0, recuperados: 1, actualizacion: "2026-09-15" },
        { enfermedad: "Malaria", casos: 18, muertes: 0, recuperados: 15, actualizacion: "2026-09-16" }
    ]
};

// ===== DATOS DE TEMAS DEL FORO =====
const temasForo = [
    {
        id: 1,
        titulo: "¿Cómo prevenir el dengue en la estación lluviosa?",
        autor: "Carlos Mendez",
        fecha: "2026-09-16",
        respuestas: 8,
        views: 234
    },
    {
        id: 2,
        titulo: "Mi experiencia recuperándome del COVID-19",
        autor: "María Pérez",
        fecha: "2026-09-15",
        respuestas: 15,
        views: 456
    },
    {
        id: 3,
        titulo: "Recomendaciones para una mejor salud cardiovascular",
        autor: "Dr. Juan López",
        fecha: "2026-09-14",
        respuestas: 12,
        views: 389
    },
    {
        id: 4,
        titulo: "¿Cuáles son los síntomas iniciales de la tuberculosis?",
        autor: "Rosa González",
        fecha: "2026-09-13",
        respuestas: 6,
        views: 178
    },
    {
        id: 5,
        titulo: "Centro de salud recomendado en Colón",
        autor: "José Valdés",
        fecha: "2026-09-12",
        respuestas: 9,
        views: 298
    },
    {
        id: 6,
        titulo: "Importancia de la actividad física regular",
        autor: "Patricia Ruiz",
        fecha: "2026-09-11",
        respuestas: 18,
        views: 567
    }
];

// ===== FUNCIÓN PARA OBTENER DATOS GLOBALES =====
function obtenerEstadisticasGlobales() {
    let totales = {
        dengue: 0,
        covid: 0,
        influenza: 0,
        tb: 0
    };

    for (let provincia in estadisticas) {
        estadisticas[provincia].forEach(dato => {
            if (dato.enfermedad === "Dengue") totales.dengue += dato.casos;
            else if (dato.enfermedad === "COVID-19") totales.covid += dato.casos;
            else if (dato.enfermedad === "Influenza") totales.influenza += dato.casos;
            else if (dato.enfermedad === "Tuberculosis") totales.tb += dato.casos;
        });
    }

    return totales;
}
