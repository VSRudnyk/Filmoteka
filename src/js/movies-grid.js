import getRefs from '../js/get-refs';
import createGenresText from './genres/create-genres';

const refs = getRefs();

export default function moviesMarkUp(data) {
  const markUp = data
    .map(({ poster_path, title, genre_ids, release_date, id, vote_average: rating }) => {
      const genresToCards = createGenresText(genre_ids);
      return `
      <div class="movie-card">
       <div class="movie-card__hover">
         <a class="movie-link">
        
        <div class="movie-poster-wrapper">
          <span class="movie-rating-wrapper">            
            <div class="movie-rating">${rating}</div>
          </span>
          <img src="${setPoster(
            poster_path,
          )}" alt="" class="movie-card-img movie-poster" data-id="${id}" loading="lazy"/>
        </div>
        <div class="movie-info">
            <p class="movie-title">${trimTitle(title)}</p>
            <div class="movie-genres-year-wrapper">
              <span class="movie-genres">${genresToCards}</span>
              <div class="movie-year-wrapper">
                <span class="movie-years">${setReleaseDate(release_date)}</span>
              </div>
            </div>
        </div>
        </a>
       </div>
      </div>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markUp);
  // refs.goUpBtn.style = 'display: block';
}

function setPoster(poster) {
  if (poster === null) {
    return 'https://wipfilms.net/wp-content/data/posters/tt0338683.jpg';
  }

  return `https://image.tmdb.org/t/p/original${poster}`;
}

function setReleaseDate(year) {
  if (!year) {
    return 'No release date available';
  }
  return year.slice(0, 4);
}
function trimTitle(title) {
  if (title.length > 40) {
    return `${title.toUpperCase().substring(0, 37)} <span class="open-title">. . .</span>`;
  }
  return title.toUpperCase();
}
