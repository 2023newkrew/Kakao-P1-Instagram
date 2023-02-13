import { initTheme } from "./scripts/theme.js";
import { initStory } from "./scripts/story.js";
import { initPost } from "./scripts/post.js";
import { initSearch } from "./scripts/search.js";

function init() {
  initTheme();
  initStory();
  initPost();
  initSearch();
}

init();
