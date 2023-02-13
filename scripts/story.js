import { initHorizontalScroll } from "./utils/scroll.js";
import { STORY_SCROLL_AMOUNT } from "./constants.js";

export function initStory() {
  const storiesEl = document.body.querySelector(".stories__content");

  initHorizontalScroll({
    containerEl: storiesEl,
    itemElsSelector: ".story",
    prevButtonElSelector: ".stories__button--prev",
    nextButtonElSelector: ".stories__button--next",
    scrollAmount: STORY_SCROLL_AMOUNT,
  });
}
