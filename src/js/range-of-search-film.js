import MoviesApi from '../js/api-requests';
import debounce from 'debounce';
import getRefs from '../js/get-refs';
import movieDetailMarkUp from '../js/modal-movie-details';
import moviesMarkUp from '../js/movies-grid';
import onLoadPage from '../js/onStart';
import Pagination from 'tui-pagination';
import '../sass/layout/_pagination.scss';

const movies = new MoviesApi();
const refs = getRefs();

const pagination = new Pagination('pagination', {
  totalItems: 200,
  visiblePages: 5,
});

function paginationPopularMovies(evt) {
  const { page } = evt;
  movies.page = page;
  refs.gallery.innerHTML = '';
  movies.getPopularMovies().then(response => {
    moviesMarkUp(response.data.results);
  });
}

pagination.on('beforeMove', paginationPopularMovies);

refs.form.addEventListener('input', debounce(onInputRenderCard, 500));

function onInputRenderCard(e) {
  pagination.reset();
  e.preventDefault();
  movies.resetPage();
  pagination.off('beforeMove', paginationPopularMovies);

  const searchInput = refs.searchInput.value;
  if (searchInput === '') {
    onLoadPage();
    return;
  }

  refs.gallery.innerHTML = '';

  function paginationSearchMovies(evt) {
    refs.gallery.innerHTML = '';
    const { page } = evt;
    movies.page = page;
    movies.query = searchInput;
    movies.getSearchMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  }

  displayResults(searchInput, moviesMarkUp);

  pagination.on('beforeMove', paginationSearchMovies);
}

function displayResults(searchInput, callback) {
  movies.query = searchInput;

  movies.getSearchMovies().then(response => {
    callback(response.data.results);
  });
}
// refs.form.addEventListener('input', debounce(onInput, 500));
// refs.form.addEventListener('input', removeHiddenClass);

// function onInput(e) {
//   e.preventDefault();

//   const searchInput = refs.searchInput.value;
//   if (searchInput === '') {
//     refs.search.innerHTML = '';
//     return;
//   }

//   displayResults(searchInput, renderFilmList);

//   refs.search.addEventListener('click', onClickOpenModalWindow);
// }

// function onClickOpenModalWindow(e) {
//   e.preventDefault();

//   movies.id = e.target.dataset.id;

//   movies.getMoviesById().then(response => {
//     movieDetailMarkUp(response.data);
//   });
// }

// function renderFilmList(films) {
//   if (films.length > 0) {
//     handleRangeOfResults(films.slice(0, 5));
//     return;
//   }
// }

// function handleRangeOfResults(films) {
//   refs.search.innerHTML = '';

//   const fill = films
//     .map(film => {
//       return `<li class="search-item" data-id=${film.id}>${film.title} (${ film.release_date.slice(0, 4) })</li>`;
//     })
//     .join('');

//   return refs.search.insertAdjacentHTML('beforeend', fill);
// }

// function removeHiddenClass(e) {
//   e.preventDefault();
//   const {
//     elements: { searchQuery },
//   } = e.currentTarget;

//   refs.search.classList.remove('is-hidden');

//   if (searchQuery.value === '') {
//     refs.search.classList.add('is-hidden');
//     return;
//   }
// }