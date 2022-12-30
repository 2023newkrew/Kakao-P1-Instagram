function initCarousel(
  mediasEl,
  containerEl,
  leftButtonEl,
  rightButtonEl,
  type
) {
  let currentIndex = 1;
  let maxIndex = 2;

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
    maxIndex = mediasEl.childElementCount - 2;

    rightButtonEl.addEventListener("click", moveRight); // 클로저 느낌으로 동작하게
    leftButtonEl.addEventListener("click", moveLeft);
  }

  function toggleArrowButton(entries, buttonEl) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        buttonEl.classList.remove("carousel-button--active");
      } else {
        buttonEl.classList.add("carousel-button--active");
      }
    });
  }

  function moveRight() {
    if (currentIndex < maxIndex) {
      currentIndex++;
    }
    const maxWidth = type === "%" ? maxIndex * 100 : mediasEl.scrollWidth;
    const width = type === "%" ? 100 : mediasEl.offsetWidth;
    const curPosition = getCurPosition(mediasEl.style.transform);
    const nextPosition = Math.min(curPosition + width, maxWidth - width);
    mediasEl.style.transform = `translateX(${-nextPosition}${type})`;
  }

  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex--;
    }
    const width = type === "%" ? 100 : mediasEl.offsetWidth;
    const curPosition = getCurPosition(mediasEl.style.transform);
    const nextPosition = Math.max(curPosition - width, 0);
    mediasEl.style.transform = `translateX(${-nextPosition}${type})`;
  }
}

function getCurPosition(posString) {
  const regex = /[^0-9]/g; // 숫자가 아닌 문자
  return Number(posString.replace(regex, ""));
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
      carouselRightButtonList[index],
      "%"
    );
  });
}

function initStoryCarousel() {
  const containerElList = document.querySelector(".stories");
  const mediasElList = document.querySelectorAll(".stories__content");
  const carouselRightButtonList = document.querySelectorAll(
    ".story__carousel.carousel-buttons > .carousel-button.right"
  );
  const carouselLeftButtonList = document.querySelectorAll(
    ".story__carousel.carousel-buttons > .carousel-button.left"
  );
  mediasElList.forEach((mediasEl, index) => {
    initCarousel(
      mediasEl,
      containerElList[index],
      carouselLeftButtonList[index],
      carouselRightButtonList[index],
      "px"
    );
  });
}

export function setCarousel() {
  initPostCarousel();
  initStoryCarousel();
}
