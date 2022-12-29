import { CLASS_NAME, DISPLAY } from "./const.js";

const mediaPage = [];

export const displayButtons = (postIndex, leftButton, rightButton) => {
  const isFirstMedia = mediaPage[postIndex].current === 0;
  const isLastMedia = mediaPage[postIndex].current === mediaPage[postIndex].max;

  leftButton.style.display = isFirstMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
  rightButton.style.display = isLastMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
}

export const previousMedia = (postIndex, mediasContainer, leftButton, rightButton, indicators) => {
  if (mediaPage[postIndex].current === 0) return;
  mediaPage[postIndex].current = Math.max(mediaPage[postIndex].current - 1, 0);
  mediasContainer.style.transform = `translateX(-${mediaPage[postIndex].current * 100}%)`;

  updateIndicator(postIndex, indicators);
  displayButtons(postIndex, leftButton, rightButton);
}

export const nextMedia = (postIndex, mediasContainer, leftButton, rightButton, indicators) => {
  if (mediaPage[postIndex].current === mediaPage[postIndex].max) return;
  mediaPage[postIndex].current = Math.min(mediaPage[postIndex].current + 1, mediaPage[postIndex].max);
  mediasContainer.style.transform = `translateX(-${mediaPage[postIndex].current * 100}%)`;

  updateIndicator(postIndex, indicators);
  displayButtons(postIndex, leftButton, rightButton);
}

export const updateIndicator = (postIndex, indicators) => {
  const currentPage = mediaPage[postIndex].current;

  indicators.forEach((indicator) => indicator.classList.remove(CLASS_NAME.POST_ACTIVE_INDICATOR));
  indicators[currentPage].classList.add(CLASS_NAME.POST_ACTIVE_INDICATOR);
}

export const appendMediaPage = (maxMediaPage) => {
  mediaPage.push({
    current: 0,
    max: maxMediaPage
  });
}

export const initCarousel = (postElement, index) => {
  const leftButton = postElement.querySelector(".post__left-carousel-button");
  const rightButton = postElement.querySelector(".post__right-carousel-button");
  const mediasContainer = postElement.querySelector(".post__medias");
  const indicators = postElement.querySelectorAll(".post__indicator");
  
  const maxMediaPage = mediasContainer.childElementCount - 1;

  appendMediaPage(maxMediaPage);

  leftButton.addEventListener("click", () => previousMedia(index, mediasContainer, leftButton, rightButton, indicators));
  rightButton.addEventListener("click", () => nextMedia(index, mediasContainer, leftButton, rightButton, indicators));

  displayButtons(index, leftButton, rightButton);
  updateIndicator(index, indicators);
};