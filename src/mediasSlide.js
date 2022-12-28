const mediaSlides = document.querySelector('.post__medias');
const mediaSlideImg = mediaSlides.querySelectorAll('.post__medias li');

const postContent = document.querySelector('.post__content');

let currentMediaIndex = 0;
const mediaSlideCount = mediaSlideImg.length;
const mediaSlideWidth = postContent.clientWidth;

(function initFunction() {
    mediaSlides.style.width = mediaSlideWidth * mediaSlideCount + 'px';
    mediaSlides.style.left = 0 + 'px';
})();

const moveMediaSlide = (num) => {
    mediaSlides.style.left = -num * mediaSlideWidth + 'px';
    currentMediaIndex = num;
}

const mediaPrevButton = document.querySelector('.post__controller .post__controller-prev');

mediaPrevButton.addEventListener('click', function () {
    if (currentMediaIndex !== 0) moveMediaSlide(currentMediaIndex - 1);
});

const mediaNextButton = document.querySelector('.post__controller .post__controller-next');

mediaNextButton.addEventListener('click', function () {
    if (currentMediaIndex !== mediaSlideCount - 1) moveMediaSlide(currentMediaIndex + 1);
})