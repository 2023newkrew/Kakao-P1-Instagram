import { initHorizontalScroll } from "./util.js";
import { STORY_SCROLL_AMOUNT } from "./CONSTANTS.js";

export function initStory() {
  const storiesEl = document.body.querySelector(".stories__content");
  const storyEls = Array.from(document.body.querySelectorAll(".story"));
  const prevButtonEl = document.body.querySelector(".stories__button--prev");
  const nextButtonEl = document.body.querySelector(".stories__button--next");

  initHorizontalScroll({
    containerEl: storiesEl,
    itemEls: storyEls,
    prevButtonEl,
    nextButtonEl,
    scrollAmount: STORY_SCROLL_AMOUNT,
  });
}
