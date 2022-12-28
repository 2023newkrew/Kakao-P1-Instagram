import { stories } from "./dummy.js";

const themeButtonEl = document.querySelector(".header__theme-button");
themeButtonEl.addEventListener("click", toggleTheme);

function initThemeMode() {
  const currentMode = window.localStorage.getItem("ThemeMode");
  if (currentMode === undefined) {
    window.localStorage.setItem("ThemeMode", "light");
  } else if (currentMode === "dark") {
    document.documentElement.classList.add("dark-theme");
  }
}

function toggleTheme() {
  const currentMode = window.localStorage.getItem("ThemeMode");
  const nextMode = currentMode === "light" ? "dark" : "light";
  window.localStorage.setItem("ThemeMode", nextMode);
  document.documentElement.classList.toggle("dark-theme");
}

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
  initThemeMode();
  setStories();
}

main();
