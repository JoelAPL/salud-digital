/* =========================================================================
   Salud Digital - Lógica de la página
   ========================================================================= */

(function () {
    'use strict';

    // ---------- utilidades ----------

    // Todo el texto que viene de los datos pasa por aquí antes de entrar al DOM.
    function esc(valor) {
        return String(valor).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function num(valor) {
        return valor.toLocaleString('es-PA');
    }

    function fecha(iso) {
        var partes = String(iso).split('-');
        var d = new Date(+partes[0], +partes[1] - 1, +partes[2]);
        return d.toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function $(sel) {
        return document.querySelector(sel);
    }

    // ---------- portada y panorama ----------

    function pintarCorte() {
        $('#heroCorte').textContent =
            'Datos oficiales del MINSA · semana epidemiológica ' + CORTE.semana;
        $('#heroActualizado').textContent =
            fecha(CORTE.publicado) + ' (semana del ' + CORTE.periodo + ')';
        $('#panoramaSub').textContent =
            'Acumulado del año al cierre de la semana epidemiológica ' + CORTE.semana +
            ', del ' + CORTE.periodo + '.';
        $('#panoramaFuente').href = CORTE.fuenteUrl;
    }

    var FLECHA = { sube: '↑', baja: '↓', estable: '→' };

    function pintarIndicadores() {
        $('#indicadoresGrid').innerHTML = indicadores.map(function (i) {
            return '' +
                '<article class="indicador">' +
                    '<h3>' + esc(i.nombre) + '</h3>' +
                    '<p class="indicador-valor">' + num(i.valor) + '</p>' +
                    '<p class="indicador-unidad">' + esc(i.unidad) + '</p>' +
                    '<p class="indicador-detalle">' + esc(i.detalle) + '</p>' +
                    '<p class="indicador-tendencia t-' + esc(i.tendencia) + '">' +
                        FLECHA[i.tendencia] + ' ' + esc(i.tendenciaTexto) +
                    '</p>' +
                    '<a class="link-fuente" href="' + esc(i.enlace) + '" target="_blank" rel="noopener">Fuente ↗</a>' +
                '</article>';
        }).join('');
    }

    // ---------- noticias ----------

    var filtroActivo = 'Todas';
    var busquedaActiva = '';

    function tarjetaNoticia(n) {
        return '' +
            '<article class="noticia" tabindex="0" role="button" data-id="' + n.id + '"' +
                    ' aria-label="Abrir: ' + esc(n.titulo) + '">' +
                '<div class="noticia-foto">' +
                    '<img src="' + esc(n.imagen) + '" alt="" loading="lazy">' +
                    '<span class="chip">' + esc(n.categoria) + '</span>' +
                '</div>' +
                '<div class="noticia-cuerpo">' +
                    '<h3>' + esc(n.titulo) + '</h3>' +
                    '<p>' + esc(n.resumen) + '</p>' +
                    '<p class="noticia-meta">' +
                        '<span>' + esc(n.medio) + '</span>' +
                        '<span>' + fecha(n.fecha) + '</span>' +
                    '</p>' +
                '</div>' +
            '</article>';
    }

    function noticiasVisibles() {
        var t = busquedaActiva.toLowerCase();
        return noticias.filter(function (n) {
            if (filtroActivo !== 'Todas' && n.categoria !== filtroActivo) return false;
            if (!t) return true;
            return (n.titulo + ' ' + n.resumen + ' ' + n.categoria + ' ' + n.medio)
                .toLowerCase().indexOf(t) !== -1;
        });
    }

    function pintarNoticias() {
        var lista = noticiasVisibles();
        $('#noticiasGrid').innerHTML = lista.map(tarjetaNoticia).join('');
        $('#noticiasVacio').hidden = lista.length > 0;
    }

    function pintarFiltros() {
        var cats = ['Todas'];
        noticias.forEach(function (n) {
            if (cats.indexOf(n.categoria) === -1) cats.push(n.categoria);
        });

        var cont = $('#filtrosCategoria');
        cont.innerHTML = cats.map(function (c) {
            var on = c === filtroActivo;
            return '<button type="button" class="filtro-chip' + (on ? ' activo' : '') + '"' +
                   ' data-cat="' + esc(c) + '" aria-pressed="' + on + '">' + esc(c) + '</button>';
        }).join('');

        cont.onclick = function (e) {
            var boton = e.target.closest('.filtro-chip');
            if (!boton) return;
            filtroActivo = boton.dataset.cat;
            pintarFiltros();
            pintarNoticias();
        };
    }

    // ---------- estadísticas ----------

    function variacion(a, b) {
        if (b === null || b === 0) return { texto: '—', clase: 'v-neutro' };
        var pct = Math.round(((a - b) / b) * 1000) / 10;
        if (pct === 0) return { texto: 'sin cambio', clase: 'v-neutro' };
        return {
            texto: (pct > 0 ? '+' : '−') + Math.abs(pct) + ' %',
            clase: pct > 0 ? 'v-sube' : 'v-baja'
        };
    }

    function pintarResumenNacional() {
        var n = dengueRegional.nacional;
        var v = variacion(n.casos2026, n.casos2025);
        var datos = [
            ['Casos 2026', num(n.casos2026)],
            ['Casos 2025', num(n.casos2025)],
            ['Variación', v.texto],
            ['Hospitalizados', num(n.hospitalizados)],
            ['Defunciones', num(n.defunciones)],
            ['Tasa por 100 mil', String(n.tasa)]
        ];
        $('#resumenNacional').innerHTML = datos.map(function (d) {
            return '<div class="dato"><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>';
        }).join('');
    }

    function filasRegionales() {
        var elegida = $('#regionSelect').value;
        var filas = dengueRegional.regiones.filter(function (r) {
            return !elegida || r.region === elegida;
        });

        $('#regionalBody').innerHTML = filas.map(function (r) {
            var v = variacion(r.casos2026, r.casos2025);
            return '<tr>' +
                '<th scope="row">' + esc(r.region) + '</th>' +
                '<td class="num">' + num(r.casos2026) + '</td>' +
                '<td class="num">' + (r.casos2025 === null ? '—' : num(r.casos2025)) + '</td>' +
                '<td class="num ' + v.clase + '">' + esc(v.texto) + '</td>' +
            '</tr>';
        }).join('');
    }

    function pintarRegional() {
        $('#regionalCorte').textContent = dengueRegional.corte + '. Publicado el ' +
            fecha(dengueRegional.publicado) + ' por el ' + dengueRegional.fuente + '.';
        $('#regionalFuente').href = dengueRegional.fuenteUrl;

        var sel = $('#regionSelect');
        sel.innerHTML = '<option value="">Todas las regiones</option>' +
            dengueRegional.regiones.map(function (r) {
                return '<option value="' + esc(r.region) + '">' + esc(r.region) + '</option>';
            }).join('');
        sel.onchange = filasRegionales;

        pintarResumenNacional();
        filasRegionales();
    }

    function pintarDefunciones() {
        var d = dengueDefunciones;
        $('#defuncionesCorte').textContent =
            d.corte + ': ' + num(d.total) + ' defunciones sobre ' + num(d.casos) +
            ' casos, ' + num(d.hospitalizaciones) + ' hospitalizaciones y una tasa de ' +
            d.tasa + ' por 100 mil habitantes.';
        $('#defuncionesFuente').href = d.fuenteUrl;

        var tope = Math.max.apply(null, d.regiones.map(function (r) { return r.defunciones; }));
        $('#defuncionesBarras').innerHTML = d.regiones.map(function (r) {
            var ancho = (r.defunciones / tope) * 100;
            return '<div class="barra-fila">' +
                '<span class="barra-etiqueta">' + esc(r.region) + '</span>' +
                '<span class="barra-pista"><span class="barra-relleno" style="width:' + ancho + '%"></span></span>' +
                '<span class="barra-valor">' + num(r.defunciones) + '</span>' +
            '</div>';
        }).join('');
    }

    // ---------- recursos y comunidad ----------

    function pintarRecursos() {
        $('#recursosGrid').innerHTML = recursos.map(function (r) {
            var esTel = r.enlace.indexOf('tel:') === 0;
            var extra = esTel ? '' : ' target="_blank" rel="noopener"';
            return '<article class="recurso">' +
                '<span class="recurso-icono" aria-hidden="true">' + r.icono + '</span>' +
                '<h3>' + esc(r.titulo) + '</h3>' +
                '<p>' + esc(r.descripcion) + '</p>' +
                '<a class="btn-secondary" href="' + esc(r.enlace) + '"' + extra + '>' +
                    esc(r.accion) + (esTel ? '' : ' ↗') +
                '</a>' +
            '</article>';
        }).join('');
    }

    function pintarTemas() {
        $('#temasGrid').innerHTML = temasForo.map(function (t) {
            return '<article class="tema">' +
                '<h3>' + esc(t.titulo) + '</h3>' +
                '<p class="tema-autor">' + esc(t.autor) + '</p>' +
                '<p class="tema-meta">' +
                    '<span>' + fecha(t.fecha) + '</span>' +
                    '<span>' + num(t.respuestas) + ' respuestas</span>' +
                    '<span>' + num(t.vistas) + ' vistas</span>' +
                '</p>' +
            '</article>';
        }).join('');
    }

    // ---------- modal ----------

    var ultimoFoco = null;

    function abrirNoticia(id) {
        var n = noticias.find(function (x) { return x.id === id; });
        if (!n) return;

        ultimoFoco = document.activeElement;
        $('#modalImagen').src = n.imagen;
        $('#modalImagen').alt = n.titulo;
        $('#modalCredito').textContent = n.credito;
        $('#modalCategoria').textContent = n.categoria;
        $('#modalTitulo').textContent = n.titulo;
        $('#modalMeta').textContent = n.medio + ' · ' + fecha(n.fecha);
        $('#modalResumen').textContent = n.resumen;
        $('#modalEnlace').href = n.enlace;

        $('#modal').hidden = false;
        document.body.classList.add('sin-scroll');
        $('.modal-cerrar').focus();
    }

    function cerrarModal() {
        $('#modal').hidden = true;
        document.body.classList.remove('sin-scroll');
        if (ultimoFoco) ultimoFoco.focus();
    }

    // ---------- arranque ----------

    document.addEventListener('DOMContentLoaded', function () {
        pintarCorte();
        pintarIndicadores();
        pintarFiltros();
        pintarNoticias();
        pintarRegional();
        pintarDefunciones();
        pintarRecursos();
        pintarTemas();

        // Buscador: filtra la rejilla de noticias sin destruirla.
        $('#searchForm').addEventListener('submit', function (e) {
            e.preventDefault();
            busquedaActiva = $('#searchInput').value.trim();
            filtroActivo = 'Todas';
            pintarFiltros();
            pintarNoticias();
            document.getElementById('noticias').scrollIntoView({ behavior: 'smooth' });
        });
        $('#searchInput').addEventListener('input', function () {
            if (this.value === '' && busquedaActiva !== '') {
                busquedaActiva = '';
                pintarNoticias();
            }
        });

        // Abrir la noticia con clic o con teclado.
        var grid = $('#noticiasGrid');
        grid.addEventListener('click', function (e) {
            var card = e.target.closest('.noticia');
            if (card) abrirNoticia(+card.dataset.id);
        });
        grid.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            var card = e.target.closest('.noticia');
            if (!card) return;
            e.preventDefault();
            abrirNoticia(+card.dataset.id);
        });

        $('#modal').addEventListener('click', function (e) {
            if (e.target.closest('[data-cerrar]')) cerrarModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !$('#modal').hidden) cerrarModal();
        });

        // Menú en pantallas pequeñas.
        var toggle = $('#navToggle');
        toggle.addEventListener('click', function () {
            var abierto = $('#menu').classList.toggle('abierto');
            toggle.setAttribute('aria-expanded', abierto);
            toggle.setAttribute('aria-label', abierto ? 'Cerrar el menú' : 'Abrir el menú');
        });
        $('#menu').addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                $('#menu').classList.remove('abierto');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Sombra del encabezado al desplazar.
        window.addEventListener('scroll', function () {
            $('#navbar').classList.toggle('con-sombra', window.scrollY > 8);
        }, { passive: true });

        // Marca en el menú la sección que se está viendo.
        var secciones = Array.prototype.slice.call(
            document.querySelectorAll('main section[id]')
        );
        var observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (en) {
                if (!en.isIntersecting) return;
                document.querySelectorAll('#menu a').forEach(function (a) {
                    a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        secciones.forEach(function (s) { observador.observe(s); });
    });
})();
