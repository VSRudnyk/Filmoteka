import * as basicLightbox from 'basiclightbox'

export default function TrailerRender(data) {

        const btnModalTrailer = document.querySelector('.btn-open-trailer');  
        btnModalTrailer.style.cursor = "pointer"    
        
        const instance = basicLightbox.create(`
                <div class="modal">
                        <iframe width="640" height="480" frameborder="0" allowfullscreen 
                                src="https://www.youtube.com/embed/${data[0].key}?autoplay=1&mute=1" >
                        </iframe>
                </div>
        `
//, {
//     onShow: (instance) => {
//         instance.element().querySelector('a').onclick = instance.close
//     }
//}
);
        btnModalTrailer.addEventListener('click', () => {
                instance.show()
        });
}

