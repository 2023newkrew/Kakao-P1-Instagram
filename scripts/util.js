function createScrollObserver({ $container, $button }) {
  return new IntersectionObserver(
    ([{ isIntersecting }]) => {
      const buttonClassList = $button.classList;

      isIntersecting ? buttonClassList.add("hidden") : buttonClassList.remove("hidden");
    },
    {
      root: $container,
      threshold: 1,
    }
  );
}

export function initHorizontalScroll({
  $container,
  items,
  $prevButton,
  $nextButton,
  scrollAmount,
}) {
  const startObserver = createScrollObserver({ $container, $button: $prevButton });
  const endObserver = createScrollObserver({ $container, $button: $nextButton });

  startObserver.observe(items.at(0));
  endObserver.observe(items.at(-1));

  $prevButton.addEventListener("click", () => {
    $container.scrollLeft -= scrollAmount;
  });

  $nextButton.addEventListener("click", () => {
    $container.scrollLeft += scrollAmount;
  });
}

export function initInfiniteScroll({ lastItemSelector, callback }) {
  const observer = new IntersectionObserver(
    ([{ isIntersecting, target }], observer) => {
      if (!isIntersecting) return;

      observer.unobserve(target);
      callback();
      observer.observe(document.querySelector(lastItemSelector));
    },
    {
      threshold: 0.8,
    }
  );

  observer.observe(document.querySelector(lastItemSelector));
}
