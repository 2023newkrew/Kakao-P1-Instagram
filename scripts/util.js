function createScrollObserver({ $container, $button }) {
  return new IntersectionObserver(
    ([{ isIntersecting }]) => {
      const buttonClassList = $button.classList;

      if (isIntersecting) {
        buttonClassList.add("hidden");
      } else {
        buttonClassList.remove("hidden");
      }
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
