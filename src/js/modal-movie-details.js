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
  //   const markUp = `
  //       <div class="modal-container">
  //         <button type="button" class="btn-close"> X
  //           <!-- <svg class="modal__button-icon" width="14" height="14">
  //           <use href="./images/close.svg"></use>
  //           </svg> -->
  //         </button>
  //         <div class="modal-card">
  //           <div class="modal-image">
  //             <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="movie-poster" class="movie-poster" />
  //           </div>
  //           <div class="modal-info">
  //             <h2 class="modal-info-title">${title}</h2>
  //               <ul class="modal-info-list">
  //                <li class="modal-info-item">Vote / Votes
  //                <span class="modal-info-data">${vote_average} / ${vote_count}</span>
  //                </li>
  //                <li class="modal-info-item">Popularity
  //                <span class="modal-info-data">${popularity}</span></li>
  //                <li class="modal-info-item">Original Title
  //                <span class="modal-info-data">${original_title}</span></li>
  //                <li class="modal-info-item">Genre
  //                <span class="modal-info-data">${allGenres}</span></li>
  //               </ul>
  //               <h3 class="modal-about">ABOUT</h3>
  //               <p class="modal-info-about">${overview}</p>
  //         <button type="button" class="button-add active">add to Watched</button>
  //         <button type="button" class="button-add">add to queue</button>
  //           </div>
  //         </div>
  //       </div>
  //     `;
  //   return refs.gallery.insertAdjacentHTML('afterbegin', markUp);
  // }

  const instance = basicLightbox.create(
    `
    <div class="modal modal-container">
      <button type="button" class="btn-close"> X
        <!-- <svg class="modal__button-icon" width="14" height="14">
        <use href="./images/close.svg"></use>
        </svg> -->
      </button>
      <div class="modal-card">
        <div class="modal-image">
          <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="movie-poster" class="movie-poster" />
        </div>
        <div class="modal-info">
          <h2 class="modal-info-title">${title}</h2>
            <ul class="modal-info-list">
             <li class="modal-info-item">Vote / Votes
             <span class="modal-info-data">${vote_average} / ${vote_count}</span>
             </li>
             <li class="modal-info-item">Popularity
             <span class="modal-info-data">${popularity}</span></li>
             <li class="modal-info-item">Original Title
             <span class="modal-info-data">${original_title}</span></li>
             <li class="modal-info-item">Genre
             <span class="modal-info-data">${allGenres}</span></li>
            </ul>
            <h3 class="modal-about">ABOUT</h3>
            <p class="modal-info-about">${overview}</p>
      <button type="button" class="button-add active">add to Watched</button>
      <button type="button" class="button-add">add to queue</button>
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
  return refs.gallery.insertAdjacentHTML('afterbegin', markUp);
}
