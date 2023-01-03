
import { imageObserver } from "./observer/imageObserver.js";
import { postEndObserver } from "./observer/postEndObserver.js";
import { resizeObserver } from "./observer/resizeObserver.js";

function makeDummyMedia(dummyMediaCount) {
    function makeIndicator(post, mediaSlideCount) {
        const postIndicatorsElement = post.querySelector(`.post__indicators`);
        let elementString = '<li class="active">·</li>';
        for (let index = 1; index < mediaSlideCount; index++) {
            elementString += `<li>·</li>`
        }
        postIndicatorsElement.innerHTML = elementString;
        return postIndicatorsElement;
    }

    function renderSlideButton(mediaPrevButtonElement, mediaNextButtonElement, currentMediaIndex, mediaSlideCount) {
        mediaPrevButtonElement.style.opacity = currentMediaIndex === 0 ? 0 : 0.99;
        mediaNextButtonElement.style.opacity = currentMediaIndex === mediaSlideCount - 1 ? 0 : 0.99;
    }

    function filterIndicator(postIndicator, currentMediaIndex) {
        const indicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        indicator.classList.toggle('active');
    }

    function moveMediaSlide(post, nextMediaIndex, currentMediaIndex) {
        const mediaSlidesElement = post.querySelector(`.post__medias`);
        const mediaSlideWidth = mediaSlidesElement.children[0].clientWidth;

        currentMediaIndex = nextMediaIndex;
        mediaSlidesElement.style.setProperty('transform', `translateX(${-(currentMediaIndex * mediaSlideWidth)}px)`);

        return currentMediaIndex;
    }

    function render(post) {
        const mediaSlidesElement = post.querySelector(`.post__medias`);
        const mediaSlideImgElements = mediaSlidesElement.querySelectorAll('li');
        const mediaSlideCount = mediaSlideImgElements.length;

        mediaSlidesElement.style.width = `${mediaSlideWidth * mediaSlideCount}px`;

        const postIndicator = makeIndicator(post, mediaSlideCount);
        let currentMediaIndex = 0;

        const mediaPrevButtonElement = post.querySelector('.post__controller-prev');
        const mediaNextButtonElement = post.querySelector('.post__controller-next');

        renderSlideButton(mediaPrevButtonElement, mediaNextButtonElement, currentMediaIndex, mediaSlideCount);

        mediaPrevButtonElement.addEventListener('click', () => {
            if (currentMediaIndex !== 0) {
                filterIndicator(postIndicator, currentMediaIndex);
                currentMediaIndex = moveMediaSlide(post, currentMediaIndex - 1, currentMediaIndex)
                filterIndicator(postIndicator, currentMediaIndex);

                renderSlideButton(mediaPrevButtonElement, mediaNextButtonElement, currentMediaIndex, mediaSlideCount);
            }
        });

        mediaNextButtonElement.addEventListener('click', () => {
            if (currentMediaIndex !== (mediaSlideCount - 1)) {
                filterIndicator(postIndicator, currentMediaIndex);
                currentMediaIndex = moveMediaSlide(post, currentMediaIndex + 1, currentMediaIndex)
                filterIndicator(postIndicator, currentMediaIndex);

                renderSlideButton(mediaPrevButtonElement, mediaNextButtonElement, currentMediaIndex, mediaSlideCount);
            }
        })

        return post;
    }

    const posts = document.querySelector('.posts');
    const mediaSlideWidth = 582;

    for (let index = 0; index < dummyMediaCount; index++) {
        const post = render(posts.firstElementChild.cloneNode(true));
        imageObserver(post);
        posts.appendChild(post);
    }
};



const posts = document.querySelector('.posts');
postEndObserver(makeDummyMedia);
imageObserver(posts);
resizeObserver(posts);

