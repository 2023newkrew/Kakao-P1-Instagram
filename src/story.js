import { DISPLAY, STORY_SCROLL_PIXELS } from "./const.js";
import { dummyStory } from "./faker.js";

export const initStories = () => {
  const storiesContent = document.querySelector('.stories__content');
  const leftButton = document.querySelector('.stories__left-button');
  const rightButton = document.querySelector('.stories__right-button');

  const createStories = () => {
    const storiesContainer = document.querySelector(".stories__content");
    const storiesArray = dummyStory.map(createStory);
    storiesContainer.innerHTML = storiesArray.join("");
  }

  const createStory = ({user}) => {
    const { avatar, username } = user;
    return `
      <button class="story ">
        <div class="story__avatar">
          <div class="story__border">
            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <circle r="31" cy="32" cx="32" />
            </svg>
          </div>
          <div class="story__picture avatar">
            <img src="${avatar}" alt="user picture" />
          </div>
        </div>
        <span class="story__user">${username}</span>
      </button>
    `;
  }

  const displayButtons = () => {
    const isMostLeft = storiesContent.scrollLeft === 0;
    const isMostRight = storiesContent.scrollLeft + storiesContent.offsetWidth >= storiesContent.scrollWidth;

    leftButton.style.display = isMostLeft ? DISPLAY.NONE : DISPLAY.BLOCK;
    rightButton.style.display = isMostRight ? DISPLAY.NONE : DISPLAY.BLOCK;
  }

  leftButton.addEventListener('click', () => {
    storiesContent.scrollLeft -= STORY_SCROLL_PIXELS;
  });

  rightButton.addEventListener('click', () => {
    storiesContent.scrollLeft += STORY_SCROLL_PIXELS;
  });

  storiesContent.addEventListener('scroll', () => {
    displayButtons();
  });

  createStories();
  displayButtons();
}
