const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjlmZWU4MzI5ZGFjMTdhMGY5NDc0ZDM2OWZkN2EyMiIsInN1YiI6IjY2NTg3ZTUyZmUyODQ2MDk2NjUwNjAyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P74nAyBfz1fZyiUXo-b968u_cNoaEt40_Q8yUZDl43s'
const API_URL = 'https://api.themoviedb.org/3'

let currentPage = 1;

//----------- ACLAMADAS -------------------
/// Fetch
function llamarAPIaclamadas(page) {
  fetch(`${API_URL}/movie/top_rated?language=en-US&page=${page}`, {
      headers: {
          Authorization: `Bearer ${API_KEY}`,
      },
  })
      .then(response => response.json())
      // .then(data => console.log(data));
      .then(data => dibujarDatosAclamadas(data));
}

/// Creacion de obj
function dibujarDatosAclamadas(json) {
  const filas = json.results.map(obj => Pelicula(obj));
  // map: recorre y crea un nuevo Array igual al "results" con la condicion/funcion en el parametro
  // Cada indice envia su resultado a la funcion Peliculas y devuelve lo de la funcion con los datos pasados
  document.querySelector('.aclamadas .aclamadasContainer').innerHTML = filas.join(''); // Separa los elementos con el caracter que le pasamos, en vez de comas en este caso es ''
}

/// Creacion de Componente
function Pelicula(obj) {
  return `
  <div class="aclamadaItem">
  <a href="./pages/detalle.html" class="anclalogo">
    <img src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" class="imagen" alt="${obj.title}">        
  </a>
  
  
  <p>${obj.title}</p>
  </div>
  `;
}


//----------- BOTONES ANTERIOR - SIGUIENTE ------------
// //* Funcion para cargar pagina siguiente
// function cargarSigPagina() {
//   currentPage++;
//   llamarAPI(currentPage); // Fetch a la pagina correspondiente en la API
// }

// //* Funcion para cargar pagina anterior
// function cargarAntPagina() {
//   if(currentPage > 1){
//     currentPage--;
//     llamarAPI(currentPage); // Fetch a la pagina correspondiente en la API
//   }
// }

// //* Event Listeners para botones
// document.querySelector('.anterior').addEventListener('click', cargarAntPagina);
// document.querySelector('.siguiente').addEventListener('click', cargarSigPagina);
//-----------------------------------------------

//* Llamar a la funcion para obtener y dibujar los datos iniciales (pagina: 1)
llamarAPIaclamadas(currentPage);