import { DISPLAY } from "./const.js";

const mediaPage = [];

export const displayButtons = (postIndex, leftButton, rightButton) => {
  const isFirstMedia = mediaPage[postIndex].current === 0;
  const isLastMedia = mediaPage[postIndex].current === mediaPage[postIndex].max;

  leftButton.style.display = isFirstMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
  rightButton.style.display = isLastMedia ? DISPLAY.NONE : DISPLAY.BLOCK;
}

export const previousMedia = (postIndex, mediasContainer, leftButton, rightButton) => {
  if (mediaPage[postIndex].current === 0) return;
  mediaPage[postIndex].current = Math.max(mediaPage[postIndex].current - 1, 0);
  mediasContainer.style.transform = `translateX(-${mediaPage[postIndex].current * 100}%)`;

  displayButtons(postIndex, leftButton, rightButton);
}

export const nextMedia = (postIndex, mediasContainer, leftButton, rightButton) => {
  if (mediaPage[postIndex].current === mediaPage[postIndex].max) return;
  mediaPage[postIndex].current = Math.min(mediaPage[postIndex].current + 1, mediaPage[postIndex].max);
  mediasContainer.style.transform = `translateX(-${mediaPage[postIndex].current * 100}%)`;

  displayButtons(postIndex, leftButton, rightButton);
}

export const appendMediaPage = (maxMediaPage) => {
  mediaPage.push({
    current: 0,
    max: maxMediaPage
  });
}