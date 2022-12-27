const slides = document.querySelector('.post__medias');
const slideImg = document.querySelectorAll('.post__medias li');

const postContent = document.querySelector('.post__content');


let currentIdx = 0;
const slideCount = slideImg.length;
const slideWidth = postContent.clientWidth;


(function initfunction() {
    slides.style.width = slideWidth * slideCount + 'px';
    slides.style.left = 0 + 'px';
})();

const moveSlide = (num) => {
    slides.style.left = -num * slideWidth + 'px';
    currentIdx = num;
}

const prev = document.querySelector('.post__controller .post__controller-prev');

prev.addEventListener('click', function () {
    if (currentIdx !== 0) moveSlide(currentIdx - 1);
});

const next = document.querySelector('.post__controller .post__controller-next');

next.addEventListener('click', function () {
    if (currentIdx !== slideCount - 1) moveSlide(currentIdx + 1);
})