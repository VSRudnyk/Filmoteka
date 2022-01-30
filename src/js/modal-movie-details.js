import getRefs from '../js/get-refs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';
// const instance = basicLightbox.create(`
//     <div class="modal">
//         <p>
//             Your first lightbox with just a few lines of code.
//             Yes, it's really that simple.
//         </p>
//     </div>
// `);
// instance.show();
const refs = getRefs();
let watched = [];
const queue = [];
let btnWatchedRender = '';
let btnQueueRender = '';

export default function movieDetailMarkUp(data) {
  const {
    genres,
    title,
    vote_average,
    vote_count,
    poster_path,
    popularity,
    original_title,
    overview,
  } = data;
  const allGenres = genres.map(genre => genre.name).join(', ');

  if (watched.findIndex(obj => obj.id === data.id) !== -1) {
    btnWatchedRender =
      '<button type="button" class="button-add wathed active pressed">remove on Watched</button>';
  } else {
    btnWatchedRender =
      '<button type="button" class="button-add wathed active">add to Watched</button>';
  }
  if (queue.findIndex(obj => obj.id === data.id) !== -1) {
    btnQueueRender =
      '<button type="button" class="button-add queue pressed">remove on queue</button>';
  } else {
    btnQueueRender = '<button type="button" class="button-add queue">add to queue</button>';
  }
  const instance = basicLightbox.create(
    `
    <div class="modal modal-container">
           <button type="button" class="btn-close">
            <!-- <svg class="modal__button-icon" width="14" height="14"> -->
                <!-- <use href="./images/sprite.svg#icon-close"></use> -->
             <!-- </svg> -->
              X
           </button>
           <div class="modal-card">
        <div class="modal-image">
          <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="movie-poster" class="movie-poster" />
        </div>
        <div class="modal-info">
          <h2 class="modal-info-title">${title}</h2>
           <table>
        <tr>
          <th class="info-table-td">Vote / Votes</td>
          <td> <span class="info-table-vote_average">${vote_average}</span>    /   <span class="info-table-vote_average"> ${vote_count} </span></td>
        </tr>
        <tr>
          <th class="info-table-td">Popularity</td>
          <td>${popularity}</td>
        </tr>
        <tr>
          <th class="info-table-td">Original Title</td>
          <td class="info-table-original_title" valign="bottom">${original_title}</td>
        </tr>
        <tr>
          <th class="info-table-td">Genre</td>
          <td>${allGenres}</td>
        </tr>
      </table>
            <h3 class="modal-about">ABOUT</h3>
            <p class="modal-info-about">${overview}</p>
      ${btnWatchedRender}
      ${btnQueueRender}
        </div>
      </div>
    </div>
  `,
    {
      onShow: instance => {
        instance.element().querySelector('.btn-close').onclick = instance.close;
      },
    },
  );
  instance.show();

  const btnAddWatched = document.querySelector('.wathed');
  const btnAddQueue = document.querySelector('.queue');

  btnAddWatched.addEventListener('click', e => {
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = 'add to watched';
      watched.splice(
        watched.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('watched', JSON.stringify(watched));
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = 'remove on watched';
      watched.push(data);
      localStorage.setItem('watched', JSON.stringify(watched));
    }
  });

  btnAddQueue.addEventListener('click', e => {
    if (e.target.classList.contains('pressed')) {
      e.target.classList.remove('pressed');
      e.target.textContent = 'add to queue';
      queue.splice(
        queue.findIndex(obj => obj.id === data.id),
        1,
      );
      localStorage.setItem('queue', JSON.stringify(queue));
    } else {
      e.target.classList.add('pressed');
      e.target.textContent = 'remove on queue';
      queue.push(data);
      localStorage.setItem('queue', JSON.stringify(queue));
    }
  });

  // return refs.gallery.insertAdjacentHTML('afterbegin', markUp);
}
