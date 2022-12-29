import { appendMediaPage, displayButtons, updateIndicator, nextMedia, previousMedia } from "./carousel.js";
import { CLASS_NAME } from "./const.js";
import { dummyPosts } from "./faker.js";

export const createPosts = () => {
  const posts = document.querySelector(".posts");
  const postsArray = [];

  dummyPosts.forEach((post, index) => {
    const postElement = document.createElement("article");
    postElement.classList.add(CLASS_NAME.POST);
    postElement.innerHTML = createPost(post);

    const maxMediaPage = post.medias.length - 1;

    const leftButton = postElement.querySelector(".post__left-carousel-button");
    const rightButton = postElement.querySelector(".post__right-carousel-button");
    const mediasContainer = postElement.querySelector(".post__medias");
    const indicators = postElement.querySelectorAll(".post__indicator");

    appendMediaPage(maxMediaPage);

    leftButton.addEventListener("click", () => previousMedia(index, mediasContainer, leftButton, rightButton, indicators));
    rightButton.addEventListener("click", () => nextMedia(index, mediasContainer, leftButton, rightButton, indicators));

    displayButtons(index, leftButton, rightButton);
    updateIndicator(index, indicators);
    
    postsArray.push(postElement);
  });

  posts.append(...postsArray);
}

const createPost = ({user, medias, likes, description}) => {
  return `
    <div class="post__header">
      <div class="post__profile">
        <a href="" target="_blank" class="post__avatar avatar">
          <img src="${user.avatar}" alt="user picture" />
        </a>
        <a href="" target="_blank" class="post__user">${user.username}</a>
      </div>

      <button class="post__more-options icon-button">
        <img src="assets/icons/more.svg" alt="more" />
      </button>
    </div>

    <div class="post__content">
      <button class="post__left-carousel-button carousel-button icon-button">
        <img src="assets/icons/arrow.svg" alt="left arrow" />
      </button>
      <div class="post__medias">
        ${medias.map((media) => `<img class="post__media" src="${media}" alt="Post Content" />`).join("")}
      </div>
      <button class="post__right-carousel-button carousel-button icon-button">
        <img src="assets/icons/arrow.svg" alt="right arrow" />
      </button>
    </div>

    <div class="post__footer">
      <div class="post__buttons">
        <div class="post__button-box">
          <button class="post__button icon-button">
            <img src="assets/icons/heart.svg" alt="heart" />
          </button>
          <button class="post__button icon-button">
            <img src="assets/icons/comment.svg" alt="comment" />
          </button>
        </div>
        <div class="post__button-box">
          <div class="post__indicators">
            ${medias.map(()=> '<div class="post__indicator"></div>').join("")}
          </div>
        </div>
        <div class="post__button-box">
          <button class="post__button post__button--align-right icon-button">
            <img src="assets/icons/bookmark.svg" alt="bookmark" />
          </button>
        </div>
      </div>

      <div class="post__infos">
        ${
        likes.length > 0 ? `
          <div class="post__likes">
            <a href="#" class="post__likes-avatar avatar">
              <img src="assets/images/avatar.png" alt="user picture" />
            </a>
            <span>Liked by
              <a class="post__name--underline" href="#">${likes[0]}</a> 
              ${likes.length > 1 ? `and <a href="#">${likes.length - 1} others</a>` : ""}
            </span>
          </div>
            ` : ""
        }

        <div class="post__description">
          <span>
            <a class="post__name--underline" href="" target="_blank">${user.username}</a>
            ${description}
          </span>
        </div>

        <span class="post__date-time">30 minutes ago</span>
      </div>
    </div>
  `
}