/* =========================================================================
   Salud Digital - Repositorio de recursos (RF-08, RF-09)
   ========================================================================= */

(function () {
    'use strict';

    var SD = window.SD;
    var CLAVE_PROPIOS = 'sd-recursos-propios';
    var LIMITE_BYTES = 10 * 1024 * 1024;
    var NOMBRES_TEMAS = temasCatalogo.map(function (t) { return t.nombre; });

    function todos() {
        return (SD.leer(CLAVE_PROPIOS) || []).concat(materialComunidad);
    }

    function tamanoLegible(bytes) {
        if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
        return Math.max(1, Math.round(bytes / 1024)) + ' KB';
    }

    // ---------- tabla ----------

    function visibles() {
        var texto = SD.$('#recBuscar').value.trim().toLowerCase();
        var tipo = SD.$('#recFiltroTipo').value;
        var tema = SD.$('#recFiltroTema').value;
        return todos().filter(function (r) {
            if (tipo && r.tipo !== tipo) return false;
            if (tema && r.tema !== tema) return false;
            return !texto || (r.titulo + ' ' + r.autor).toLowerCase().indexOf(texto) !== -1;
        });
    }

    function fila(r) {
        return '<tr>' +
            '<td><span class="titulo-recurso">' + SD.esc(r.titulo) + '</span>' +
                '<small>' + SD.esc(r.autor) + ' · ' + SD.fecha(r.fecha) + ' · ' + SD.esc(r.tamano) + '</small></td>' +
            '<td><span class="tipo-chip tipo-' + SD.esc(r.tipo.toLowerCase()) + '">' + SD.esc(r.tipo) + '</span></td>' +
            '<td>' + SD.esc(r.tema) + '</td>' +
            '<td class="num">' + SD.num(r.descargas) + '</td>' +
            '<td class="num"><button type="button" class="btn-accion" data-descargar="' + SD.esc(r.id) + '">' +
                (r.tipo === 'Enlace' ? 'Abrir ↗' : 'Descargar') + '</button></td>' +
        '</tr>';
    }

    function pintarTabla() {
        var lista = visibles();
        SD.$('#recursosBody').innerHTML = lista.map(fila).join('');
        SD.$('#recursosVacio').hidden = lista.length > 0;
    }

    function activarTabla() {
        SD.$('#recFiltroTema').innerHTML = SD.opciones(NOMBRES_TEMAS, 'Todos los temas');
        var filtros = SD.$('#filtrosRecursos');
        filtros.addEventListener('input', pintarTabla);
        filtros.addEventListener('change', pintarTabla);
        filtros.addEventListener('submit', function (e) { e.preventDefault(); });

        var aviso = document.createElement('p');
        aviso.className = 'aviso';
        aviso.setAttribute('role', 'status');
        aviso.hidden = true;
        aviso.style.marginTop = '14px';
        SD.$('.tabla-wrap').after(aviso);

        SD.$('#recursosBody').addEventListener('click', function (e) {
            if (!e.target.closest('[data-descargar]')) return;
            SD.avisar(aviso, 'info', 'El material de esta tabla es de demostración: la descarga se habilitará cuando el repositorio tenga servidor.');
        });
    }

    // ---------- compartir un recurso ----------

    function alternarCampos() {
        var esEnlace = SD.$('#recTipo').value === 'Enlace';
        SD.$('#campoEnlace').hidden = !esEnlace;
        SD.$('#campoArchivo').hidden = esEnlace;
    }

    function abrirPanel(abrir) {
        SD.$('#panelCompartir').hidden = !abrir;
        SD.$('#btnCompartir').setAttribute('aria-expanded', abrir);
        if (abrir) SD.$('#recTitulo').focus();
    }

    function compartir() {
        SD.$('#recTema').innerHTML = SD.opciones(NOMBRES_TEMAS, 'Selecciona…');
        SD.$('#recTipo').addEventListener('change', alternarCampos);

        SD.$('#btnCompartir').addEventListener('click', function () {
            if (!SD.usuarioActivo()) {
                window.location.href = 'login.html?volver=recursos.html';
                return;
            }
            abrirPanel(SD.$('#panelCompartir').hidden);
        });
        SD.$('#btnCancelarRecurso').addEventListener('click', function () { abrirPanel(false); });

        var form = SD.$('#formRecurso');
        var reglas = {
            recTitulo: function (v) {
                return v.trim().length < 10 ? 'Escribe un título de al menos 10 caracteres.' : '';
            },
            recTipo: function (v) { return v ? '' : 'Elige el tipo de recurso.'; },
            recTema: function (v) { return v ? '' : 'Elige el tema.'; },
            recArchivo: function (v, campo) {
                if (SD.$('#recTipo').value === 'Enlace') return '';
                var archivo = campo.files[0];
                if (!archivo) return 'Adjunta el archivo que quieres compartir.';
                if (archivo.size > LIMITE_BYTES) return 'El archivo pesa ' + tamanoLegible(archivo.size) + '; el máximo es 10 MB.';
                if (!/\.(pdf|pptx?|png|jpe?g)$/i.test(archivo.name)) return 'Solo se aceptan PDF, presentaciones o imágenes PNG y JPG.';
                return '';
            },
            recEnlace: function (v) {
                if (SD.$('#recTipo').value !== 'Enlace') return '';
                return /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(v.trim()) ? '' : 'Escribe un enlace completo que empiece por https://';
            },
            recDescripcion: function (v) {
                return v.trim().length < 20 ? 'Describe el recurso en al menos 20 caracteres.' : '';
            }
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!SD.validar(form, reglas)) return;

            var tipo = SD.$('#recTipo').value;
            var archivo = SD.$('#recArchivo').files[0];
            var propios = SD.leer(CLAVE_PROPIOS) || [];
            propios.unshift({
                id: 'r' + Date.now(),
                tipo: tipo,
                tema: SD.$('#recTema').value,
                titulo: SD.$('#recTitulo').value.trim(),
                autor: SD.usuarioActivo().nombre,
                fecha: SD.hoyIso(),
                tamano: tipo === 'Enlace' || !archivo ? '—' : tamanoLegible(archivo.size),
                descargas: 0
            });
            SD.escribir(CLAVE_PROPIOS, propios);

            SD.limpiarFormulario(form);
            alternarCampos();
            pintarTabla();
            SD.avisar(SD.$('#recAviso'), 'ok', 'Tu recurso se agregó al inicio de la tabla.');
        });
    }

    // ---------- contactos oficiales ----------

    function pintarOficiales() {
        SD.$('#recursosOficiales').innerHTML = recursos.map(function (r) {
            var esTel = r.enlace.indexOf('tel:') === 0;
            var extra = esTel ? '' : ' target="_blank" rel="noopener"';
            return '<article class="recurso">' +
                '<span class="recurso-icono" aria-hidden="true">' + r.icono + '</span>' +
                '<h3>' + SD.esc(r.titulo) + '</h3>' +
                '<p>' + SD.esc(r.descripcion) + '</p>' +
                '<a class="btn-secondary" href="' + SD.esc(r.enlace) + '"' + extra + '>' +
                    SD.esc(r.accion) + (esTel ? '' : ' ↗') +
                '</a>' +
            '</article>';
        }).join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        activarTabla();
        pintarTabla();
        compartir();
        pintarOficiales();
    });
})();
