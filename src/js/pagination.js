import MoviesApi from '../js/api-requests';
import getRefs from './get-refs';
import moviesMarkUp from '../js/movies-grid';
import Pagination from 'tui-pagination';
import '../sass/layout/_pagination.scss';

const movies = new MoviesApi();
const refs = getRefs();

export default function pagination() {
  const pagination = new Pagination('pagination', {
    totalItems: 200,
    visiblePages: 5,
  });

  pagination.on('beforeMove', function pagPopMovies(evt) {
    const { page } = evt;
    movies.page = page;
    refs.gallery.innerHTML = '';
    movies.getPopularMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  });
}
