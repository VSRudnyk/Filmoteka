import MoviesApi from '../js/api-requests';
import moviesMarkUp from '../js/movies-grid';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const movies = new MoviesApi();

export default function pagination() {
  const pagination = new Pagination('pagination', {
    totalItems: 5000,
    visiblePages: 7,
  });

  pagination.on('beforeMove', function (evt) {
    const { page } = evt;
    movies.page = page;
    movies.getPopularMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  });
}
