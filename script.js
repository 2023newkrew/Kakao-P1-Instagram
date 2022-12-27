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

const onLoadScript = ()=>{
    const themeButton = document.querySelector('.theme-button');
    
    initTheme(themeButton);

    const postsContainer = document.querySelector('.posts');
    const posts = postsContainer.querySelectorAll('.post');
    initPosts(posts);
}
onLoadScript();