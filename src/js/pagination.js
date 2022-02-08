import Pagination from 'tui-pagination';
import MoviesApi from '../js/api-requests';
import moviesMarkUp from './movies-grid';
import getRefs from '../js/get-refs';

const movies = new MoviesApi();
const refs = getRefs();

export default function createPagination(total_results) {
  const container = document.getElementById('tui-pagination-container');
  const options = {
    totalItems: total_results,
    itemsPerPage: 20,
    visiblePages: 3,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const pagination = new Pagination(container, options);

  pagination.on('afterMove', function (eventData) {
    refs.gallery.innerHTML = '';
    movies.page = eventData.page;
    movies.getPopularMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  });
}
