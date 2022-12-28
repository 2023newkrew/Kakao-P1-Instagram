import { initCarousel } from './carousel.js';

const mockPosts = [
  {
    username: '머스크',
    content: '안녕하세요. 머스크입니다.',
    images:[
      'https://cdn.mydaily.co.kr/FILES/202212/202212251951653340_1.jpg',
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202207/31/d399eb2b-154e-4585-bdbb-b8a86939577c.jpg',
      
    ]
  },
  {
    username: '그레이',
    content: '안녕하세요. 그레이입니다.',
    images:[
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGAAPNCR5TpOTOgwxHTH7FAWsqSmPR74H-rg&usqp=CAU',
      'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fxpak0%2FbtrANgG00jY%2FxS6dYbKAcISU3ThSiznvkk%2Fimg.jpg',
    ]
  },
  {
    username: '쿠마',
    content: '안녕하세요. 쿠마입니다.',
    images:[
      'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/Kuma-using-his-Paw-Paw-fruit.jpg',
      'https://www.giantbomb.com/a/uploads/scale_medium/11/115901/2109097-kumasfxt.jpg',
    ]
  },
];

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
    <div class="post__medias slides-container">
      ${
        images.map((image)=>
          `<div class="post__media slide">
              <img src="${image}" alt="Post Content" />
          </div>`
        )
      }
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

            <div class="post__indicators"></div>

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
  const slidesContainer = post.querySelector('.post__content .slides-container');
  const prevButton = post.querySelector('.prev-button');
  const nextButton = post.querySelector('.next-button');

  initCarousel(slidesContainer, prevButton, nextButton);
};

export const initPosts = ()=>{
  const postTemplates = mockPosts.map(makePostTemplate).join('\n');
  postsContainer.innerHTML = postTemplates;

  const posts = postsContainer.querySelectorAll('.post');
  posts.forEach(initPostCarousel);
}
