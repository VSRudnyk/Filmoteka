import getRefs from '../js/get-refs';
import createGenresText from './genres/create-genres';

const refs = getRefs();

export default function moviesMarkUp(data) {
  const markUp = data
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      const genresToCards = createGenresText(genre_ids);
      const year = release_date.slice(0, 4);
      return `
      <div class="movie-card">
        <a class="movie-link">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" class="movie-poster" data-id="${id}"/>
        <div class="movie-info">
            <p class="movie-title">${title.toUpperCase()}</p>
            <div class="movie-genres-year-wrapper">
              <span class="movie-genres">${genresToCards}</span>
              <div class="movie-year-wrapper">
                <span class="movie-years">${year}</span>
              </div>
            </div>
        </div>
        </a>
      </div>`;
    })
    .join('');

  return refs.gallery.insertAdjacentHTML('beforeend', markUp);
}
