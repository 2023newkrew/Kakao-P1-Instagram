import { CLASS_NAME, DISPLAY } from "./const.js";

const mediaPage = [];

const displayButtons = (postIndex, leftButton, rightButton) => {
  const isFirstMedia = mediaPage[postIndex].currentIndex === 0;
  const isLastMedia = mediaPage[postIndex].currentIndex === mediaPage[postIndex].maxIndex;

  leftButton.style.display = isFirstMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
  rightButton.style.display = isLastMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
}

const previousMedia = (postIndex, mediasContainer, leftButton, rightButton, indicators) => {
  if (mediaPage[postIndex].currentIndex === 0) return;
  mediaPage[postIndex].currentIndex = Math.max(mediaPage[postIndex].currentIndex - 1, 0);
  mediasContainer.style.transform = `translateX(-${mediaPage[postIndex].currentIndex * 100}%)`;

  updateIndicator(postIndex, indicators);
  displayButtons(postIndex, leftButton, rightButton);
}

const nextMedia = (postIndex, mediasContainer, leftButton, rightButton, indicators) => {
  if (mediaPage[postIndex].currentIndex === mediaPage[postIndex].maxIndex) return;
  mediaPage[postIndex].currentIndex = Math.min(mediaPage[postIndex].currentIndex + 1, mediaPage[postIndex].maxIndex);
  mediasContainer.style.transform = `translateX(-${mediaPage[postIndex].currentIndex * 100}%)`;

  updateIndicator(postIndex, indicators);
  displayButtons(postIndex, leftButton, rightButton);
}

const updateIndicator = (postIndex, indicators) => {
  const currentIndexPage = mediaPage[postIndex].currentIndex;

  indicators.forEach((indicator) => indicator.classList.remove(CLASS_NAME.POST_ACTIVE_INDICATOR));
  indicators[currentIndexPage].classList.add(CLASS_NAME.POST_ACTIVE_INDICATOR);
}

const appendMediaPage = (maxMediaPage) => {
  mediaPage.push({
    currentIndex: 0,
    maxIndex: maxMediaPage
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