import { initTheme } from './theme.js';
import { initCarousel } from './carousel.js';


const postsContainer = document.querySelector('.posts');
const posts = postsContainer.querySelectorAll('.post');

const searchInput = document.querySelector('.header__search input');
const searchButton = document.querySelector('.header__search .search-icon');

const initPostCarousel = (post)=>{
  const slidesContainer = post.querySelector('.post__content .slides-container');
  const prevButton = post.querySelector('.prev-button');
  const nextButton = post.querySelector('.next-button');

  initCarousel(slidesContainer, prevButton, nextButton);
};
const initPosts = ()=>{
  posts.forEach(initPostCarousel);
}

const search = (keyword)=>{
  const searchKeyword = keyword.trim();
  if(!searchKeyword){
    alert('검색어를 입력해주세요');
    return;
  }

  window.open(`https://www.google.com/search?q=${searchKeyword}`);
}
const initSearchHandlers = ()=>{
  searchInput.addEventListener('keypress', (event)=>{
    const { code } = event;
    if(code === 'Enter'){
      search(searchInput.value);
      searchInput.blur();
    }
  });
  searchButton.addEventListener('click', ()=>{
    search(searchInput.value);
  });
}
const onLoadScript = ()=>{
  initTheme();

  initPosts();

  initSearchHandlers();
}

onLoadScript();