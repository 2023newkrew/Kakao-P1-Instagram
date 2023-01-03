import {initTheme} from './theme.js';
import {initPosts} from './post.js';
import {initSearchHandlers} from './search.js';
import {initStory} from './story.js';

const init = () => {
  initTheme();
  initPosts();
  initSearchHandlers();
  initStory();
};

init();
