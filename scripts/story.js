import { initHorizontalScroll } from "./util.js";
import { STORY_SCROLL_AMOUNT } from "./CONSTANTS.js";

export function initStory() {
  const $stories = document.querySelector(".stories__content");
  const stories = Array.from(document.querySelectorAll(".story"));
  const $prevButton = document.querySelector(".stories__button--prev");
  const $nextButton = document.querySelector(".stories__button--next");

  initHorizontalScroll({
    $container: $stories,
    items: stories,
    $prevButton,
    $nextButton,
    scrollAmount: STORY_SCROLL_AMOUNT,
  });
}
