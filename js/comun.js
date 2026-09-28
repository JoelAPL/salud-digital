/* =========================================================================
   Salud Digital - Código compartido por todas las páginas
   -------------------------------------------------------------------------
   Utilidades, menú de navegación y sesión de demostración.
   La sesión vive solo en este navegador (localStorage) hasta que la etapa
   de servidor la reemplace por PHP y MySQL. Nunca se guarda la contraseña.
   ========================================================================= */

(function () {
    'use strict';

    var CLAVE_USUARIO = 'sd-usuario';
    var CLAVE_SESION = 'sd-sesion';

    // ---------- utilidades ----------

    function esc(valor) {
        return String(valor).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function num(valor) {
        return Number(valor).toLocaleString('es-PA');
    }

    function fecha(iso) {
        var partes = String(iso).split('-');
        var d = new Date(+partes[0], +partes[1] - 1, +partes[2]);
        return d.toLocaleDateString('es-PA', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function hoyIso() {
        var d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function $(sel, raiz) {
        return (raiz || document).querySelector(sel);
    }

    function $$(sel, raiz) {
        return Array.prototype.slice.call((raiz || document).querySelectorAll(sel));
    }

    function parametro(nombre) {
        return new URLSearchParams(window.location.search).get(nombre);
    }

    function iniciales(nombre) {
        return String(nombre).trim().split(/\s+/).slice(0, 2).map(function (p) {
            return p.charAt(0).toUpperCase();
        }).join('');
    }

    // ---------- almacenamiento seguro ----------
    // En modo privado o con el almacenamiento bloqueado, localStorage lanza
    // una excepción: el sitio debe seguir funcionando igual.

    function leer(clave) {
        try { return JSON.parse(localStorage.getItem(clave)); } catch (e) { return null; }
    }

    function escribir(clave, valor) {
        try { localStorage.setItem(clave, JSON.stringify(valor)); return true; } catch (e) { return false; }
    }

    function borrar(clave) {
        try { localStorage.removeItem(clave); } catch (e) { /* sin almacenamiento */ }
    }

    // ---------- sesión de demostración ----------

    function usuarioRegistrado() {
        return leer(CLAVE_USUARIO);
    }

    function usuarioActivo() {
        return leer(CLAVE_SESION) ? usuarioRegistrado() : null;
    }

    function registrar(datos) {
        return escribir(CLAVE_USUARIO, datos) && escribir(CLAVE_SESION, true);
    }

    function iniciarSesion() {
        return escribir(CLAVE_SESION, true);
    }

    function cerrarSesion() {
        borrar(CLAVE_SESION);
    }

    function actualizarUsuario(cambios) {
        var u = usuarioRegistrado() || {};
        Object.keys(cambios).forEach(function (k) { u[k] = cambios[k]; });
        return escribir(CLAVE_USUARIO, u);
    }

    // ---------- contenido de la comunidad ----------
    // Los temas de demostración (data.js) más los que el usuario publica en
    // este navegador. Los guardados son una lista de identificadores.

    var CLAVE_TEMAS = 'sd-temas-propios';
    var CLAVE_GUARDADOS = 'sd-guardados';

    function temasDelForo() {
        return (leer(CLAVE_TEMAS) || []).concat(temasForo);
    }

    function publicarTema(tema) {
        var propios = leer(CLAVE_TEMAS) || [];
        propios.unshift(tema);
        return escribir(CLAVE_TEMAS, propios);
    }

    function buscarTema(id) {
        return temasDelForo().find(function (t) { return String(t.id) === String(id); }) || null;
    }

    function guardados() {
        return leer(CLAVE_GUARDADOS) || [];
    }

    function alternarGuardado(id) {
        var lista = guardados();
        var i = lista.indexOf(String(id));
        if (i === -1) lista.push(String(id)); else lista.splice(i, 1);
        escribir(CLAVE_GUARDADOS, lista);
        return i === -1;
    }

    // Tarjeta de tema del foro, usada en el foro y en el perfil.
    function itemForo(t) {
        return '<article class="foro-item">' +
            '<div class="foro-contador"><strong>' + num(t.respuestas) + '</strong><span>respuestas</span></div>' +
            '<div>' +
                '<span class="chip-claro">' + esc(t.categoria) + '</span>' +
                '<h2><a href="publicacion.html?id=' + encodeURIComponent(t.id) + '">' + esc(t.titulo) + '</a></h2>' +
                '<p>' + esc(t.resumen) + '</p>' +
                '<p class="foro-meta">' +
                    '<span class="autor">' + esc(t.autor) + '</span>' +
                    '<span>' + fecha(t.fecha) + '</span>' +
                    '<span>' + num(t.vistas) + ' vistas</span>' +
                    '<span>' + num(t.util) + ' lo marcaron útil</span>' +
                '</p>' +
            '</div>' +
        '</article>';
    }

    // ---------- menú ----------

    // Páginas que no están en el menú se marcan con la sección a la que pertenecen.
    var SECCION_DE = { 'publicacion.html': 'foro.html', 'registro.html': 'login.html' };

    function marcarPaginaActual() {
        var actual = window.location.pathname.split('/').pop() || 'index.html';
        actual = SECCION_DE[actual] || actual;
        $$('#menu a[href]').forEach(function (a) {
            var destino = a.getAttribute('href').split('#')[0];
            if (destino === actual) {
                a.classList.add('activo');
                a.setAttribute('aria-current', 'page');
            }
        });
    }

    function pintarCuenta() {
        var enlace = $('[data-cuenta]');
        if (!enlace) return;
        var u = usuarioActivo();
        if (u) {
            enlace.href = 'perfil.html';
            enlace.innerHTML = '<span class="menu-avatar" aria-hidden="true">' + esc(iniciales(u.nombre)) +
                '</span>Mi perfil';
        } else {
            enlace.href = 'login.html';
            enlace.textContent = 'Ingresar';
        }
    }

    function activarMenu() {
        var toggle = $('#navToggle');
        var menu = $('#menu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            var abierto = menu.classList.toggle('abierto');
            toggle.setAttribute('aria-expanded', abierto);
            toggle.setAttribute('aria-label', abierto ? 'Cerrar el menú' : 'Abrir el menú');
        });
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) {
                menu.classList.remove('abierto');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        var navbar = $('#navbar');
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('con-sombra', window.scrollY > 8);
        }, { passive: true });
    }

    // ---------- mensajes de formulario ----------

    function mostrarError(campo, mensaje) {
        var grupo = campo.closest('.campo');
        var salida = grupo && $('.campo-error', grupo);
        campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
        if (grupo) grupo.classList.toggle('con-error', !!mensaje);
        if (salida) salida.textContent = mensaje || '';
    }

    function avisar(contenedor, tipo, mensaje) {
        contenedor.hidden = false;
        contenedor.className = 'aviso aviso-' + tipo;
        contenedor.textContent = mensaje;
    }

    // reglas: { idDelCampo: function (valor, campo) { return 'mensaje' o '' } }
    // Valida todo al enviar y, desde el primer intento, cada campo al salir de él.
    function validar(form, reglas) {
        var primero = null;
        Object.keys(reglas).forEach(function (id) {
            var campo = $('#' + id, form);
            if (!campo) return;
            var mensaje = reglas[id](campo.value, campo);
            mostrarError(campo, mensaje);
            if (mensaje && !primero) primero = campo;
        });

        // Los escuchadores se agregan una sola vez; solo actúan después de un
        // intento de envío, y limpiarFormulario() los vuelve a dormir.
        form.dataset.intentado = '1';
        if (!form.dataset.escuchando) {
            form.dataset.escuchando = '1';
            Object.keys(reglas).forEach(function (id) {
                var campo = $('#' + id, form);
                if (!campo) return;
                var evento = campo.type === 'checkbox' || campo.tagName === 'SELECT' ? 'change' : 'blur';
                campo.addEventListener(evento, function () {
                    if (form.dataset.intentado) mostrarError(campo, reglas[id](campo.value, campo));
                });
            });
        }

        if (primero) primero.focus();
        return !primero;
    }

    function limpiarFormulario(form) {
        form.reset();
        delete form.dataset.intentado;
        $$('input, select, textarea', form).forEach(function (campo) { mostrarError(campo, ''); });
    }

    function opciones(lista, primera) {
        return (primera ? '<option value="">' + esc(primera) + '</option>' : '') +
            lista.map(function (v) { return '<option>' + esc(v) + '</option>'; }).join('');
    }

    window.SD = {
        esc: esc, num: num, fecha: fecha, hoyIso: hoyIso, $: $, $$: $$,
        parametro: parametro, iniciales: iniciales, leer: leer, escribir: escribir,
        usuarioRegistrado: usuarioRegistrado, usuarioActivo: usuarioActivo,
        registrar: registrar, iniciarSesion: iniciarSesion, cerrarSesion: cerrarSesion,
        actualizarUsuario: actualizarUsuario,
        temasDelForo: temasDelForo, publicarTema: publicarTema, buscarTema: buscarTema,
        guardados: guardados, alternarGuardado: alternarGuardado, itemForo: itemForo,
        mostrarError: mostrarError, avisar: avisar, validar: validar, opciones: opciones,
        limpiarFormulario: limpiarFormulario,
        pintarCuenta: pintarCuenta
    };

    document.addEventListener('DOMContentLoaded', function () {
        marcarPaginaActual();
        pintarCuenta();
        activarMenu();
    });
})();
