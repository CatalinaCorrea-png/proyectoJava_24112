//* Todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded',()=>{
    //* Selecciona el formulario del dom
  const formulario = document.querySelector('form');
  const formRegistro = document.querySelector('.form-registro'); //Para saber cuando es registro o login
  console.log(!formRegistro ? "No es registro":"Es registro");
// ---------------------------------
  //* Funcion para mostrar error
  const mostrarError = (input,mensaje) => {
    // Acceder al div padre/contenedor
    const divPadre = input.parentNode;
    // Encontramos elemento error-text
    const errorText = divPadre.querySelector('.error-text');
    // Agregar la clase 'error' al elemento padre
    divPadre.classList.add('error');
    // Agregamos el mensaje de error
    errorText.innerText = mensaje;
  }

  // ---------------------------------

  //* Eliminar mensaje de error
  const eliminarError = (input) => {
    // Accedemos a la etiqueta contenedora
    const divPadre = input.parentNode;
    // Eliminar clase error del elemento padre
    divPadre.classList.remove('error');
    // Encontrar elemento error-text
    const errorText = divPadre.querySelector('.error-text');

    if(errorText) {
      // Establecemos el texto como vacío
      errorText.innerHTML = '';
    } else {
      console.error("Elemento no encontrado.");
    }
  }

  // ---------------------------------
  //* Funcion para corroborar si los campos estan completos para quitar el error

  formulario.querySelectorAll('input').forEach(input =>{
    // Se activa cuando el valor de un elemento del form cambia y se sale del elemento
    input.addEventListener('change',()=>{
      // Obtenemos el valor del campo seleccionado
      const valor = input.value; //? Elimina espacio en blanco al principio y al final del valor obtenido.
      //* condicion para evaluar
      if (valor !== ''){
        eliminarError(input);
      }
    })
  })

  // ---------------------------------
  //* Funcion validar campo
  function validarCampo(campoId,mensaje) {
    const campo = document.getElementById(campoId);
    const value = campo.value;

    if (value === ''){
      mostrarError(campo, mensaje);
      return  false; //? Indicamos que la validacion falló
    }else{
      eliminarError(campo);
      console.log(value);
      return true; //? Indicamos que la validacion fue exitosa
    }
  }

  // ---------------------------------
  //* Validar correo electronico utilizando expresion regular
  function isEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email); //? .test Devuelve TRUE si las cadena coinciden
  }
  //* Validar campo email
  function validarEmail(campoId,mensaje) {
    // obtenemos el campo mediante id
    const campo = document.getElementById(campoId);
    const email = campo.value;

    if (email === ''){
      mostrarError(campo, 'Correo electronico obligatorio');
      return false; //? Validacion falla
    }else if (!isEmail(email)){
      mostrarError(campo,mensaje);
      return false; //? Validacion falla
    }else{
      eliminarError(campo);
      console.log(campo.value);
      return true; //? Validacion exitosa
    }
  }

  //--------------------------------
  //* Funcion validar formulario
  const validarFormulario = () => {
    let validar = true;
    
    //* Validar EMAIL
    validar = validarEmail('email','Correo electronico no válido') && validar; 
    //* Validar CONTRASEÑA
    validar = validarCampo('password','Contraseña obligatoria') && validar;

    if (formRegistro) { //Si es registro, entra
      //* Validar NOMBRE y APELLIDO
      validar = validarCampo('nombre','Campo obligatorio') && validar;  
      validar = validarCampo('apellido','Campo obligatorio') && validar; 
        //* Validar FECHA
      validar = validarCampo('fechaNacimiento','Fecha no valida') && validar;
      // validar = validarCampo('check','Fecha no valida') && validar;
    }

    return validar;
  }

  //---------------------------
  //* Evento de escucha para el submit del form

  formulario.addEventListener('submit',event => {
    event.preventDefault();
    if (!validarFormulario()){
      event.preventDefault();
      console.log("El formulario no es valido");
//      console.log(formRegistro);
    }else{
      // event.preventDefault();
      console.log("El formulario es valido");
      formulario.submit();
    }
  })
});

