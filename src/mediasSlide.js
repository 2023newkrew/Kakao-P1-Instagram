(function makeDummyMedia(dummyMediaCount) {
    const posts = document.querySelector('.posts');

    let elementString = '';
    for (let i = 1; i <= dummyMediaCount; i++) {
        elementString += `
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
        `
    }

    posts.innerHTML = elementString;
})(5)

for (let i = 1; i <= 5; i++) {
    const mediaSlides = document.getElementById(`post__medias #${i}`);
    const mediaSlideImg = mediaSlides.querySelectorAll('li');

    const postContent = document.getElementById(`post__content #${i}`);

    const mediaSlideCount = mediaSlideImg.length;
    const mediaSlideWidth = postContent.clientWidth;

    let currentMediaIndex = 0;

    (function initFunction() {
        mediaSlides.style.width = mediaSlideWidth * mediaSlideCount + 'px';
        mediaSlides.style.left = 0 + 'px';
    })();

    const moveMediaSlide = (num) => {
        mediaSlides.style.left = -num * mediaSlideWidth + 'px';
        currentMediaIndex = num;
    }

    const mediaPrevButton = postContent.querySelector('.post__controller .post__controller-prev');

    mediaPrevButton.addEventListener('click', function () {
        console.log(currentMediaIndex);
        if (currentMediaIndex !== 0) moveMediaSlide(currentMediaIndex - 1);
    });

    const mediaNextButton = postContent.querySelector('.post__controller .post__controller-next');

    mediaNextButton.addEventListener('click', function () {
        if (currentMediaIndex !== mediaSlideCount - 1) moveMediaSlide(currentMediaIndex + 1);
    })
}





