import { initHorizontalScroll } from "./util.js";
import { CAROUSEL_SCROLL_AMOUNT } from "./CONSTANTS.js";

function initCarousel($post) {
  const $medias = $post.querySelector(".post__medias");
  const medias = Array.from($post.querySelectorAll(".post__media"));
  const $prevButton = $post.querySelector(".medias__button--prev");
  const $nextButton = $post.querySelector(".medias__button--next");

  initHorizontalScroll({
    $container: $medias,
    items: medias,
    $prevButton,
    $nextButton,
    scrollAmount: CAROUSEL_SCROLL_AMOUNT,
  });
}

export function initPost() {
  const posts = Array.from(document.querySelectorAll(".post"));

  posts.forEach(($post) => initCarousel($post));
}
