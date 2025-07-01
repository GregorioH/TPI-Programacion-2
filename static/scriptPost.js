document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('formPostulacion');

    // Regex: permite letras, espacios y guiones, mínimo 5 caracteres (incluye tildes y ñ)
    const regexNom = /^[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;

    // Regex: igual que el de nombre
    const regexApe = /^[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;

    // Regex: validación básica de email (caracteres, @, dominio, punto y extensión)
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex: 9 (opcional) + código de área (2‑4 díg) + 6‑8 dígitos de abonado
    const regexTel = /^\s*(?:9\s*)?(?:\d\s*){10}\s*$/;

    function validarNombre() {
        const nombre = document.getElementById('nombre').value.trim();
        const errorNom = document.getElementById('nom-error');
        if (nombre === '') {
            errorNom.textContent = "Debe ingresar un nombre válido";
            return false;
        } else if (!regexNom.test(nombre)) {
            errorNom.textContent = "El nombre debe tener al menos 4 caracteres";
            return false;
        } else {
            errorNom.textContent = '';
            return true;
        }
    }

    function validarApellido() {
        const apellido = document.getElementById('apellido').value.trim();
        const errorApe = document.getElementById('ape-error');
        if (apellido === '') {
            errorApe.textContent = "Debe ingresar un apellido válido";
            return false;
        } else if (!regexApe.test(apellido)) {
            errorApe.textContent = "El apellido debe tener al menos 4 caracteres";
            return false;
        } else {
            errorApe.textContent = '';
            return true;
        }
    }

    const metodoT = document.getElementById('metodoT');
    const metodoM = document.getElementById('metodoM');

    const divTel = document.getElementById('divTel');
    const divMail = document.getElementById('divMail');




    function habilitarTelefonoMail() {
        divTel.hidden = !metodoT.checked;
        divMail.hidden = !metodoM.checked;

        if (divTel.hidden) {
            document.getElementById('telefono').value = '';
        }
        if (divMail.hidden) {
            document.getElementById('mail').value = '';
        }
    }

    metodoT.addEventListener('change', habilitarTelefonoMail);
    metodoM.addEventListener('change', habilitarTelefonoMail);

    habilitarTelefonoMail();

    function validarTelefono() {
        const telefono = document.getElementById('telefono').value.trim();
        const errorTel = document.getElementById('tel-error');
        if (!divTel.hidden) {
            if (telefono === '') {
                errorMail.textContent = "Debe ingresar un número de teléfono";
                return false;
            } else if (!regexTel.test(telefono)) {
                errorTel.textContent = "Ingrese un número de teléfono válido";
                return false;
            } else {
                errorTel.textContent = '';
                return true;
            }
        }
    }

    const tel = document.getElementById('telefono');
    tel.addEventListener('blur', () => {
        const valor = tel.value;

        // No formatea si es inválido
        if (!regexTel.test(valor)) return;

        // Particionar
        const esMovil = valor.length === 11;        // Tiene el 9
        const sin9 = esMovil ? valor.slice(1) : valor;
        const area = sin9.slice(0, sin9.length - 8);
        const local = sin9.slice(-8);

        // Formatear
        const salida = `${esMovil ? '9 ' : ''}${area} ${local.slice(0, 4)} ${local.slice(4)}`;
        tel.value = salida;
    });

    function validarMail() {
        const mail = document.getElementById('mail').value.trim();
        const errorMail = document.getElementById('mail-error');
        if (!divMail.hidden) {
            if (mail === '') {
                errorMail.textContent = "Debe ingresar un correo electrónico";
                return false;
            } else if (!regexMail.test(mail)) {
                errorMail.textContent = "Ingrese un correo electrónico válido";
                return false;
            } else {
                errorMail.textContent = '';
                return true;
            }
        }

    }

    function validarGenero() {
        const genero = document.getElementById('genero').value.trim();
        const errorGenero = document.getElementById('genero-error');
        if (!genero || genero.value == '') {
            errorGenero.textContent = "Seleccione una de las opciones";
            return false;
        }
        else {
            errorGenero.textContent = '';
            return true;
        }
    }

    function validarArchivo() {
        const archivo = document.getElementById('myfile');
        const archivoPath = archivo.value;
        const extensionesPermitidas = /(\.pdf|\.jpg)$/i;
        const errorArchivo = document.getElementById('archivo-error');
        if (!archivo) {
            errorArchivo.textContent = "Debe adjuntar un archivo .pdf o .jpg";
            return false;
        }
        else if (!extensionesPermitidas.exec(archivoPath)) {
            archivo.value = '';
            errorArchivo.textContent = "El archivo debe ser .pdf o .jpg";
            return false;
        }
        else {
            errorArchivo.textContent = '';
            return true;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const validNombre = validarNombre();
        const validApellido = validarApellido();
        const validMail = validarMail();
        const validTel = validarTelefono();
        const validGenero = validarGenero();
        const validArchivo = validarArchivo();

        if (validNombre && validApellido && (validTel || validMail) && validGenero && validArchivo) {
            alert('Formulario enviado con éxito');
            console.log('Formulario enviado con éxito')
        }
    });
});

/* document.addEventListener('DOMContentLoaded', function () {
    function validarNombre() {
        regexNom = /^[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\W+[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\W+[-\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]]+)?$/
        const nombre = document.getElementById('nombre');
        const errorNom = document.getElementById('nom-error');
        
        if (autor === '') {
            errorNom.textContent = "Debe ingresar un nombre de autor";
            return false;
        }
        else if (!regexNom.test(nombre)) {
            errorNom.textContent = "El nombre del autor debe tener al menos 5 caracteres";
            return false;
        }
        else {
            errorNom.textContent = ''
            return true;
        }
    }
    
    function validarApe() {
        regexApe = /^[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\W+[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\W+[-\s[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]]+)?$/
        const apellido = document.getElementById('apellidoPost');
        const errorApe = document.getElementById('ape-error');
        
        if (autor === '') {
            errorApe.textContent = "Debe ingresar un nombre de autor";
            return false;
        }
        else if (!regexApe.test(apellido)) {
            errorApe.textContent = "El nombre del autor debe tener al menos 5 caracteres";
            return false;
        }
        else {
            errorApe.textContent = ''
            return true;
        }
    }
}) */