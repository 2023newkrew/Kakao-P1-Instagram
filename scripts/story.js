const storiesElement = document.querySelector('.stories');
const storiesContentElement = storiesElement.querySelector('.stories__content');
const storiesScrollLeftButton = storiesElement.querySelector('.stories__scroll-left-button');
const storiesScrollRightButton = storiesElement.querySelector('.stories__scroll-right-button');

const buildStoryHTML = ({ imageSource, imageAlternativeText, userName }) => `<li class="story ">
  <div class="story__avatar">
    <div class="story__border">
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <circle r="31" cy="32" cx="32" />
      </svg>
    </div>
    <div class="story__picture">
      <img src="${imageSource}" alt="${imageAlternativeText}" />
    </div>
  </div>
  <span class="story__user">${userName}</span>
</li>`;

const ClassName = {
  VISIBLE: 'visible',
};

const SCROLL_SIZE = 256;

const updateScrollButtonVisibility = () => {
  if (storiesContentElement.scrollLeft + storiesContentElement.clientWidth < storiesContentElement.scrollWidth) {
    storiesScrollRightButton.classList.add(ClassName.VISIBLE);
  } else {
    storiesScrollRightButton.classList.remove(ClassName.VISIBLE);
  }

  if (storiesContentElement.scrollLeft > 0) {
    storiesScrollLeftButton.classList.add(ClassName.VISIBLE);
  } else {
    storiesScrollLeftButton.classList.remove(ClassName.VISIBLE);
  }
};

const renderStories = (stories) => {
  storiesContentElement.innerHTML = stories.map(buildStoryHTML).join('\n');
  updateScrollButtonVisibility();
};

const mockStories = Array.from({ length: 20 }, (_, index) => {
  return {
    imageSource: 'assets/images/avatar.png',
    imageAlternativeText: 'user picture',
    userName: `user${index + 1}`,
  };
});

renderStories(mockStories);

window.addEventListener('resize', updateScrollButtonVisibility);

storiesContentElement.addEventListener('scroll', updateScrollButtonVisibility);

storiesScrollLeftButton.addEventListener('click', () => {
  storiesContentElement.scrollBy({ left: -SCROLL_SIZE });
});

storiesScrollRightButton.addEventListener('click', () => {
  storiesContentElement.scrollBy({ left: SCROLL_SIZE });
});
