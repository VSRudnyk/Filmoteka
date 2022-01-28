const libraryPage = document.querySelector('.library-link');

libraryPage.addEventListener('click', renderLibraryHeader);

function renderLibraryHeader(e) {
    e.preventDefault();

  document.querySelector('.search').classList.add('is-hidden');
  document.querySelector('.btn-section').classList.remove('is-hidden');
  document.querySelector('.btn-section').classList.add('btn-list');
  document.querySelector('.home-link').classList.remove('current');
  document.querySelector('.library-link').classList.add('current');
  document.querySelector('.header').classList.remove('header');
  document.querySelector('header').classList.add('header-library');
}


