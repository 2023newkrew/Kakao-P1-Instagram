const posts = Array.from(document.querySelectorAll(".post"));

function createObservers({ $post, medias, $prevButton, $nextButton }) {
  return {
    indexObserver: new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;

          const index = medias.indexOf(target);
        });
      },
      {
        root: $post,
        threshold: 0.5,
      }
    ),
    startObserver: new IntersectionObserver(
      ([{ isIntersecting }]) => {
        const prevButtonClassList = $prevButton.classList;

        if (isIntersecting) {
          prevButtonClassList.add("hidden");
        } else {
          prevButtonClassList.remove("hidden");
        }
      },
      {
        root: $post,
        threshold: 1,
      }
    ),
    endObserver: new IntersectionObserver(
      ([{ isIntersecting }]) => {
        const nextButtonClassList = $nextButton.classList;

        if (isIntersecting) {
          nextButtonClassList.add("hidden");
        } else {
          nextButtonClassList.remove("hidden");
        }
      },
      {
        root: $post,
        threshold: 1,
      }
    ),
  };
}

posts.forEach(($post) => {
  const $medias = $post.querySelector(".post__medias");
  const medias = Array.from($post.querySelectorAll(".post__media"));
  const $prevButton = $post.querySelector(".medias__button--prev");
  const $nextButton = $post.querySelector(".medias__button--next");
  const { indexObserver, startObserver, endObserver } = createObservers({
    $post,
    medias,
    $prevButton,
    $nextButton,
  });

  medias.forEach(($media) => {
    indexObserver.observe($media);
  });

  startObserver.observe(medias.at(0));
  endObserver.observe(medias.at(-1));

  $prevButton.addEventListener("click", () => {
    $medias.scrollLeft -= 468;
  });

  $nextButton.addEventListener('click', () => {
    $medias.scrollLeft += 468;
  })
});
