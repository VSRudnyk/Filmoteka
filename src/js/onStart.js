import getRefs from './get-refs';
import MoviesApi from '../js/api-requests';
import moviesMarkUp from '../js/movies-grid';
import movieDetailMarkUp from '../js/modal-movie-details';
import buildSlider from '../js/slider';
import forModalTrailerRender from './modal-trailer';
import * as basicLightbox from 'basiclightbox';

import axios from 'axios';

const movies = new MoviesApi();
const refs = getRefs();

// функция прокрутки страницы по клику на кнопку "стрелка вверх"
arrowTop.onclick = function () {
  window.scrollTo({ pageXOffset, top: 0, behavior: 'smooth' });
  // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
};
window.addEventListener('scroll', function () {
  arrowTop.hidden = pageYOffset < document.documentElement.clientHeight;
});

export default function onStart() {
  refs.gallery.innerHTML = '';

  movies.resetPage();
  movies.getPopularMovies().then(response => {
    moviesMarkUp(response.data.results);
    getIdFromCards();
  });
  movies.getUpcomingMovies().then(response => {
    buildSlider(response.data.results);
  });
}

function onSearchMovieById() {
  movies.getMoviesById().then(response => {
    movieDetailMarkUp(response.data); // Модалка полной информации о фильме
  });
}

function getIdFromCards() {
  const moviePoster = document.querySelector('.gallery');
  moviePoster.addEventListener('click', e => {
    movies.id = e.target.dataset.id;
    onSearchMovieById();
    setTimeout(() => {
      onSearchTrailerById();
    }, 500);
  });
}

function onSearchTrailerById() {
  movies.getMoviesTrailer().then(response => {
    forModalTrailerRender(response.data.results);
  });
}
