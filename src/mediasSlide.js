(function makeDummyMedia(dummyMediaCount) {
    const posts = document.querySelector('.posts');

    let elementString = '';
    for (let i = 0; i < dummyMediaCount; i++) {
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

                <div class="post__content #${i}" id="post__content #${i}">
                    <ul class="post__medias #${i}" id="post__medias #${i}">
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

                        <div class="post__indicators"></div>

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
})(10)

const posts = document.querySelector('.posts');
const postList = Array.prototype.slice.call(posts.children);

postList.map((post, index) => {
    const mediaSlides = document.getElementById(`post__medias #${index}`);
    const mediaSlideImg = mediaSlides.querySelectorAll('li');

    const postContent = document.getElementById(`post__content #${index}`);

    const mediaSlideCount = mediaSlideImg.length;
    const mediaSlideWidth = postContent.clientWidth;

    let currentMediaIndex = 0;

    (function initFunction() {
        // TODO : 초기에 옮기는 길이를 고정시켜 두는 방법은 그닥 좋지 않아보임
        mediaSlides.style.width = mediaSlideWidth * mediaSlideCount + 'px';
    })();

    const moveMediaSlide = (num) => {
        const postContentWidth = document.querySelector('.post__content').clientWidth;
        mediaSlides.style.setProperty('transform', `translateX(${-(num * postContentWidth)}px)`);
        currentMediaIndex = num;
    }

    const mediaPrevButton = postContent.querySelector('.post__controller .post__controller-prev');

    mediaPrevButton.addEventListener('click', function () {
        if (currentMediaIndex !== 0) moveMediaSlide(currentMediaIndex - 1);
    });

    const mediaNextButton = postContent.querySelector('.post__controller .post__controller-next');

    mediaNextButton.addEventListener('click', function () {
        if (currentMediaIndex !== mediaSlideCount - 1) moveMediaSlide(currentMediaIndex + 1);
    })
})






