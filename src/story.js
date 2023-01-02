import { DISPLAY, STORY_SCROLL_PIXELS } from "./const.js";
import { dummyStory } from "./faker.js";

const initStories = () => {
  const storiesContentEl = document.querySelector(".stories__content");
  const leftBtnEl = document.querySelector(".stories__left-button");
  const rightBtnEl = document.querySelector(".stories__right-button");

  const createStories = () => {
    const storiesContainerEl = document.querySelector(".stories__content");
    const storiesElArray = dummyStory.map(createStory);
    storiesContainerEl.innerHTML = storiesElArray.join("");
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
    const isMostLeft = storiesContentEl.scrollLeft === 0;
    const isMostRight = storiesContentEl.scrollLeft + storiesContentEl.offsetWidth >= storiesContentEl.scrollWidth;

    leftBtnEl.style.display = isMostLeft ? DISPLAY.NONE : DISPLAY.BLOCK;
    rightBtnEl.style.display = isMostRight ? DISPLAY.NONE : DISPLAY.BLOCK;
  }

  const scrollLeft = () => storiesContentEl.scrollLeft -= STORY_SCROLL_PIXELS;
  const scrollRight = () => storiesContentEl.scrollLeft += STORY_SCROLL_PIXELS;

  leftBtnEl.addEventListener("click", scrollLeft);
  rightBtnEl.addEventListener("click", scrollRight);
  storiesContentEl.addEventListener("scroll", displayButtons);

  createStories();
  displayButtons();
}

export default initStories;