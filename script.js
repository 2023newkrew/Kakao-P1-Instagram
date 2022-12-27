import { initTheme } from './theme.js';
import { initCarousel } from './carousel.js';

const initPostCarousel = (post)=>{
    const slidesContainer = post.querySelector('.post__content .slides-container');
    const prevButton = post.querySelector('.prev-button');
    const nextButton = post.querySelector('.next-button');

    initCarousel(slidesContainer, prevButton, nextButton);
};

const initPosts = (posts)=>{
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
const onLoadScript = ()=>{
    const themeButton = document.querySelector('.theme-button');
    
    initTheme(themeButton);

    const postsContainer = document.querySelector('.posts');
    const posts = postsContainer.querySelectorAll('.post');
    initPosts(posts);


    const searchInput = document.querySelector('.header__search input');
    const searchButton = document.querySelector('.header__search .search-icon');
    searchInput.addEventListener('keypress', (event)=>{
        const { code } = event;
        if(code === 'Enter'){
            search(searchInput.value);
            searchInput.blur();
        }
    });
    searchButton.addEventListener('click', ()=>{
        search(searchInput.value);
    })

}
onLoadScript();