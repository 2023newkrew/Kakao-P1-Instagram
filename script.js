const toggleThemeButton = document.querySelector(".header__theme-button");

toggleThemeButton.addEventListener("click", () => {
  const rootClassList = document.documentElement.classList;

  rootClassList.toggle("dark-theme");
  localStorage.setItem("theme", rootClassList.contains("dark-theme") ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  const rootClassList = document.documentElement.classList;

  if (theme === "dark") rootClassList.add("dark-theme");
});

const stories = document.querySelector(".stories__content");
const prevButton = document.querySelector(".stories__button--prev");
const nextButton = document.querySelector(".stories__button--next");

const startObserver = new IntersectionObserver(
  ([{ isIntersecting }]) => {
    const prevButtonClassList = prevButton.classList;

    if (isIntersecting) {
      prevButtonClassList.add("hidden");
    } else {
      prevButtonClassList.remove("hidden");
    }
  },
  {
    root: stories,
    threshold: 1,
  }
);

const endObserver = new IntersectionObserver(
  ([{ isIntersecting }]) => {
    const nextButtonClassList = nextButton.classList;

    if (isIntersecting) {
      nextButtonClassList.add("hidden");
    } else {
      nextButtonClassList.remove("hidden");
    }
  },
  {
    root: stories,
    threshold: 1,
  }
);

startObserver.observe(document.querySelector(".story:first-child"));
endObserver.observe(document.querySelector(".story:last-child"));

prevButton.addEventListener("click", () => {
  stories.scrollLeft -= 320;
});

nextButton.addEventListener("click", () => {
  stories.scrollLeft += 320;
});
