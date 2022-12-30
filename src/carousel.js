function initCarousel(mediasEl, leftButtonEl, rightButtonEl) {
  let currentIndex = 0;
  let maxIndex = 2;

  init();

  function init() {
    rightButtonEl.addEventListener("click", moveRight); // 클로저 느낌으로 동작하게
    leftButtonEl.addEventListener("click", moveLeft);
    drawArrowButton();
  }

  function drawArrowButton() {
    if (currentIndex < maxIndex) {
      rightButtonEl.classList.add("carousel-button--active");
    } else {
      rightButtonEl.classList.remove("carousel-button--active");
    }

    if (currentIndex > 0) {
      leftButtonEl.classList.add("carousel-button--active");
    } else {
      leftButtonEl.classList.remove("carousel-button--active");
    }
  }

  function moveRight() {
    if (currentIndex < maxIndex) {
      console.log(currentIndex, maxIndex);
      currentIndex++;
    }
    drawArrowButton();

    mediasEl.style.transform = `translateX(${-100 * currentIndex}%)`;
  }

  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
    }
    drawArrowButton();
    mediasEl.style.transform = `translateX(${-100 * currentIndex}%)`;
  }
}

function initPostCarousel() {
  const mediasElList = document.querySelectorAll(".post__medias");
  const carouselRightButtonList = document.querySelectorAll(
    ".post__carousel-buttons > .carousel-button.right"
  );
  console.log(carouselRightButtonList);
  const carouselLeftButtonList = document.querySelectorAll(
    ".post__carousel-buttons > .carousel-button.left"
  );
  mediasElList.forEach((mediasEl, index) => {
    initCarousel(
      mediasEl,
      carouselLeftButtonList[index],
      carouselRightButtonList[index]
    );
  });
}

export function setCarousel() {
  initPostCarousel();
}
