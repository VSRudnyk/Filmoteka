import getRefs from '../js/get-refs';
import { tns } from 'tiny-slider/src/tiny-slider';

const refs = getRefs();

export default function buildSlider(d) {
  d.map(el => {
    const { poster_path } = el;
    const imgSlider = `<div class="slider__item"><img src="${setPoster(
      poster_path,
    )}" alt="" width="120" height="150"/></div>`;
    return refs.slider.insertAdjacentHTML('beforeend', imgSlider);
  });

  const slider = tns({
    container: '.slider',
    items: 6,
    controlsContainer: '.slider',
    navContainer: false,
    navAsThumbnails: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButton: false,
    autoplayButtonOutput: false,
    swipeAngle: false,
    speed: 1000,
    nav: false,
    autoplayHoverPause: true,
  });

  return slider.play();
}

function setPoster(poster) {
  if (poster === null) {
    return 'https://wipfilms.net/wp-content/data/posters/tt0338683.jpg';
  }

  return `https://image.tmdb.org/t/p/w500${poster}`;
}
