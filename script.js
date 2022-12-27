import { stories } from "./dummy.js";

function setStory(story) {
  const storyEl = document.createElement("button");
  storyEl.classList.add("story");
  storyEl.innerHTML = `<div class="story__avatar">
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
  `;
  return storyEl;
}

function setStories() {
  const storiesContentEl = document.querySelector(".stories__content");
  for (let story of stories) {
    storiesContentEl.appendChild(setStory(story));
  }
}

function main() {
  setStories();
}

main();
