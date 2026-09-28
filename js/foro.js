/* =========================================================================
   Salud Digital - Foro de la comunidad (RF-11, RF-13, RF-14)
   ========================================================================= */

(function () {
    'use strict';

    var SD = window.SD;
    var NOMBRES_TEMAS = temasCatalogo.map(function (t) { return t.nombre; });

    function visibles() {
        var texto = SD.$('#foroBuscar').value.trim().toLowerCase();
        var tema = SD.$('#foroTema').value;
        var orden = SD.$('#foroOrden').value;

        var lista = SD.temasDelForo().filter(function (t) {
            if (tema && t.categoria !== tema) return false;
            if (!texto) return true;
            return (t.titulo + ' ' + t.resumen + ' ' + t.autor + ' ' + t.categoria)
                .toLowerCase().indexOf(texto) !== -1;
        });

        return lista.sort(function (a, b) {
            if (orden === 'respuestas') return b.respuestas - a.respuestas;
            if (orden === 'util') return b.util - a.util;
            return a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0;
        });
    }

    function pintarLista() {
        var lista = visibles();
        SD.$('#foroLista').innerHTML = lista.map(SD.itemForo).join('');
        SD.$('#foroVacio').hidden = lista.length > 0;
    }

    function pintarFiltros() {
        var sel = SD.$('#foroTema');
        sel.innerHTML = SD.opciones(NOMBRES_TEMAS, 'Todos los temas');
        var inicial = SD.parametro('tema');
        if (inicial && NOMBRES_TEMAS.indexOf(inicial) !== -1) sel.value = inicial;

        SD.$('#foroTemasLateral').innerHTML = NOMBRES_TEMAS.map(function (n) {
            return '<li><a href="foro.html?tema=' + encodeURIComponent(n) + '">' + SD.esc(n) + '</a></li>';
        }).join('');

        var filtros = SD.$('#filtrosForo');
        filtros.addEventListener('input', pintarLista);
        filtros.addEventListener('change', pintarLista);
        filtros.addEventListener('submit', function (e) { e.preventDefault(); });
    }

    // ---------- abrir un tema nuevo ----------

    function abrirPanel(abrir) {
        var panel = SD.$('#panelNuevo');
        panel.hidden = !abrir;
        SD.$('#btnNuevoTema').setAttribute('aria-expanded', abrir);
        if (abrir) SD.$('#temaTitulo').focus();
    }

    function nuevoTema() {
        SD.$('#temaCategoria').innerHTML = SD.opciones(NOMBRES_TEMAS, 'Selecciona un tema…');

        SD.$('#btnNuevoTema').addEventListener('click', function () {
            // Publicar requiere cuenta; sin sesión se va al inicio de sesión.
            if (!SD.usuarioActivo()) {
                window.location.href = 'login.html?volver=foro.html';
                return;
            }
            abrirPanel(SD.$('#panelNuevo').hidden);
        });
        SD.$('#btnCancelarTema').addEventListener('click', function () { abrirPanel(false); });

        var form = SD.$('#formTema');
        var reglas = {
            temaTitulo: function (v) {
                v = v.trim();
                if (!v) return 'Escribe un título.';
                return v.length < 15 ? 'Usa al menos 15 caracteres para que se entienda el tema.' : '';
            },
            temaCategoria: function (v) { return v ? '' : 'Elige el tema al que pertenece.'; },
            temaContenido: function (v) {
                return v.trim().length < 40 ? 'Cuenta un poco más: al menos 40 caracteres.' : '';
            }
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!SD.validar(form, reglas)) return;

            var texto = SD.$('#temaContenido').value.trim();
            var parrafos = texto.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean);
            var usuario = SD.usuarioActivo();

            SD.publicarTema({
                id: 'p' + Date.now(),
                categoria: SD.$('#temaCategoria').value,
                titulo: SD.$('#temaTitulo').value.trim(),
                autor: usuario.nombre,
                fecha: SD.hoyIso(),
                respuestas: 0, vistas: 0, util: 0,
                resumen: texto.length > 150 ? texto.slice(0, 147) + '…' : texto,
                contenido: parrafos,
                propio: true
            });

            SD.limpiarFormulario(form);
            SD.avisar(SD.$('#temaAviso'), 'ok', 'Tu tema se publicó y ya aparece primero en la lista.');
            SD.$('#foroOrden').value = 'recientes';
            pintarLista();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        pintarFiltros();
        pintarLista();
        nuevoTema();
    });
})();
