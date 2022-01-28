import getRefs from '../js/get-refs';

const refs = getRefs();

export default function movieDetailMarkUp(data) {
  const { genres, title, vote_average, poster_path, popularity, original_title, overview } = data;
  const allGenres = genres.map(genre => genre.name).join(', ');
  const markUp = `
    <div class="container">
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="" class="movie-poster" />
        <div class="movie-info">
            <p class="movie-title">${title}</p>
            <p class="movie-title">${vote_average}</p>
            <p class="movie-title">${popularity}</p>
            <p class="movie-title">${original_title}</p>
            <p class="movie-title">${overview}</p>
        <span class="genres">${allGenres}</span>
        </div>
      </div>
    </div>
  `;

  return refs.gallery.insertAdjacentHTML('beforeend', markUp);
}
