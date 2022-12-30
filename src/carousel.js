function initCarousel(mediasEl, containerEl, leftButtonEl, rightButtonEl) {
  let currentIndex = 0;
  let maxIndex = 2;
  let maxWidth = 0;

  init();

  function init() {
    const option = {
      root: containerEl,
      threshold: 1.0,
    };
    const leftObserver = new IntersectionObserver((entries) => {
      toggleArrowButton(entries, leftButtonEl, "l");
    }, option);
    const rightObserver = new IntersectionObserver((entries) => {
      toggleArrowButton(entries, rightButtonEl, "r");
    }, option);
    leftObserver.observe(mediasEl.firstElementChild);
    rightObserver.observe(mediasEl.lastElementChild);
    console.log(mediasEl.lastElementChild);
    maxIndex = mediasEl.childElementCount - 3;

    rightButtonEl.addEventListener("click", moveRight); // 클로저 느낌으로 동작하게
    leftButtonEl.addEventListener("click", moveLeft);
    // drawArrowButton();
  }

  function toggleArrowButton(entries, buttonEl, type) {
    console.log(type, entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        buttonEl.classList.add("carousel-button--hide");
      } else {
        buttonEl.classList.remove("carousel-button--hide");
      }
    });
  }

  function moveRight() {
    if (currentIndex < maxIndex) {
      console.log(currentIndex, maxIndex);
      currentIndex++;
    }
    // drawArrowButton();

    mediasEl.style.transform = `translateX(${-100 * currentIndex}%)`;
  }

  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
    }
    // drawArrowButton();
    mediasEl.style.transform = `translateX(${-100 * currentIndex}%)`;
  }
}

function initPostCarousel() {
  const containerElList = document.querySelector(".post__content");
  const mediasElList = document.querySelectorAll(".post__medias");
  const carouselRightButtonList = document.querySelectorAll(
    ".post__carousel.carousel-buttons > .carousel-button.right"
  );
  console.log(carouselRightButtonList);
  const carouselLeftButtonList = document.querySelectorAll(
    ".post__carousel.carousel-buttons > .carousel-button.left"
  );
  mediasElList.forEach((mediasEl, index) => {
    initCarousel(
      mediasEl,
      containerElList[index],
      carouselLeftButtonList[index],
      carouselRightButtonList[index]
    );
  });
}

function initStoryCarousel() {
  const containerElList = document.querySelector(".stories");
  const mediasElList = document.querySelectorAll(".stories__content");
  const carouselRightButtonList = document.querySelectorAll(
    ".story__carousel.carousel-buttons > .carousel-button.right"
  );
  console.log(carouselRightButtonList);
  const carouselLeftButtonList = document.querySelectorAll(
    ".story__carousel.carousel-buttons > .carousel-button.left"
  );
  mediasElList.forEach((mediasEl, index) => {
    initCarousel(
      mediasEl,
      containerElList[index],
      carouselLeftButtonList[index],
      carouselRightButtonList[index]
    );
  });
}

export function setCarousel() {
  initPostCarousel();
  initStoryCarousel();
}
