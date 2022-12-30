import { CLASS_NAME, DISPLAY } from "./const.js";

export const initCarousel = (postEl) => {
  const leftBtnEl = postEl.querySelector(".post__left-carousel-button");
  const rightBtnEl = postEl.querySelector(".post__right-carousel-button");
  const mediasContainerEl = postEl.querySelector(".post__medias");
  const indicatorsEl = postEl.querySelectorAll(".post__indicator");

  const maxMediaPage = mediasContainerEl.childElementCount - 1;

  const mediaPage = {
    currentIndex: 0,
    lastIndex: maxMediaPage,
  };

  const previousMedia = () => {
    if (mediaPage.currentIndex === 0) return;
    mediaPage.currentIndex = Math.max(mediaPage.currentIndex - 1, 0);
    render();
  }

  const nextMedia = () => {
    if (mediaPage.currentIndex === mediaPage.lastIndex) return;
    mediaPage.currentIndex = Math.min(mediaPage.currentIndex + 1, mediaPage.lastIndex);
    render();
  }

  const displayButtons = () => {
    const isFirstMedia = mediaPage.currentIndex === 0;
    const isLastMedia = mediaPage.currentIndex === mediaPage.lastIndex;

    leftBtnEl.style.display = isFirstMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
    rightBtnEl.style.display = isLastMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
  }

  const updateIndicator = () => {
    indicatorsEl.forEach((indicator) => indicator.classList.remove(CLASS_NAME.POST_ACTIVE_INDICATOR));
    indicatorsEl[mediaPage.currentIndex].classList.add(CLASS_NAME.POST_ACTIVE_INDICATOR);
  }

  const render = (isMoveMedia = true) => {
    if (isMoveMedia)
      mediasContainerEl.style.transform = `translateX(-${mediaPage.currentIndex * 100}%)`;

    updateIndicator();
    displayButtons();
  }

  leftBtnEl.addEventListener("click", previousMedia);
  rightBtnEl.addEventListener("click", nextMedia);

  render(false);
};