//----------- TARJETAS -------------------
//* Generos
//* /genre/movie/list?language=en
//* Popular
//* /movie/popular?language=en-US&page=${page}


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
    <div class="movie_card">
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

llamarAPItarjetas(1);

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
