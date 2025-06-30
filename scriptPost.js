document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('formPostulacion');

    // Regex: permite letras, espacios y guiones, mínimo 5 caracteres (incluye tildes y ñ)
    const regexNom = /^[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;

    // Regex: igual que el de nombre
    const regexApe = /^[-a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{4,}$/;

    // Regex: validación básica de email (caracteres, @, dominio, punto y extensión)
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    function habilitarTelefonoMail() {
        
    }

    function validarMail() {
        const mail = document.getElementById('mail').value.trim();
        const errorMail = document.getElementById('mail-error');
        if (mail === '') {
            errorMail.textContent = "Debe ingresar un correo electrónico válido";
            return false;
        } else if (!regexMail.test(mail)) {
            errorMail.textContent = "Ingrese un correo electrónico válido";
            return false;
        } else {
            errorMail.textContent = '';
            return true;
        }
    }

    function validarGenero(){
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
        const validGenero = validarGenero();
        const validArchivo = validarArchivo();

        if (validNombre && validApellido && validMail && validGenero && validArchivo) {
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