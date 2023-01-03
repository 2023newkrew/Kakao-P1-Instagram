import { initHorizontalScroll, initInfiniteScroll } from "./utils/scroll.js";
import { createElementFromHtml } from "./utils/dom.js";
import { CAROUSEL_SCROLL_AMOUNT, POST_FETCH_AMOUNT } from "./constants.js";

function initIndicator({ containerEl, itemElsSelector, indicatorElsSelector }) {
  const itemEls = Array.from(containerEl.querySelectorAll(itemElsSelector));
  const indicatorEls = Array.from(containerEl.parentElement.querySelectorAll(indicatorElsSelector));

  const indexObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        const index = itemEls.indexOf(target);
        const indicatorClassList = indicatorEls[index].classList;

        if (isIntersecting) {
          indicatorClassList.add("post__indicator--focused");
        } else {
          indicatorClassList.remove("post__indicator--focused");
        }
      });
    },
    {
      root: containerEl,
      threshold: 0.5,
    }
  );

  itemEls.forEach((itemEl) => indexObserver.observe(itemEl));
}

function initCarousel(postEl) {
  const mediasEl = postEl.querySelector(".post__medias");

  initHorizontalScroll({
    containerEl: mediasEl,
    itemElsSelector: ".post__media",
    prevButtonElSelector: ".medias__button--prev",
    nextButtonElSelector: ".medias__button--next",
    scrollAmount: CAROUSEL_SCROLL_AMOUNT,
  });

  initIndicator({
    containerEl: mediasEl,
    itemElsSelector: ".post__media",
    indicatorElsSelector: ".post__indicator",
  });
}

function createPostEl() {
  const postEl = createElementFromHtml(`<article class="post">
  <div class="post__header">
    <div class="post__profile">
      <a href="" target="_blank" class="post__avatar">
        <img src="assets/images/avatar.png" class="avatar" alt="user picture" />
      </a>
      <a href="" target="_blank" class="post__user">user</a>
    </div>

    <button class="post__more-options">
      <img src="assets/icons/more.svg" alt="more" />
    </button>
  </div>

  <div class="post__content">
    <div class="post__medias">
      <img class="post__media" src="assets/images/picture1.jpeg" alt="Image 1" />
      <img class="post__media" src="assets/images/picture2.jpeg" alt="Image 2" />
      <img class="post__media" src="assets/images/picture3.jpeg" alt="Image 3" />
    </div>
    <button class="medias__button medias__button--prev">
      <img src="assets/icons/arrow.svg" class="arrow-icon" alt="previous" />
    </button>
    <button class="medias__button medias__button--next">
      <img src="assets/icons/arrow.svg" class="arrow-icon" alt="next" />
    </button>
    <div class="post__indicators">
      <div class="post__indicator"></div>
      <div class="post__indicator"></div>
      <div class="post__indicator"></div>
    </div>
  </div>

  <div class="post__footer">
    <div class="post__buttons">
      <button class="post__button">
        <img src="assets/icons/heart.svg" class="icon" alt="heart" />
      </button>
      <button class="post__button">
        <img src="assets/icons/comment.svg" class="icon" alt="comment" />
      </button>

      <button class="post__button post__button--align-right">
        <img src="assets/icons/bookmark.svg" class="icon" alt="bookmark" />
      </button>
    </div>

    <div class="post__infos">
      <div class="post__likes">
        <a href="#" class="post__likes-avatar">
          <img src="assets/images/avatar.png" class="avatar" alt="user picture" />
        </a>

        <span>Liked by
          <a class="post__name--underline" href="#">user1</a> and
          <a href="#">33 others</a></span>
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
</article>`);

  initCarousel(postEl);

  return postEl;
}

function fetchPosts(count) {
  const postsEl = document.body.querySelector(".posts");

  Array(count)
    .fill()
    .forEach(() => {
      postsEl.appendChild(createPostEl());
    });
}

export function initPost() {
  fetchPosts(POST_FETCH_AMOUNT);
  initInfiniteScroll({
    lastItemSelector: ".post:last-child",
    callback: () => fetchPosts(POST_FETCH_AMOUNT),
  });
}
