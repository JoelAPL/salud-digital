// ===== INICIALIZACIÓN DEL DOCUMENTO =====
document.addEventListener('DOMContentLoaded', () => {
    cargarNoticias();
    cargarEstadisticas();
    cargarTemasForo();
    actualizarEstadisticasGlobales();
});

// ===== CARGAR Y MOSTRAR NOTICIAS =====
function cargarNoticias() {
    const contenedor = document.getElementById('noticiasDestacadas');
    contenedor.innerHTML = '';

    // Mostrar solo las primeras 6 noticias destacadas
    noticias.slice(0, 6).forEach(noticia => {
        const noticiaHTML = `
            <div class="noticia-card" onclick="abrirDetalle(${noticia.id})">
                <img src="${noticia.imagen}" alt="${noticia.titulo}">
                <div class="noticia-card-content">
                    <span class="noticia-card-category">${noticia.categoria}</span>
                    <h3>${noticia.titulo}</h3>
                    <p>${noticia.contenido.substring(0, 100)}...</p>
                    <div class="noticia-meta">
                        <span>👤 ${noticia.autor}</span>
                        <span>📅 ${formatearFecha(noticia.fecha)}</span>
                        <span>💬 ${noticia.comentarios} comentarios</span>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += noticiaHTML;
    });
}

// ===== CARGAR Y MOSTRAR ESTADÍSTICAS =====
function cargarEstadisticas() {
    filtrarEstadisticas();
}

function filtrarEstadisticas() {
    const provincia = document.getElementById('provinciaSelect').value || 'panama';
    const periodo = document.getElementById('periodoSelect').value;

    const datos = estadisticas[provincia] || estadisticas['panama'];

    // Actualizar tabla
    const tbody = document.getElementById('estadisticasBody');
    tbody.innerHTML = '';

    datos.forEach(dato => {
        const fila = `
            <tr>
                <td><strong>${dato.enfermedad}</strong></td>
                <td>${dato.casos}</td>
                <td>${dato.muertes}</td>
                <td>${dato.recuperados}</td>
                <td>${formatearFecha(dato.actualizacion)}</td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });

    // Actualizar tarjetas de estadísticas principales
    if (datos.length >= 4) {
        document.getElementById('dengueCount').textContent = datos[0].casos.toLocaleString();
        document.getElementById('covidCount').textContent = datos[1].casos.toLocaleString();
        document.getElementById('influenzaCount').textContent = datos[2].casos.toLocaleString();
        document.getElementById('tbCount').textContent = datos[3].casos.toLocaleString();
    }
}

// ===== CARGAR Y MOSTRAR TEMAS DEL FORO =====
function cargarTemasForo() {
    const contenedor = document.getElementById('temasDestacados');
    contenedor.innerHTML = '';

    // Mostrar solo los 4 temas más populares
    temasForo.slice(0, 4).forEach(tema => {
        const temaHTML = `
            <div class="tema-card" onclick="abrirTema(${tema.id})">
                <h4>💬 ${tema.titulo}</h4>
                <p>${tema.autor}</p>
                <div class="tema-meta">
                    <span>📅 ${formatearFecha(tema.fecha)}</span>
                    <span>💭 ${tema.respuestas} respuestas</span>
                    <span>👁️ ${tema.views} vistas</span>
                </div>
            </div>
        `;
        contenedor.innerHTML += temaHTML;
    });
}

// ===== ACTUALIZAR ESTADÍSTICAS GLOBALES =====
function actualizarEstadisticasGlobales() {
    const totales = obtenerEstadisticasGlobales();
    // Los datos se muestran en las tarjetas principales
}

// ===== FUNCIÓN DE BÚSQUEDA =====
function buscar() {
    const termino = document.getElementById('searchInput').value.toLowerCase();

    if (termino.trim() === '') {
        alert('Por favor ingresa un término de búsqueda');
        return;
    }

    // Buscar en noticias
    const noticiasEncontradas = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(termino) ||
        noticia.contenido.toLowerCase().includes(termino) ||
        noticia.categoria.toLowerCase().includes(termino)
    );

    // Buscar en temas del foro
    const temasEncontrados = temasForo.filter(tema =>
        tema.titulo.toLowerCase().includes(termino)
    );

    // Mostrar resultados
    mostrarResultadosBusqueda(noticiasEncontradas, temasEncontrados, termino);
}

