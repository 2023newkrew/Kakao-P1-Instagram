import { stories, posts } from "./dummy.js";

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
  const storyHTML = `<button class="story">
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
    </button>`;
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
}

main();
