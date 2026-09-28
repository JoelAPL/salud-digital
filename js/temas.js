/* =========================================================================
   Salud Digital - Catálogo de temas
   ========================================================================= */

(function () {
    'use strict';

    var SD = window.SD;

    function contarNoticias(tema) {
        return noticias.filter(function (n) {
            var texto = (n.titulo + ' ' + n.resumen).toLowerCase();
            return tema.claves.some(function (c) { return texto.indexOf(c) !== -1; });
        }).length;
    }

    function contarPor(lista, campo, valor) {
        return lista.filter(function (x) { return x[campo] === valor; }).length;
    }

    function tarjeta(t) {
        return '<a class="tema-card" href="foro.html?tema=' + encodeURIComponent(t.nombre) + '">' +
            '<span class="tema-icono" aria-hidden="true">' + t.icono + '</span>' +
            '<h2>' + SD.esc(t.nombre) + '</h2>' +
            '<p>' + SD.esc(t.descripcion) + '</p>' +
            '<p class="tema-cifras">' +
                '<span><strong>' + contarNoticias(t) + '</strong> noticias</span>' +
                '<span><strong>' + contarPor(temasForo, 'categoria', t.nombre) + '</strong> temas</span>' +
                '<span><strong>' + contarPor(materialComunidad, 'tema', t.nombre) + '</strong> recursos</span>' +
                '<span class="tema-ir" aria-hidden="true">Ver →</span>' +
            '</p>' +
        '</a>';
    }

    document.addEventListener('DOMContentLoaded', function () {
        SD.$('#temasCatalogo').innerHTML = temasCatalogo.map(tarjeta).join('');
    });
})();
