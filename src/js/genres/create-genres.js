import allGenres from '../genres/genres.json';

function genresArreyTrend(genre_ids, allGenres) {
  return genre_ids.map(id => allGenres.genres.filter(element => element.id === id)).flat();
}

export default function createGenresText(genre_ids) {
  const genresToCards = [];

  const genresArray = genresArreyTrend(genre_ids, allGenres);
  for (let genre of genresArray) {
    genresToCards.push(genre.name);
  }
  if (genresToCards.length < 2) {
    return genresToCards.join(', ');
  } else {
    return genresToCards.slice(0, 2).join(', ') + ', ' + 'Other';
  }
}
