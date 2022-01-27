const BASE_URL = 'https://api.themoviedb.org/3/';

const gallery = document.querySelector('.gallery');

export function moviesMarkUp(data) {
  const markUp = data
    .map(({ poster_path, title, genres }) => {
      return `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="" class="movie-poster" />
        <div class="movie-info">
            <p class="movie-title">${title}</p>
        <span class="genres">${genres}</span>
        </div>
      </div>`;
    })
    .join('');

  return gallery.insertAdjacentHTML('beforeend', markUp);
}
