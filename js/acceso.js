/* =========================================================================
   Salud Digital - Registro e inicio de sesión (RF-01, RF-02)
   ========================================================================= */

(function () {
    'use strict';

    var SD = window.SD;
    var DOMINIO = '@utp.ac.pa';
    var FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validarCorreo(valor) {
        valor = valor.trim().toLowerCase();
        if (!valor) return 'Escribe tu correo institucional.';
        if (!FORMATO_CORREO.test(valor)) return 'El correo no tiene un formato válido.';
        if (valor.slice(-DOMINIO.length) !== DOMINIO) {
            return 'Usa tu correo institucional, que termina en ' + DOMINIO + '.';
        }
        return '';
    }

    function validarClave(valor) {
        if (valor.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
        if (!/[a-záéíóúñ]/i.test(valor) || !/[0-9]/.test(valor)) return 'Combina letras y números.';
        return '';
    }

    function irDespues(destino) {
        setTimeout(function () { window.location.href = destino; }, 900);
    }

    // ---------- registro ----------

    function registro() {
        var form = SD.$('#formRegistro');
        if (!form) return;

        SD.$('#regCarrera').innerHTML = SD.opciones(carreras, 'Selecciona…');

        var reglas = {
            regNombre: function (v) {
                return v.trim().split(/\s+/).length < 2 ? 'Escribe tu nombre y tu apellido.' : '';
            },
            regCorreo: validarCorreo,
            regRol: function (v) { return v ? '' : 'Elige si eres estudiante o docente.'; },
            regCarrera: function (v) { return v ? '' : 'Elige tu carrera o especialidad.'; },
            regClave: validarClave,
            regClave2: function (v) {
                if (!v) return 'Repite la contraseña.';
                return v !== SD.$('#regClave').value ? 'Las contraseñas no coinciden.' : '';
            },
            regAcepto: function (v, campo) {
                return campo.checked ? '' : 'Debes aceptar el tratamiento de datos para continuar.';
            }
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var aviso = SD.$('#regAviso');
            if (!SD.validar(form, reglas)) {
                SD.avisar(aviso, 'error', 'Revisa los campos marcados en rojo.');
                return;
            }

            // La contraseña no se guarda: solo los datos del perfil.
            var guardado = SD.registrar({
                nombre: SD.$('#regNombre').value.trim(),
                correo: SD.$('#regCorreo').value.trim().toLowerCase(),
                rol: SD.$('#regRol').value,
                carrera: SD.$('#regCarrera').value,
                descripcion: '',
                desde: SD.hoyIso()
            });

            if (!guardado) {
                SD.avisar(aviso, 'error', 'Tu navegador no permite guardar datos. Desactiva el modo privado e inténtalo de nuevo.');
                return;
            }
            SD.avisar(aviso, 'ok', 'Cuenta creada. Te llevamos a tu perfil…');
            SD.pintarCuenta();
            irDespues('perfil.html');
        });
    }

    // ---------- inicio de sesión ----------

    function login() {
        var form = SD.$('#formLogin');
        if (!form) return;

        var aviso = SD.$('#logAviso');
        var activo = SD.usuarioActivo();
        if (activo) {
            SD.avisar(aviso, 'info', 'Ya iniciaste sesión como ' + activo.nombre + '.');
        }

        var reglas = {
            logCorreo: validarCorreo,
            logClave: function (v) { return v ? '' : 'Escribe tu contraseña.'; }
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!SD.validar(form, reglas)) return;

            var correo = SD.$('#logCorreo').value.trim().toLowerCase();
            var cuenta = SD.usuarioRegistrado();
            if (!cuenta || cuenta.correo !== correo) {
                SD.avisar(aviso, 'error', 'No encontramos una cuenta con ese correo en este navegador. Crea una en la página de registro.');
                return;
            }

            SD.iniciarSesion();
            SD.avisar(aviso, 'ok', 'Bienvenido, ' + cuenta.nombre + '. Te llevamos a tu perfil…');
            SD.pintarCuenta();
            irDespues(SD.parametro('volver') || 'perfil.html');
        });

        SD.$('#olvideClave').addEventListener('click', function (e) {
            e.preventDefault();
            SD.avisar(aviso, 'info', 'La recuperación de contraseña por correo se habilitará con el servidor en la etapa de PHP y MySQL.');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        registro();
        login();
    });
})();
