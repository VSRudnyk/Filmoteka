import './sass/main.scss';
import MoviesApi from './js/api-requests';
import { moviesMarkUp } from './js/movies-grid';

const movies = new MoviesApi();

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  gallery.innerHTML = '';
  movies.query = searchQuery.value;
  movies.resetPage();
  movies.getPopularMovies().then(response => {
    console.log(response.data.results);
    moviesMarkUp(response.data.results);
  });
}
