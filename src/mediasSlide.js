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

postList.map((post, index) => {
    const mediaSlides = document.getElementById(`post__medias #${index}`);
    const mediaSlideImg = mediaSlides.querySelectorAll('li');

    const postContent = document.getElementById(`post__content #${index}`);

    const postIndicator = document.getElementById(`post__indicators ${index}`);
    let elementString = '';
    for (let index = 0; index < mediaSlideImg.length; index++) {
        elementString += `
        <li><img src="assets/icons/indicator.svg"</li>
        `
    }
    postIndicator.innerHTML = elementString;

    const indicator = postIndicator.querySelector(`:nth-child(1)`);
    indicator.style.filter = "invert(83%) sepia(4%) saturate(4977%) hue-rotate(167deg) brightness(98%) contrast(88%)";

    const mediaSlideWidth = postContent.clientWidth;
    const mediaSlideCount = mediaSlideImg.length;
    // TODO : 초기에 옮기는 길이를 고정시켜 두는 방법은 그닥 좋지 않아보임 observer 또는 resize를 통해 변경을 확인하는건 어떨까 ?
    // TODO : 위 방법은 reflow를 유발함 li 태그가 자연스럽게 꽉 차고 줄어들게 바꿀 수 있게 해야 함
    mediaSlides.style.width = `${mediaSlideWidth * mediaSlideCount}px`;
    let currentMediaIndex = 0;

    const moveMediaSlide = (num) => {
        mediaSlides.style.setProperty('transform', `translateX(${-(num * mediaSlideWidth)}px)`);
        currentMediaIndex = num;

        mediaPrevButton.style.opacity = currentMediaIndex === 0 ? 0 : 100;
        mediaNextButton.style.opacity = currentMediaIndex === mediaSlideCount - 1 ? 0 : 100;
    }

    const mediaPrevButton = postContent.querySelector('.post__controller .post__controller-prev');
    mediaPrevButton.style.opacity = currentMediaIndex === 0 ? 0 : 100;

    mediaPrevButton.addEventListener('click', function () {
        let prevIndicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        prevIndicator.style.filter = "";

        if (currentMediaIndex !== 0) moveMediaSlide(currentMediaIndex - 1);

        let nextIndicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        nextIndicator.style.filter = "invert(83%) sepia(4%) saturate(4977%) hue-rotate(167deg) brightness(98%) contrast(88%)";
    });

    const mediaNextButton = postContent.querySelector('.post__controller .post__controller-next');
    mediaNextButton.style.opacity = currentMediaIndex === mediaSlideCount - 1 ? 0 : 100;

    mediaNextButton.addEventListener('click', function () {
        let prevIndicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        prevIndicator.style.filter = "";

        if (currentMediaIndex !== mediaSlideCount - 1) moveMediaSlide(currentMediaIndex + 1);

        let nextIndicator = postIndicator.querySelector(`:nth-child(${currentMediaIndex + 1})`);
        nextIndicator.style.filter = "invert(83%) sepia(4%) saturate(4977%) hue-rotate(167deg) brightness(98%) contrast(88%)";
    })
})

//TODO : resize를 통한 구현
//! : post들을 전부 다시그려야 하는 상황에서 reflow를 예방할 수 없을 것 같음
//! : instagram의 경우에는 리렌더링을 하는 것 같음