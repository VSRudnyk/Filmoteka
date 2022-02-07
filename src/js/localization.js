import i18next from 'i18next';
import moviesMarkUp from '../js/movies-grid';
import MoviesApi from '../js/api-requests';
import getRefs from './get-refs';

const movies = new MoviesApi();
const refs = getRefs();

refs.gallery.addEventListener('click', onMovieCardClick);
function onMovieCardClick(e) {
  setTimeout(() => {
    const modalItems = document.querySelectorAll('.modal-card [data-key]');
    modalItems.forEach(translateElement);
  }, 250);
}

i18next.init(
  {
    lng: localStorage.getItem('lang'),
    debug: true,
    resources: {
      'en-US': {
        translation: {
          home: 'Home',
          'my-library': 'My library',
          'log-in': 'Log in',
          'log-out': 'Log out',
          watched: 'Watched',
          queue: 'Queue',
          'soon-in-theaters': 'soon in theaters',
          rights: '| All rights reserved |',
          developed: 'Developed with',
          students: 'by GoIT Students',
          vote: 'Vote / Vote',
          about: 'About',
          genre: 'Genre',
          popularity: 'Popularity',
          'original-title': 'Original title',
        },
      },
      'uk-UA': {
        translation: {
          home: 'Головна',
          'my-library': 'Бібліотека',
          'log-in': 'Вхід',
          'log-out': 'Вихід',
          watched: 'Переглянуті',
          queue: 'Обране',
          'soon-in-theaters': 'скоро в кінотеатрах',
          rights: '| Всі права захищені |',
          developed: 'Розроблено',
          students: 'Студентами GoIT',
          vote: 'Оцінка / Проголосувало',
          about: 'Опис',
          genre: 'Жанр',
          popularity: 'Популярність',
          'original-title': 'Оригінальна назва',
        },
      },
      'ru-RU': {
        translation: {
          home: 'Главная',
          'my-library': 'Библиотека',
          'log-in': 'Вход',
          'log-out': 'Выход',
          watched: 'Просмотренные',
          queue: 'Избранное',
          'soon-in-theaters': 'скоро в кинотеатрах',
          rights: '| Все права защищены |',
          developed: 'Разработано',
          students: 'Студентами GoIT',
          vote: 'Оценка / Проголосовало',
          about: 'Описание',
          genre: 'Жанр',
          popularity: 'Популярность',
          'original-title': 'Оригинальное название',
        },
      },
    },
  },
  function (err, t) {
    if (!localStorage.getItem('lang')) {
      i18next.changeLanguage('en-US');
    }
    updateContent();
    bindLocaleSwitcher();
  },
);

function updateContent() {
  document.querySelectorAll('[data-key]').forEach(translateElement);
}
function translateElement(element) {
  const key = element.getAttribute('data-key');
  element.innerText = i18next.t(key);
}
function bindLocaleSwitcher() {
  const switcher = document.querySelector('[data-switcher]');
  switcher.value = i18next.language;
  switcher.onchange = e => {
    changeLng(e.target.value);
    refs.gallery.innerHTML = '';
    movies.resetPage();
    movies.getPopularMovies().then(response => {
      moviesMarkUp(response.data.results);
    });
  };
}
function changeLng(lng) {
  i18next.changeLanguage(lng);
  localStorage.setItem('lang', lng);
}

i18next.on('languageChanged', () => {
  updateContent();
});
