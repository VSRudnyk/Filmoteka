import getRefs from './get-refs';
import MoviesApi from '../js/api-requests';
import moviesMarkUp from '../js/movies-grid';
import movieDetailMarkUp from '../js/modal-movie-details';
import buildSlider from '../js/slider';
import * as basicLightbox from 'basiclightbox';
import pagination from './pagination';

const movies = new MoviesApi();
const refs = getRefs();

export default function onStart() {
  refs.gallery.innerHTML = '';

  movies.resetPage();
  movies.getPopularMovies().then(response => {
    buildSlider(response.data.results);
    moviesMarkUp(response.data.results);
    getIdFromCards();
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
  });
}

pagination();

// function clearModalContainer() {
//   refs.gallery.innerHTML = '';
// }
