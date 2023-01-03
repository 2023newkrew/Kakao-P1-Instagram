import { initHorizontalScroll } from "./util.js";
import { STORY_SCROLL_AMOUNT } from "./CONSTANTS.js";

export function initStory() {
  const $stories = document.body.querySelector(".stories__content");
  const stories = Array.from(document.body.querySelectorAll(".story"));
  const $prevButton = document.body.querySelector(".stories__button--prev");
  const $nextButton = document.body.querySelector(".stories__button--next");

  initHorizontalScroll({
    $container: $stories,
    items: stories,
    $prevButton,
    $nextButton,
    scrollAmount: STORY_SCROLL_AMOUNT,
  });
}
