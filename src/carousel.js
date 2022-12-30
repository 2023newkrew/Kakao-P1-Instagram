/*  
각 carousel의 index 정보를 담은 list
[{
    currentIndex: number,
    maxIndex: number
 }, 
 ...]
*/
const carouselInfoList = [];

function moveRight(mediasEL, postIndex) {
  if (
    carouselInfoList[postIndex].currentIndex <
    carouselInfoList[postIndex].maxIndex
  ) {
    carouselInfoList[postIndex].currentIndex++;
  }
  mediasEL.style.transform = `translateX(${
    -100 * carouselInfoList[postIndex].currentIndex
  }%)`;
}

function moveLeft(mediasEL, postIndex) {
  if (carouselInfoList[postIndex].currentIndex > 0) {
    carouselInfoList[postIndex].currentIndex--;
  }
  mediasEL.style.transform = `translateX(${
    -100 * carouselInfoList[postIndex].currentIndex
  }%)`;
}

function initCarouselButton() {
  const mediasElList = document.querySelectorAll(".post__medias");
  const carouselRightButtonList = document.querySelectorAll(
    ".post__carousel-button--right"
  );
  carouselRightButtonList.forEach((buttonEl, index) => {
    buttonEl.addEventListener("click", () => {
      moveRight(mediasElList[index], index);
    });
  });

  const carouselLeftButtonList = document.querySelectorAll(
    ".post__carousel-button--left"
  );
  carouselLeftButtonList.forEach((buttonEl, index) => {
    buttonEl.addEventListener("click", () => {
      moveLeft(mediasElList[index], index);
    });
  });

  mediasElList.forEach((mediasEl) => {
    carouselInfoList.push({
      currentIndex: 0,
      maxIndex: mediasEl.childElementCount - 1,
    });
  });
}

export function initCarousel() {
  initCarouselButton();
}
