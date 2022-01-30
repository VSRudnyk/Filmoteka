import getRefs from '../js/get-refs';
import createGenresText from './genres/create-genres';

const refs = getRefs();

export default function moviesMarkUp(data) {
  const markUp = data
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      const genresToCards = createGenresText(genre_ids);
      return `
      <div class="movie-card">
        <a class="movie-link">
        <div class="movie-poster-wrapper">
          <img src="${setPoster(
            poster_path,
          )}" alt="" class="movie-card-img movie-poster" data-id="${id}"/>
        </div>
        <div class="movie-info">
            <p class="movie-title">${title.toUpperCase()}</p>
            <div class="movie-genres-year-wrapper">
              <span class="movie-genres">${genresToCards}</span>
              <div class="movie-year-wrapper">
                <span class="movie-years">${setReleaseDate(release_date)}</span>
              </div>
            </div>
        </div>
        </a>
      </div>`;
    })
    .join('');

  return refs.gallery.insertAdjacentHTML('beforeend', markUp);
}

function setPoster(poster) {
  if (poster === null) {
    return 'http://localhost:1234/no-poster-available.3d1fe546.jpeg';
  }

  return `https://image.tmdb.org/t/p/w500${poster}`;
}

function setReleaseDate(year) {
  if (year.length === 0) {
    return 'No release date available';
  }
  return year.slice(0, 4);
}
