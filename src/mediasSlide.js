import debounce from "./utils/debounce.js";

(function makeDummyMedia(dummyMediaCount) {
    const posts = document.querySelector('.posts');

    let elementString = '';
    for (let index = 0; index < dummyMediaCount; index++) {
        elementString += `
        <li>
            <article class="post">
                <div class="post__header">
                    <div class="post__profile">
                        <a href="" target="_blank" class="post__avatar">
                            <img src="assets/images/avatar.png" alt="user picture" />
                        </a>
                        <a href="" target="_blank" class="post__user">user</a>
                    </div>

                    <button class="post__more-options">
                        <img src="assets/icons/more.svg" alt="more" />
                    </button>
                </div>

                <div class="post__content" id="post__content">
                    <ul class="post__medias" id="post__medias">
                        <li><img class="post__media" src="assets/images/picture.jpeg" alt="Post Content" /></li>
                        <li><img class="post__media" src="assets/images/picture.jpeg" alt="Post Content" /></li>
                        <li><img class="post__media" src="assets/images/picture.jpeg" alt="Post Content" /></li>
                        <li><img class="post__media" src="assets/images/picture.jpeg" alt="Post Content" /></li>
                        <li><img class="post__media" src="assets/images/picture.jpeg" alt="Post Content" /></li>
                    </ul>

                    <div class="post__controller">
                        <span class="post__controller-prev">
                            <img src="assets/icons/arrow.svg">
                        </span>
                        <span class="post__controller-next">
                            <img src="assets/icons/arrow.svg">
                        </span>
                    </div>
                </div>

                <div class="post__footer">
                    <div class="post__buttons">
                        <button class="post__button">
                            <img src="assets/icons/heart.svg" alt="heart" />
                        </button>
                        <button class="post__button">
                            <img src="assets/icons/comment.svg" alt="comment" />
                        </button>

                        <ul class="post__indicators" id="post__indicators"></ul>

                        <button class="post__button post__button--align-right">
                            <img src="assets/icons/bookmark.svg" alt="bookmark" />
                        </button>
                    </div>

                    <div class="post__infos">
                        <div class="post__likes">
                            <a href="#" class="post__likes-avatar">
                                <img src="assets/images/avatar.png" alt="user picture" />
                            </a>

                            <span>Liked by
                                <a class="post__name--underline" href="#">user1</a> and
                                <a href="#">33 others</a>
                            </span>
                        </div>

                        <div class="post__description">
                            <span>
                                <a class="post__name--underline" href="" target="_blank">user</a>
                                description
                            </span>
                        </div>

                        <span class="post__date-time">30 minutes ago</span>
                    </div>
                </div>
            </article>
        </li>
        `
    }
    posts.innerHTML = elementString;
})(5)


const render = () => {
    const postsElement = document.querySelector('.posts');
    const postListElements = Array.prototype.slice.call(postsElement.children);

    const makeIndicator = (post, mediaSlideCount) => {
        const postIndicatorsElement = post.querySelector(`.post__indicators`);
        let elementString = '';
        for (let index = 0; index < mediaSlideCount; index++) {
            elementString += `<li><img src="assets/icons/indicator.svg" alt="indicator"/></li>`
        }
        postIndicatorsElement.innerHTML = elementString;
        return postIndicatorsElement;
    }

    const renderSlideButton = (mediaPrevButtonElement, mediaNextButtonElement, currentMediaIndex, mediaSlideCount) => {
        mediaPrevButtonElement.style.opacity = currentMediaIndex === 0 ? 0 : 100;
        mediaNextButtonElement.style.opacity = currentMediaIndex === mediaSlideCount - 1 ? 0 : 100;
    }

    const filterIndicator = (postIndicator, currentMediaIndex) => {
        const indicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        indicator.classList.toggle('active');
    }

    const getCurrentMediaIndex = (post) => {
        const postIndicatorsElement = post.querySelector(`.post__indicators`);
        const indicators = Array.prototype.slice.call(postIndicatorsElement.children);

        for (let index = 0; index < indicators.length; index++) {
            if (indicators[index].className === "active") return index;
        }
    }

    const moveMediaSlide = (post, nextMediaIndex, currentMediaIndex) => {
        const postContentElement = post.querySelector(`.post__content`);
        const mediaSlideWidth = postContentElement.clientWidth;

        const mediaSlidesElement = post.querySelector(`.post__medias`);

        currentMediaIndex = nextMediaIndex;
        mediaSlidesElement.style.setProperty('transform', `translateX(${-(currentMediaIndex * mediaSlideWidth)}px)`);

        return currentMediaIndex;
    }

    postListElements.forEach(post => {
        const mediaSlidesElement = post.querySelector(`.post__medias`);
        const mediaSlideImgElements = mediaSlidesElement.querySelectorAll('li');
        const mediaSlideCount = mediaSlideImgElements.length;

        const postContentElement = post.querySelector(`.post__content`);
        const mediaSlideWidth = postContentElement.clientWidth;

        mediaSlidesElement.style.width = `${mediaSlideWidth * mediaSlideCount}px`;


        const postIndicator = makeIndicator(post, mediaSlideCount);

        let currentMediaIndex = 0;

        const mediaPrevButtonElement = postContentElement.querySelector('.post__controller-prev');
        const mediaNextButtonElement = postContentElement.querySelector('.post__controller-next');

        renderSlideButton(mediaPrevButtonElement, mediaNextButtonElement, currentMediaIndex, mediaSlideCount);
        filterIndicator(postIndicator, currentMediaIndex);

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
    })

    return function rerender() {
        postListElements.forEach(post => {
            const mediaSlidesElement = post.querySelector(`.post__medias`);
            const mediaSlideImgElements = mediaSlidesElement.querySelectorAll('li');
            const mediaSlideCount = mediaSlideImgElements.length;

            const postContentElement = post.querySelector(`.post__content`);
            const mediaSlideWidth = postContentElement.clientWidth;

            const currentMediaIndex = getCurrentMediaIndex(post);

            mediaSlidesElement.style.width = `${mediaSlideWidth * mediaSlideCount}px`;
            mediaSlidesElement.style.setProperty('transform', `translateX(${-(currentMediaIndex * mediaSlideWidth)}px)`);
        });
    }
}

const rerender = render();

window.addEventListener("resize", debounce(function (e) {
    rerender();
}));