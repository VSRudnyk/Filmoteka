const refs = {
  libraryBtnEl: document.querySelector('.library-link'),
  galleryEl: document.querySelector('.gallery'),
};

function onLibraryBtnActive(string) {
  refs.galleryEl.innerHTML = string;
}

refs.libraryBtnEl.addEventListener('click', () => {
  onLibraryBtnActive('<p>There may be library</p>');
});