function mostrarResultadosBusqueda(noticias, temas, termino) {
    const contenedor = document.getElementById('noticiasDestacadas');

    let resultadosHTML = `<h3>Resultados de búsqueda para: "${termino}"</h3>`;

    if (noticias.length > 0) {
        resultadosHTML += `<h4>📰 Noticias (${noticias.length})</h4>`;
        noticias.forEach(noticia => {
            resultadosHTML += `
                <div class="noticia-card" onclick="abrirDetalle(${noticia.id})">
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                    <div class="noticia-card-content">
                        <span class="noticia-card-category">${noticia.categoria}</span>
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.contenido.substring(0, 100)}...</p>
                        <div class="noticia-meta">
                            <span>👤 ${noticia.autor}</span>
                            <span>📅 ${formatearFecha(noticia.fecha)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    if (temas.length > 0) {
        resultadosHTML += `<h4>💬 Temas del Foro (${temas.length})</h4>`;
        temas.forEach(tema => {
            resultadosHTML += `
                <div class="tema-card" onclick="abrirTema(${tema.id})" style="margin-bottom: 10px;">
                    <h4>${tema.titulo}</h4>
                    <p>${tema.autor} - ${formatearFecha(tema.fecha)}</p>
                </div>
            `;
        });
    }

    if (noticias.length === 0 && temas.length === 0) {
        resultadosHTML += '<p style="color: #666;">No se encontraron resultados para tu búsqueda.</p>';
    }

    contenedor.innerHTML = resultadosHTML;

    // Scroll hacia resultados
    contenedor.scrollIntoView({ behavior: 'smooth' });
}

// ===== FUNCIONES DE DETALLE =====
function abrirDetalle(id) {
    const noticia = noticias.find(n => n.id === id);
    if (noticia) {
        mostrarModalNoticia(noticia);
    }
}

function mostrarModalNoticia(noticia) {
    const modal = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;">
            <div style="background: white; border-radius: 10px; max-width: 700px; max-height: 80vh; overflow-y: auto; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                <button onclick="this.parentElement.parentElement.remove()" style="float: right; font-size: 24px; background: none; border: none; cursor: pointer;">×</button>

                <img src="${noticia.imagen}" alt="${noticia.titulo}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">

                <span style="display: inline-block; background: #0066cc; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 15px;">${noticia.categoria}</span>

                <h2 style="margin: 15px 0; color: #333;">${noticia.titulo}</h2>

                <div style="font-size: 14px; color: #666; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <p>👤 Autor: <strong>${noticia.autor}</strong></p>
                    <p>📅 Fecha: <strong>${formatearFecha(noticia.fecha)}</strong></p>
                    <p>💬 Comentarios: <strong>${noticia.comentarios}</strong></p>
                </div>

                <p style="line-height: 1.8; color: #333; font-size: 16px; margin-bottom: 20px;">${noticia.contenido}</p>

                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h4>Comentarios (${noticia.comentarios})</h4>
                    <p style="color: #666;">Los comentarios se mostrarán aquí</p>
                </div>
            </div>
        </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modal;
    document.body.appendChild(div);
}

function abrirTema(id) {
    const tema = temasForo.find(t => t.id === id);
    if (tema) {
        alert(`Tema: ${tema.titulo}\n\nAutor: ${tema.autor}\nRespuestas: ${tema.respuestas}\nVistas: ${tema.views}`);
    }
}

// ===== UTILIDADES =====
function formatearFecha(fecha) {
    const date = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', opciones);
}

// ===== MANEJO DE EVENTOS DEL NAVEGADOR =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ===== PERMITE PRESIONAR ENTER EN BÚSQUEDA =====
document.addEventListener('keypress', (e) => {
    const searchInput = document.getElementById('searchInput');
    if (e.target === searchInput && e.key === 'Enter') {
        buscar();
    }
});

// ===== MEJORAS DE ACCESIBILIDAD =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Esta sección será habilitada pronto');
    });
});

console.log('✓ Página de Salud Digital cargada correctamente');
console.log('✓ Total de noticias:', noticias.length);
console.log('✓ Total de temas del foro:', temasForo.length);
console.log('✓ Provincias con datos:', Object.keys(estadisticas).length);
