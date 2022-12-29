import { initHorizontalScroll } from "./util.js";

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
    scrollAmount: 468,
  });
}

export function initPost() {
  const posts = Array.from(document.querySelectorAll(".post"));

  posts.forEach(($post) => initCarousel($post));
}
