const slides = document.querySelector('.post__medias');
const slideImg = document.querySelectorAll('.post__medias .post__media');

const currentIdx = 0;
const slideCount = slideImg.length;

const prev = document.querySelector('.post__controller .post__controller-prev');
const next = document.querySelector('.post__controller .post__controller-next');


(function makeClone() {
    const cloneSlide_first = slides.firstElementChild.cloneNode(true);
    const cloneSlide_last = slides.lastElementChild.cloneNode(true);

    slides.append(cloneSlide_first)
    slides.insertBefore(cloneSlide_last, slides.firstElementChild);
})();

prev.addEventListener('click', function () {
    if (currentIdx <= slideCount - 1) {
        slides.style.left = -(currentIdx + 2) * (slideWidth + slideMargin) + 'px';
        slides.style.transition = `${0.5}s ease-out`;
    }

    if (currentIdx === slideCount - 1) {
        setTimeout(function () {
            slides.style.left = -(slideWidth + slideMargin) + 'px';
            slides.style.transition = `${0}s ease-out`;
        }, 500);
        currentIdx = -1;
    }
    currentIdx += 1;
})

next.addEventListener('click', function () {
    console.log('next')
})