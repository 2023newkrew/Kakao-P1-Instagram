import debounce from "./utils/debounce.js";
import { imageObserver } from "./utils/imageObserver.js";

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

    function getCurrentMediaIndex(post) {
        const postIndicatorsElement = post.querySelector(`.post__indicators`);
        const indicators = Array.prototype.slice.call(postIndicatorsElement.children);

        for (let index = 0; index < indicators.length; index++) {
            if (indicators[index].className === "active") return index;
        }
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

    function resizeObserver(posts) {
        const resizeObserver = new ResizeObserver(debounce((entries) => {
            const target = Array.prototype.slice.call(entries[0].target.children);
            rerender(target);
        }, 200));

        resizeObserver.observe(posts);
    }

    function rerender(postListElements) {
        const postContentElement = document.querySelector(`.post__content`);
        const mediaSlideWidth = postContentElement.clientWidth;

        postListElements.forEach(post => {
            if (post.className !== 'postEnd') {
                const mediaSlidesElement = post.querySelector(`.post__medias`);
                const mediaSlideImgElements = mediaSlidesElement.querySelectorAll('li');
                const mediaSlideCount = mediaSlideImgElements.length;

                const currentMediaIndex = getCurrentMediaIndex(post);

                mediaSlidesElement.style.width = `${mediaSlideWidth * mediaSlideCount}px`;
                mediaSlidesElement.style.setProperty('transform', `translateX(${-(currentMediaIndex * mediaSlideWidth)}px)`);
            }
        });
    }

    const posts = document.querySelector('.posts');
    const mediaSlideWidth = 582;

    resizeObserver(posts);

    for (let index = 0; index < dummyMediaCount; index++) {
        const post = render(posts.firstElementChild.cloneNode(true));
        imageObserver(post);
        posts.appendChild(post);
    }
};


const observer = new IntersectionObserver(debounce((entries) => {
    if (entries[0].isIntersecting && Math.floor(entries[0].intersectionRatio) === 1) {
        makeDummyMedia(2);
    }
}, 200), { threshold: 1 })


const postEnd = document.querySelector('.postEnd');
observer.observe(postEnd)
