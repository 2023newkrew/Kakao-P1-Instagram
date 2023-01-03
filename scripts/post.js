import { initHorizontalScroll } from "./util.js";
import { CAROUSEL_SCROLL_AMOUNT } from "./CONSTANTS.js";

function initIndicator({ $container, items, indicators }) {
  const indexObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        const index = items.indexOf(target);
        const indicatorClassList = indicators[index].classList;

        if (isIntersecting) {
          indicatorClassList.add("post__indicator--focused");
        } else {
          indicatorClassList.remove("post__indicator--focused");
        }
      });
    },
    {
      root: $container,
      threshold: 0.5,
    }
  );

  items.forEach(($item) => indexObserver.observe($item));
}

function initCarousel($post) {
  const $medias = $post.querySelector(".post__medias");
  const medias = Array.from($post.querySelectorAll(".post__media"));
  const $prevButton = $post.querySelector(".medias__button--prev");
  const $nextButton = $post.querySelector(".medias__button--next");
  const indicators = Array.from($post.querySelectorAll(".post__indicator"));

  initHorizontalScroll({
    $container: $medias,
    items: medias,
    $prevButton,
    $nextButton,
    scrollAmount: CAROUSEL_SCROLL_AMOUNT,
  });
  
  initIndicator({
    $container: $medias,
    items: medias,
    indicators
  });
}

export function initPost() {
  const posts = Array.from(document.querySelectorAll(".post"));

  posts.forEach(($post) => initCarousel($post));
}
