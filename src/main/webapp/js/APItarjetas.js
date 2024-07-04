//----------- TARJETAS -------------------
//* Generos
//* /genre/movie/list?language=en
//* Popular
//* /movie/popular?language=en-US&page=${page}

let paginaTarj = 1;

/// Fetch INFO TARJETAS
function llamarAPItarjetas(page) {
  fetch(`${API_URL}/movie/popular?language=en-US&page=${page}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  .then(response => response.json())
  // .then(data => console.log(data));
  .then(data => dibujarDatosTarjetas(data));
}


/// Creacion de obj TARJETAS
function dibujarDatosTarjetas(json) {
  const tarjetas = json.results.map(obj => Tarjetas(obj));
  document.querySelector('.tendencias .tendencias-cards').innerHTML = tarjetas.join('');
}
  
  
/// Creacion de Componente
function Tarjetas(obj) {
  
  if (obj.overview == "") {
    return ``
  }else{
      
    return `
    <div class="movie_card" data-aos="fade-down" data-aos-duration="1000">
    <div class="info_section">
    <div class="movie_header">
    <img class="locandina"
    src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}" />
    <div class="title_date">
    <h1>${obj.title}</h1>
    <h4>${obj.release_date}</h4>
    <span class="minutes">${obj.original_language.toUpperCase()}</span><!-- DURACION -->
    <p class="type">${ textoGeneros(obj.genre_ids) }</p>
    </div>
    </div>
    <div class="movie_desc">
    <p class="text">
    ${obj.overview}
    </p>
    </div>
    </div>
    <div
    style="background: url('https://image.tmdb.org/t/p/w500/${obj.poster_path}');" class="blur_back">
    <img src='https://image.tmdb.org/t/p/w500/${obj.poster_path}' alt=""></div>
    </div>
    `
  }
}
        
const generos = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  }
  // console.log(generos)
          
          
function textoGeneros(ids){
let generosTexto = [];

  ids.forEach(id => {
    generosTexto.push(generos[id])
    // console.log(generos[id])
  });
  // console.log(generosTexto);
  return generosTexto.join(" ")
}


/// Fetch GENEROS
function llamarAPIgeneros() {
  fetch(`${API_URL}/genre/movie/list?language=en`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      },
  })
  .then(response => response.json())
  .then(generos => console.log(generos));
}
llamarAPIgeneros();

//-------- BUSCADOR DE PELICULAS --------
//------- FETCH --------------------------------------
function llamarAPIbuscar(page) {
  
  fetch(`${API_URL}/movie/popular?language=en-US&page=${page}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  })
  .then(response => response.json())
  // .then(data => console.log(data);
  .then(data => {
    seEncontro += dibujarTarjetaBuscada(data)

    if (page == 9 & seEncontro == 0) {
      document.querySelector('.tendencias').innerHTML = `
      <div class="tendencias-cards"></div>
      <div id="noSeEncontro" data-aos="fade-down" data-aos-duration="1000"
                    class="alert alert-dark noSeEncontro" role="alert" style="display: block;">
                  No se encontró la pelicula.<br>
              </div>
    `;
    } else {
      document.getElementById('noSeEncontro').style.display = 'none';
    }
  });  
}
//------------------------------------------------------

//----- DIBUJAR BUSQUEDA -------------------------------
function dibujarTarjetaBuscada(resultadosPelis) {

  const filtro = resultadosPelis.results.filter(checkPeli);
  const tarjetas = filtro.map(obj => Tarjetas(obj));
  document.querySelector('.tendencias .tendencias-cards').innerHTML += tarjetas.join('');

  if (filtro.length == 0){
    return 0
  } else {
    return filtro.length;
  }
};

function checkPeli(resultado) {
  // return resultado.title.includes(buscardorPeli.value);
  return resultado.title.toLowerCase().includes(buscardorPeli.value) || resultado.title.includes(buscardorPeli.value);
}
function cambioValor() {
  buscardorPeli.value = buscardorPeli.value.charAt(0).toUpperCase() + buscardorPeli.value.slice(1)

  limpioTarjetas();
  for (let i = 1; i < 10; i++) {
    llamarAPIbuscar(i);  
  };
}

function limpioTarjetas() {
  document.querySelector('.tendencias').innerHTML = `
    <div class="tendencias-cards"></div>
    <div id="noSeEncontro" style="display: none;">
    `    ;
}
//------------------------------------------------------

//----- BUSQUEDA LISTENER ---------------------------------------
let seEncontro;
const buscardorPeli = document.getElementById('buscar');
const formBuscador = buscardorPeli.parentNode
formBuscador.addEventListener('submit', event => {
  event.preventDefault();
})

buscardorPeli.addEventListener('input', event => {
  event.preventDefault();
  seEncontro = 0;

  if(buscardorPeli.value === ''){
    limpioTarjetas();
    llamarAPItarjetas(paginaTarj);
  } else {
    limpioTarjetas();

    for (let i = 1; i < 10; i++) {
      llamarAPIbuscar(i);  
    };

  }

});
//-------------------------------------------------------

//----------- BOTONES ANTERIOR - SIGUIENTE ------------
// //* Funcion para cargar pagina siguiente
function cargarSigPagina() {
  paginaTarj++;
  llamarAPItarjetas(paginaTarj); // Fetch a la pagina correspondiente en la API
}

// //* Funcion para cargar pagina anterior
function cargarAntPagina() {
  if(paginaTarj > 1){
    paginaTarj--;
    llamarAPItarjetas(paginaTarj); // Fetch a la pagina correspondiente en la API
  }
}

// //* Event Listeners para botones
document.querySelector('.anterior').addEventListener('click', cargarAntPagina);
document.querySelector('.siguiente').addEventListener('click', cargarSigPagina);
//-----------------------------------------------

llamarAPItarjetas(paginaTarj);