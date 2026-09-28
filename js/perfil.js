/* =========================================================================
   Salud Digital - Perfil del usuario (RF-03, RF-15)
   ========================================================================= */

(function () {
    'use strict';

    var SD = window.SD;

    // Sin sesión se muestra un perfil de ejemplo, marcado como tal.
    var PERFIL_DEMO = {
        nombre: 'Usuario de demostración',
        rol: 'Estudiante',
        carrera: carreras[0],
        descripcion: 'Interesado en vigilancia epidemiológica y en herramientas digitales para el primer nivel de atención.',
        desde: '2026-08-15'
    };

    var usuario = null;
    var esDemo = false;

    function publicaciones() {
        if (esDemo) return temasForo.slice(0, 2);
        return SD.temasDelForo().filter(function (t) { return t.propio && t.autor === usuario.nombre; });
    }

    function respuestasPropias() {
        if (esDemo) return 5;
        var total = 0;
        SD.temasDelForo().forEach(function (t) {
            (SD.leer('sd-respuestas-' + t.id) || []).forEach(function (r) {
                if (r.autor === usuario.nombre) total++;
            });
        });
        return total;
    }

    function temasGuardados() {
        return SD.guardados().map(SD.buscarTema).filter(Boolean);
    }

    // ---------- cabecera y cifras ----------

    function pintarCabecera() {
        SD.$('#perfilAvatar').textContent = SD.iniciales(usuario.nombre);
        SD.$('#perfilNombre').textContent = usuario.nombre;
        SD.$('#perfilRol').textContent = usuario.rol;
        SD.$('#perfilCarrera').textContent = usuario.carrera +
            (usuario.descripcion ? ' · ' + usuario.descripcion : '');
        SD.$('#perfilDesde').textContent = 'Miembro desde el ' + SD.fecha(usuario.desde);

        var pubs = publicaciones();
        var util = pubs.reduce(function (s, t) { return s + (t.util || 0); }, 0);
        var datos = [
            ['Publicaciones', pubs.length],
            ['Respuestas', respuestasPropias()],
            ['Guardados', temasGuardados().length],
            ['Marcas de útil', util]
        ];
        SD.$('#perfilStats').innerHTML = datos.map(function (d) {
            return '<div class="dato"><dt>' + SD.esc(d[0]) + '</dt><dd>' + SD.num(d[1]) + '</dd></div>';
        }).join('');
    }

    // ---------- pestañas ----------

    function activarPestanas() {
        var tabs = SD.$$('[role="tab"]');

        function elegir(tab) {
            tabs.forEach(function (t) {
                var activa = t === tab;
                t.setAttribute('aria-selected', activa);
                t.tabIndex = activa ? 0 : -1;
                SD.$('#' + t.getAttribute('aria-controls')).hidden = !activa;
            });
            tab.focus();
        }

        tabs.forEach(function (tab, i) {
            tab.addEventListener('click', function () { elegir(tab); });
            tab.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight') elegir(tabs[(i + 1) % tabs.length]);
                if (e.key === 'ArrowLeft') elegir(tabs[(i - 1 + tabs.length) % tabs.length]);
            });
        });

        var inicial = SD.parametro('pestana');
        var destino = tabs.find(function (t) { return t.id === 'tab' + inicial; });
        if (destino) elegir(destino);
    }

    function pintarListas() {
        var pubs = publicaciones();
        SD.$('#listaPublicaciones').innerHTML = pubs.length
            ? pubs.map(SD.itemForo).join('')
            : '<p class="vacio">Aún no publicas temas. <a href="foro.html">Abre el primero en el foro</a>.</p>';

        var guardados = temasGuardados();
        SD.$('#listaGuardados').innerHTML = guardados.map(SD.itemForo).join('');
        SD.$('#guardadosVacio').hidden = guardados.length > 0;
    }

    // ---------- editar perfil ----------

    function formularioPerfil() {
        var form = SD.$('#formPerfil');
        SD.$('#perCarrera').innerHTML = SD.opciones(carreras);
        SD.$('#perNombre').value = usuario.nombre;
        SD.$('#perRol').value = usuario.rol;
        SD.$('#perCarrera').value = usuario.carrera;
        SD.$('#perDescripcion').value = usuario.descripcion || '';

        if (esDemo) {
            SD.$$('input, select, textarea, button', form).forEach(function (c) { c.disabled = true; });
            SD.avisar(SD.$('#perAviso'), 'info', 'Inicia sesión para editar tu perfil.');
            return;
        }

        var reglas = {
            perNombre: function (v) {
                return v.trim().split(/\s+/).length < 2 ? 'Escribe tu nombre y tu apellido.' : '';
            }
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!SD.validar(form, reglas)) return;

            SD.actualizarUsuario({
                nombre: SD.$('#perNombre').value.trim(),
                rol: SD.$('#perRol').value,
                carrera: SD.$('#perCarrera').value,
                descripcion: SD.$('#perDescripcion').value.trim()
            });
            usuario = SD.usuarioActivo();
            pintarCabecera();
            SD.pintarCuenta();
            SD.avisar(SD.$('#perAviso'), 'ok', 'Guardamos los cambios de tu perfil.');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        usuario = SD.usuarioActivo();
        esDemo = !usuario;
        if (esDemo) usuario = PERFIL_DEMO;

        SD.$('#perfilDemo').hidden = !esDemo;
        var salir = SD.$('#btnCerrarSesion');
        salir.hidden = esDemo;
        salir.addEventListener('click', function () {
            SD.cerrarSesion();
            window.location.href = 'index.html';
        });

        pintarCabecera();
        activarPestanas();
        pintarListas();
        formularioPerfil();
    });
})();
