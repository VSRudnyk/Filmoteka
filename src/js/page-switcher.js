import getRefs from '../js/get-refs';
import moviesMarkUp from './movies-grid';

const refs = getRefs();

const pageSwitcherRefs = {
  watchedBtnEl: document.querySelector('.btn-watched'),
  queueBtnEl: document.querySelector('.btn-queue'),
};


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
  const libraryData = [...processingData('watched'),...processingData('queue')];
  moviesMarkUp(libraryData);
}

function onWatchedBtnClick () {
  refs.gallery.innerHTML = '';
  moviesMarkUp(processingData('watched'));
};

function onQueueBtnClick () {
  refs.gallery.innerHTML = '';
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