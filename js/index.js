import { initTheme } from './theme.js';
import { initPosts } from './post.js';
import { initSearchHandlers } from './search.js';

const init = ()=>{
  initTheme();
  initPosts();
  initSearchHandlers();
}

init();