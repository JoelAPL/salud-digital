/* =========================================================================
   Salud Digital - Vista de una publicación del foro
   (RF-10 comentar, RF-12 respuesta más útil, RF-15 guardar,
    RF-16 valorar utilidad, RF-18 reportar)
   ========================================================================= */

(function () {
    'use strict';

    var SD = window.SD;
    var tema = null;

    function claveRespuestas() {
        return 'sd-respuestas-' + tema.id;
    }

    function respuestasDelTema() {
        var base = respuestasForo[tema.id] || [];
        return base.concat(SD.leer(claveRespuestas()) || []);
    }

    // ---------- publicación ----------

    function botonAccion(accion, texto, presionado, extra) {
        return '<button type="button" class="btn-accion' + (extra || '') + '" data-accion="' + accion + '"' +
            ' aria-pressed="' + !!presionado + '">' + texto + '</button>';
    }

    function pintarPost() {
        var guardado = SD.guardados().indexOf(String(tema.id)) !== -1;
        var parrafos = (tema.contenido || [tema.resumen]).map(function (p) {
            return '<p>' + SD.esc(p) + '</p>';
        }).join('');

        SD.$('#post').innerHTML =
            '<span class="chip-claro">' + SD.esc(tema.categoria) + '</span>' +
            (tema.propio ? '' : ' <span class="badge-demo">demostración</span>') +
            '<h1>' + SD.esc(tema.titulo) + '</h1>' +
            '<div class="post-autor">' +
                '<span class="avatar" aria-hidden="true">' + SD.esc(SD.iniciales(tema.autor)) + '</span>' +
                '<div><strong>' + SD.esc(tema.autor) + '</strong>' +
                '<span>' + SD.fecha(tema.fecha) + ' · ' + SD.num(tema.vistas) + ' vistas</span></div>' +
            '</div>' +
            '<div class="post-cuerpo">' + parrafos + '</div>' +
            '<div class="post-acciones">' +
                botonAccion('util', '👍 Útil (<span data-cuenta-util>' + SD.num(tema.util) + '</span>)', false) +
                botonAccion('guardar', guardado ? '★ Guardado' : '☆ Guardar', guardado) +
                botonAccion('reportar', '⚑ Reportar', false, ' peligro') +
            '</div>' +
            '<p class="aviso" id="postAviso" role="status" hidden></p>';

        SD.$('#post').onclick = function (e) {
            var boton = e.target.closest('[data-accion]');
            if (!boton) return;
            var accion = boton.dataset.accion;

            if (accion === 'util') {
                var marcado = boton.getAttribute('aria-pressed') !== 'true';
                boton.setAttribute('aria-pressed', marcado);
                SD.$('[data-cuenta-util]', boton).textContent = SD.num(tema.util + (marcado ? 1 : 0));
            }
            if (accion === 'guardar') {
                var ahora = SD.alternarGuardado(tema.id);
                boton.setAttribute('aria-pressed', ahora);
                boton.textContent = ahora ? '★ Guardado' : '☆ Guardar';
            }
            if (accion === 'reportar') {
                boton.setAttribute('aria-pressed', 'true');
                boton.disabled = true;
                boton.textContent = '⚑ Reportado';
                SD.avisar(SD.$('#postAviso'), 'info',
                    'Gracias. Un moderador revisará esta publicación antes de 48 horas.');
            }
        };
    }

    // ---------- respuestas ----------

    function htmlRespuesta(r) {
        var hijas = (r.respuestas || []).map(htmlRespuesta).join('');
        return '<article class="respuesta' + (r.mejor ? ' es-mejor' : '') + '">' +
            '<div class="post-autor">' +
                '<span class="avatar" aria-hidden="true">' + SD.esc(SD.iniciales(r.autor)) + '</span>' +
                '<div><strong>' + SD.esc(r.autor) +
                    (r.mejor ? '<span class="insignia-mejor">Respuesta más útil</span>' : '') + '</strong>' +
                '<span>' + SD.fecha(r.fecha) + '</span></div>' +
            '</div>' +
            '<p>' + SD.esc(r.texto) + '</p>' +
            '<div class="post-acciones">' +
                botonAccion('util-resp', '👍 Útil (' + SD.num(r.util || 0) + ')', false) +
            '</div>' +
            (hijas ? '<div class="respuestas-hijas">' + hijas + '</div>' : '') +
        '</article>';
    }

    function pintarRespuestas() {
        var lista = respuestasDelTema();
        var total = Math.max(tema.respuestas, lista.length);
        SD.$('#respuestasTitulo').textContent = lista.length
            ? 'Respuestas (' + lista.length + ' de ' + total + ')'
            : 'Respuestas';
        SD.$('#respuestas').innerHTML = lista.length
            ? lista.map(htmlRespuesta).join('')
            : '<p class="vacio">Todavía nadie responde. Comparte lo que sepas sobre este caso.</p>';

        SD.$('#respuestas').onclick = function (e) {
            var boton = e.target.closest('[data-accion="util-resp"]');
            if (!boton) return;
            var marcado = boton.getAttribute('aria-pressed') !== 'true';
            var base = parseInt(boton.textContent.replace(/\D/g, ''), 10) || 0;
            boton.setAttribute('aria-pressed', marcado);
            boton.textContent = '👍 Útil (' + (base + (marcado ? 1 : -1)) + ')';
        };
    }

    function formularioRespuesta() {
        var form = SD.$('#formRespuesta');
        if (!SD.usuarioActivo()) {
            SD.$('#responder').innerHTML =
                '<p class="aviso aviso-info">Para responder necesitas una cuenta. ' +
                '<a href="login.html?volver=' + encodeURIComponent('publicacion.html?id=' + tema.id) + '">Inicia sesión</a> o ' +
                '<a href="registro.html">crea una cuenta</a>.</p>';
            return;
        }

        var reglas = {
            respTexto: function (v) {
                return v.trim().length < 10 ? 'Escribe una respuesta de al menos 10 caracteres.' : '';
            }
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!SD.validar(form, reglas)) return;

            var propias = SD.leer(claveRespuestas()) || [];
            propias.push({
                autor: SD.usuarioActivo().nombre,
                fecha: SD.hoyIso(),
                texto: SD.$('#respTexto').value.trim(),
                util: 0
            });
            SD.escribir(claveRespuestas(), propias);

            SD.limpiarFormulario(form);
            pintarRespuestas();
            SD.avisar(SD.$('#respAviso'), 'ok', 'Tu respuesta se publicó.');
        });
    }

    function pintarRelacionados() {
        var otros = SD.temasDelForo().filter(function (t) {
            return t.categoria === tema.categoria && String(t.id) !== String(tema.id);
        });
        if (!otros.length) {
            otros = SD.temasDelForo().filter(function (t) { return String(t.id) !== String(tema.id); });
        }
        SD.$('#relacionados').innerHTML = otros.slice(0, 4).map(function (t) {
            return '<li><a href="publicacion.html?id=' + encodeURIComponent(t.id) + '">' + SD.esc(t.titulo) + '</a></li>';
        }).join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        tema = SD.buscarTema(SD.parametro('id') || 1);

        if (!tema) {
            SD.$('#post').innerHTML = '<h1>No encontramos esta publicación</h1>' +
                '<p class="section-sub">Puede que se haya eliminado. <a href="foro.html">Vuelve al foro</a>.</p>';
            SD.$('#respuestasTitulo').hidden = true;
            SD.$('#responder').hidden = true;
            return;
        }

        document.title = tema.titulo + ' · Salud Digital';
        SD.$('#migaActual').textContent = tema.categoria;
        pintarPost();
        pintarRespuestas();
        formularioRespuesta();
        pintarRelacionados();
    });
})();
