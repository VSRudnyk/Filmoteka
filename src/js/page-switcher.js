import startFunction from './onStart';

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery')
}  


refs.formEl.insertAdjacentHTML("beforeend", `
<ul class="navigation-buttons list" style="display:flex; align-items: center; margin-left: 10px">
    <li class="navigation-buttons__item" style="margin-right: 10px">
      <button class="navigation-btn btn-home active" type="button">home</button>
    </li>
    <li class="navigation-buttons__item">
      <button class="navigation-btn btn-library" type="button">my library</button>
    </li>
</ul>
`);






const homeBtnEl = document.querySelector('.btn-home');
const libraryBtnEl = document.querySelector('.btn-library');
console.log(homeBtnEl)
console.log(libraryBtnEl)

function onHomeBtnActive () {
     if (!homeBtnEl.classList.contains('active')) {
        startFunction();
        homeBtnEl.classList.add('active');
        libraryBtnEl.classList.remove('active');
    }
};

function onLibraryBtnActive (string) {
    if (!libraryBtnEl.classList.contains('active')) {
        refs.galleryEl.innerHTML = string;
        homeBtnEl.classList.remove('active');
        libraryBtnEl.classList.add('active');
    }
};


homeBtnEl.addEventListener('click', () => {
    
    onHomeBtnActive('');
});


libraryBtnEl.addEventListener('click', () => {
    
    onLibraryBtnActive('');
});