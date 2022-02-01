import getRefs from '../js/get-refs';
import moviesMarkUp from './movies-grid';
import modalMovieDetails from './modal-movie-details';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = getRefs();

const pageSwitcherRefs = {
  watchedBtnEl: document.querySelector('.btn-watched'),
  queueBtnEl: document.querySelector('.btn-queue'),
};

console.log(pageSwitcherRefs)
function loadFromLocaleStorage (key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: Error");
  }
};


function processingData (category) {
  const dataFromLocStore = loadFromLocaleStorage(category);

  const dataVsGenresModify = dataFromLocStore.map(item => {

    item.genre_ids = item.genres.map(elem => elem.id);
    
    return item;
  });

  return dataVsGenresModify;  
};


















function onLibraryBtnActive(string) {

  refs.gallery.innerHTML = '';


  pageSwitcherRefs.watchedBtnEl.classList.remove('library-btn-active');
  pageSwitcherRefs.queueBtnEl.classList.remove('library-btn-active');

  const libraryData = [...processingData('watched'),...processingData('queue')];
  if (libraryData.length === 0) {
    setTimeout(() => Notify.info('Your library is still empty.'), 250);
    return;
  };   
  moviesMarkUp(libraryData);
}

function onWatchedBtnClick () {
  refs.gallery.innerHTML = '';


  pageSwitcherRefs.watchedBtnEl.classList.add('library-btn-active');
  pageSwitcherRefs.queueBtnEl.classList.remove('library-btn-active');



  moviesMarkUp(processingData('watched'));
};

function onQueueBtnClick () {
  refs.gallery.innerHTML = '';
  pageSwitcherRefs.queueBtnEl.classList.add('library-btn-active');
  pageSwitcherRefs.watchedBtnEl.classList.remove('library-btn-active');
  moviesMarkUp(processingData('queue'));
};




refs.libraryPage.addEventListener('click', () => {
  onLibraryBtnActive();
});

pageSwitcherRefs.watchedBtnEl.addEventListener('click', () => {
  onWatchedBtnClick();
});


pageSwitcherRefs.queueBtnEl.addEventListener('click', () => {
  onQueueBtnClick();
});



function onModalBtnWatchedFromPageSwitcher () {
  const active = {
    library: refs.libraryPage.classList.contains('current'),
    watched: pageSwitcherRefs.watchedBtnEl.classList.contains('library-btn-active'),
    queue: pageSwitcherRefs.queueBtnEl.classList.contains('library-btn-active'),
  };



    if(active.library && active.watched) {
      onWatchedBtnClick();
    } else if (active.library && !active.watched && !active.queue) {
      onLibraryBtnActive();
    } else if (active.library && active.queue) {
      onQueueBtnClick();
    }
  };

function onModalBtnQueueFromPageSwitcher () {
  const active = {
    library: refs.libraryPage.classList.contains('current'),
    watched: pageSwitcherRefs.watchedBtnEl.classList.contains('library-btn-active'),
    queue: pageSwitcherRefs.queueBtnEl.classList.contains('library-btn-active'),
  };


    if(active.library && active.queue) {
      onQueueBtnClick();
    } else if (active.library && !active.watched && !active.queue) {
      onLibraryBtnActive();
    } else if (active.library && active.watched) {
      onWatchedBtnClick();
    };
  } 

  export { onModalBtnWatchedFromPageSwitcher, onModalBtnQueueFromPageSwitcher };