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

                <div class="post__content #${index}" id="post__content #${index}">
                    <ul class="post__medias #${index}" id="post__medias #${index}">
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

                        <ul class="post__indicators ${index}" id="post__indicators ${index}"></ul>

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

const posts = document.querySelector('.posts');
const postList = Array.prototype.slice.call(posts.children);

function render() {
    const makeIndicator = (index, mediaSlideImg) => {
        const postIndicator = document.getElementById(`post__indicators ${index}`);
        let elementString = '';
        for (let index = 0; index < mediaSlideImg.length; index++) {
            elementString += `<li><img src="assets/icons/indicator.svg"</li>`
        }
        postIndicator.innerHTML = elementString;
        return postIndicator;
    }

    const renderSlideButton = (mediaPrevButton, mediaNextButton, currentMediaIndex, mediaSlideCount) => {
        mediaPrevButton.style.opacity = currentMediaIndex === 0 ? 0 : 100;
        mediaNextButton.style.opacity = currentMediaIndex === mediaSlideCount - 1 ? 0 : 100;
    }

    const filterIndicator = (postIndicator, currentMediaIndex) => {
        const indicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        indicator.classList.toggle('active');
    }

    postList.map((post, index) => {
        const mediaSlides = document.getElementById(`post__medias #${index}`);
        const mediaSlideImg = mediaSlides.querySelectorAll('li');

        const postContent = document.getElementById(`post__content #${index}`);

        const postIndicator = makeIndicator(index, mediaSlideImg);

        const mediaSlideWidth = postContent.clientWidth;
        const mediaSlideCount = mediaSlideImg.length;
        mediaSlides.style.width = `${mediaSlideWidth * mediaSlideCount}px`;

        let currentMediaIndex = 0;

        const mediaPrevButton = postContent.querySelector('.post__controller .post__controller-prev');
        const mediaNextButton = postContent.querySelector('.post__controller .post__controller-next');

        renderSlideButton(mediaPrevButton, mediaNextButton, currentMediaIndex, mediaSlideCount);
        filterIndicator(postIndicator, currentMediaIndex);

        const moveMediaSlide = (num) => {
            filterIndicator(postIndicator, currentMediaIndex);
            mediaSlides.style.setProperty('transform', `translateX(${-(num * mediaSlideWidth)}px)`);
            currentMediaIndex = num;
            filterIndicator(postIndicator, currentMediaIndex);

            renderSlideButton(mediaPrevButton, mediaNextButton, currentMediaIndex, mediaSlideCount);
        }

        mediaPrevButton.addEventListener('click', () => {
            currentMediaIndex !== 0 && moveMediaSlide(currentMediaIndex - 1)
        });

        mediaNextButton.addEventListener('click', () => {
            currentMediaIndex !== (mediaSlideCount - 1) && moveMediaSlide(currentMediaIndex + 1)
        })
    })
}

render();

window.addEventListener("resize", debounce(function (e) {
    render();
}));