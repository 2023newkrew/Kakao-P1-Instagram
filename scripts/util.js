function createScrollObserver({ containerEl, buttonEl }) {
  return new IntersectionObserver(
    ([{ isIntersecting }]) => {
      const buttonElClassList = buttonEl.classList;

      isIntersecting ? buttonElClassList.add("hidden") : buttonElClassList.remove("hidden");
    },
    {
      root: containerEl,
      threshold: 1,
    }
  );
}

export function initHorizontalScroll({
  containerEl,
  itemEls,
  prevButtonEl,
  nextButtonEl,
  scrollAmount,
}) {
  const startObserver = createScrollObserver({ containerEl, buttonEl: prevButtonEl });
  const endObserver = createScrollObserver({ containerEl, buttonEl: nextButtonEl });

  startObserver.observe(itemEls.at(0));
  endObserver.observe(itemEls.at(-1));

  prevButtonEl.addEventListener("click", () => {
    containerEl.scrollLeft -= scrollAmount;
  });

  nextButtonEl.addEventListener("click", () => {
    containerEl.scrollLeft += scrollAmount;
  });
}

export function initInfiniteScroll({ lastItemSelector, callback }) {
  const observer = new IntersectionObserver(
    ([{ isIntersecting, target }], observer) => {
      if (!isIntersecting) return;

      observer.unobserve(target);
      callback();
      observer.observe(document.body.querySelector(lastItemSelector));
    },
    {
      threshold: 0.8,
    }
  );

  observer.observe(document.body.querySelector(lastItemSelector));
}
