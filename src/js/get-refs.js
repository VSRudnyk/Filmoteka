export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnAddWatched: document.querySelector('.watched'),
    btnAddQueue: document.querySelector('.queue'),
  };
}
