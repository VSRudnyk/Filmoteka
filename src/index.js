import './sass/main.scss';
import getRefs from './js/get-refs';
import MoviesApi from './js/api-requests';
import moviesMarkUp from './js/movies-grid';
import movieDetailMarkUp from './js/modal-movie-details';

const movies = new MoviesApi();
const refs = getRefs();

refs.form.addEventListener('submit', onFormSubmit);

function onStart() {
  refs.gallery.innerHTML = '';

  movies.resetPage();
  movies.getPopularMovies().then(response => {
    moviesMarkUp(response.data.results);
    getIdFromCards();
  });
}

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  refs.gallery.innerHTML = '';
  movies.query = searchQuery.value;

  movies.resetPage();
  movies.getSearchMovies().then(response => {
    moviesMarkUp(response.data.results);
  });
}

function onSearchMovieById() {
  movies.getMoviesById().then(response => {
    console.log(response.data);
    movieDetailMarkUp(response.data); // Модалка полной информации о фильме
  });
}

onStart();

function getIdFromCards() {
  const moviePoster = document.querySelector('.gallery');
  moviePoster.addEventListener('click', e => {
    movies.id = e.target.dataset.id;
    onSearchMovieById();
  });
}
