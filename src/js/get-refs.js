export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnAddWatched: document.querySelector('.watched'),
    btnAddQueue: document.querySelector('.queue'),
    libraryPage: document.querySelector('.library-link'),
    btnSectionInLibrary: document.querySelector('.btn-section'),
    homePage: document.querySelector('.home-link'),
    headerByClass: document.querySelector('.header'),
    headerByTeg: document.querySelector('header'),
  };
}
