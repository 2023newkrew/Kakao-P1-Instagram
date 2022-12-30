import { initCarousel } from './carousel.js';
import { MOCK_POSTS_DATA } from './constants/post.js';
import { useVisibilityObserver } from './utils/observer.js';


const makePostTemplate = ({username, content, images}) => `
  <article class="post">
    <header class="post__header">
      <div class="post__profile">
        <a href="" target="_blank" class="post__avatar">
        <img class="avatar" src="assets/images/avatar.png" alt="user picture" />
        </a>
        <a href="" target="_blank" class="post__user">${username}</a>
      </div>

      <button class="post__more-options">
          <img src="assets/icons/more.svg" alt="more" />
      </button>
    </header>

    <div class="post__content">
      <button class="post__button prev-button">
        <img src="assets/icons/arrow.svg" alt="prev button image"/>
      </button>
    <div class="post__medias carousel-sections-scroll">
      <ul class="post_media carousel-sections">
        ${
          images.map((image, index)=>
            `<li class="carousel-section">
                <img src="${image}" alt="게시글 이미지 ${index}" />
            </li>`
          ).join('\n')
        }
      </ul>
    </div>
      <button class="post__button next-button">
        <img src="assets/icons/arrow.svg" alt="prev button image"/>
      </button>
    </div>

      <div class="post__footer">
        <div class="post__buttons">
            <button class="post__button">
                <img src="assets/icons/heart.svg" alt="heart" />
            </button>
            <button class="post__button">
                <img src="assets/icons/comment.svg" alt="comment" />
            </button>

            <div class="post__indicators">
              <div></div>
              <div></div>
            </div>

            <button class="post__button post__button--align-right">
                <img src="assets/icons/bookmark.svg" alt="bookmark" />
            </button>
        </div>

        <div class="post__infos">
            <div class="post__likes">
            <a href="#" class="post__likes-avatar">
                <img class="avatar" src="assets/images/avatar.png" alt="user picture" />
            </a>

            <span>Liked by
                <a class="post__name--underline" href="#">user1</a> and
                <a href="#">33 others</a></span>
            </div>

            <div class="post__description">
            <span>
                <a class="post__name--underline" href="" target="_blank">${username}</a>
                ${content}
            </span>
            </div>

            <span class="post__date-time">30 minutes ago</span>
        </div>
      </div>
    </article>
`;

const postsContainer = document.querySelector('.posts');

const initPostCarousel = (post)=>{
  const slidesContainer = post.querySelector('.post__content .carousel-sections');
  const prevButton = post.querySelector('.prev-button');
  const nextButton = post.querySelector('.next-button');

  initCarousel(slidesContainer, prevButton, nextButton);

  const ioOptions = {
    root: slidesContainer.parentNode,
    threshold: 1,
  };
  const initPrevButtonObserver = useVisibilityObserver(
    slidesContainer.querySelector('.carousel-section:first-child'),
    prevButton, 
    ioOptions
  );
  const initNextButtonObserver = useVisibilityObserver(
    slidesContainer.querySelector('.carousel-section:last-child'),
    nextButton, 
    ioOptions
  );
  initPrevButtonObserver();
  initNextButtonObserver();
};

const renderPosts = ()=>{
  postsContainer.innerHTML = MOCK_POSTS_DATA.map(makePostTemplate).join('\n');
}

export const initPosts = async ()=>{
  renderPosts();

  const posts = postsContainer.querySelectorAll('.post');
  posts.forEach(initPostCarousel);
}
