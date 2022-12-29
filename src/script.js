import { stories, posts } from "./dummy.js";
import { initCarousel } from "./carousel.js";
import { initThemeMode } from "./theme.js";

function setStory(story) {
  const storyHTML = `<li>
  <button class="story">
    <div class="story__avatar">
        <div class="story__border">
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <circle r="31" cy="32" cx="32" />
        </svg>
        </div>
        <div class="story__picture">
        <img class="user-profile-img" src=${story.profileImg} alt="user picture"/>
        </div>
        </div>
        <span class="story__user">${story.name}</span>
    </button>
</li>`;
  return storyHTML;
}

function initStories() {
  const storiesContentEl = document.querySelector(".stories__content");
  let storiesHTML = "";
  for (let story of stories) {
    storiesHTML += setStory(story);
  }
  storiesContentEl.innerHTML = storiesHTML;
}

function main() {
  initThemeMode();
  initStories();
  initCarousel();
}

main();
