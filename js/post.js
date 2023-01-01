import {initCarousel} from './carousel.js';
import {MOCK_POSTS_DATA} from './constants/post.js';
import {useVisibilityObserver} from './utils/observer.js';

const postsContainer = document.querySelector('.posts');
const loader = document.querySelector('#posts__loader');

let isLoading = false;
let page = 0;

const makePostTemplate = ({username, content, images}) => `
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
        ${images
          .map(
            (image, index) =>
              `<li class="carousel-section">
                <img src="${image}" alt="게시글 이미지 ${index}" />
            </li>`
          )
          .join('\n')}
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
`;

const initPostCarousel = post => {
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

const initPostsCarousel = posts => {
  posts.forEach(initPostCarousel);
};

const initPostIndicatorObserver = (carouselSection, root, indicator) => {
  const ioOptions = {
    root,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }, ioOptions);

  observer.observe(carouselSection);
};

const initIndicator = (post, images) => {
  const indicatorsContainer = post.querySelector('.post__indicators');
  const carouselContainer = post.querySelector('.carousel-sections-scroll');
  const carouselSections = carouselContainer.querySelectorAll('.carousel-section');

  const indicators = images.map((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = 'post__indicator';
    initPostIndicatorObserver(carouselSections[index], carouselContainer, indicator);
    return indicator;
  });

  indicators[0].classList.add('active');
  indicatorsContainer.append(...indicators);
};

const loadPost = () => {
  isLoading = true;

  if (page > MOCK_POSTS_DATA.last) {
    loader.textContent = '마지막 게시물입니다.';
    isLoading = false;
    return [];
  }

  const newPosts = MOCK_POSTS_DATA.data[page].map(postData => {
    const postEl = document.createElement('article');
    postEl.className = 'post';
    postEl.innerHTML = makePostTemplate(postData);

    initIndicator(postEl, postData.images);

    return postEl;
  });

  page += 1;
  isLoading = false;

  return newPosts;
};

const renderPosts = posts => {
  postsContainer.append(...posts);
  initPostsCarousel(posts);
};

const initPostLoaderObserver = () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading) {
          const newPosts = loadPost(page);
          renderPosts(newPosts);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  observer.observe(loader);
};

export const initPosts = async () => {
  initPostLoaderObserver();
};
