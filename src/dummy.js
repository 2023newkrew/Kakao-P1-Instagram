const stories = [
  {
    name: "user01",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user02",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user03",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
  {
    name: "user04",
    profileImg: "assets/images/avatar.png",
  },
]; //users

const posts = [
  {
    user: {
      name: "user01",
      profileImg: "assets/images/avatar.png",
    },
    content: "user post content",
    images: [
      "assets/images/picture.jpeg",
      "assets/images/picture.jpeg",
      "assets/images/picture.jpeg",
    ],
    likes: [
      {
        name: "user03",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user04",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user05",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user06",
        profileImg: "assets/images/avatar.png",
      },
    ], //users
    updateDt: "30 minutes ago",
  },
  {
    user: {
      name: "user02",
      profileImg: "assets/images/avatar.png",
    },
    content: "user post content",
    images: ["assets/images/picture.jpeg", "assets/images/picture.jpeg"],
    likes: [
      {
        name: "user03",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user04",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user05",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user06",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user07",
        profileImg: "assets/images/avatar.png",
      },
      {
        name: "user08",
        profileImg: "assets/images/avatar.png",
      },
    ], //users
    updateDt: "50 minutes ago",
  },
];

const suggestions = [
  {
    user: {
      name: "user02",
      profileImg: "assets/images/avatar.png",
    },
    followers: [
      {
        name: "user03",
        profileImg: "assets/images/avatar.png",
      },
    ], //users
  },
];

function setStory(story) {
  return `<li>
  <button class="story">
    <div class="story__avatar">
        <div class="story__border">
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <circle r="31" cy="32" cx="32" />
        </svg>
        </div>
        <div class="story__picture">
        <img class="user-profile-img" src=${story.profileImg} alt="user picture"/>
        </div>
        </div>
        <span class="story__user">${story.name}</span>
    </button>
</li>`;
}

function initStories() {
  const storiesEl = document.querySelector(".stories__content");
  let storiesHTML = `<div class="carousel-side"></div>`;
  for (let story of stories) {
    storiesHTML += setStory(story);
  }
  storiesHTML += `<div class="carousel-side"></div>`;
  storiesEl.innerHTML = storiesHTML;
}

function setPostImages(images) {
  let imagesHTML = "";
  for (let imageURL of images) {
    imagesHTML += `<img
    class="post__media"
    src="${imageURL}"
    alt="Post Content" />`;
  }
  return imagesHTML;
}

function setPostLikes(likes) {
  return likes.length <= 0
    ? `<span>No likes!<span>`
    : `<div class="post__likes">
  <a href="#" class="post__likes-avatar">
    <img
      class="user-profile-img"
      src="${likes[0].profileImg}"
      alt="user picture"/>
  </a>
  <span>Liked by
    <a class="post__name--emphasis" href="#">${likes[0].name}</a> and
    <a href="#">${likes.length - 1} others</a></span>
</div>`;
}

function setPost(post) {
  return `<li class="post">
  <article>
    <header class="post__header">
      <div class="post__profile">
        <a href="" target="_blank" class="post__avatar">
          <img
            class="user-profile-img"
            src="assets/images/avatar.png"
            alt="user picture"
          />
        </a>
        <a href="" target="_blank" class="post__user">user</a>
      </div>
      <button class="post__more-options">
        <img src="assets/icons/more.svg" alt="more" />
      </button>
    </header>

    <div class="post__content">
      <div class="post__carousel carousel-buttons">
        <button class="carousel-button left">
          <img src="assets/icons/arrow_left.svg" alt="carousel left button" />
        </button>
        <button class="carousel-button right">
          <img src="assets/icons/arrow_right.svg" alt="carousel right button"/>
        </button>
      </div>
      <div class="post__medias">
        <div class="carousel-side"></div>
        ${setPostImages(post.images)}
        <div class="carousel-side"></div>
      </div>
    </div>

    <footer class="post__footer">
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
        ${setPostLikes(post.likes)}
        <div class="post__description">
          <span>
            <a class="post__name--emphasis" href="" target="_blank">user</a>
            description
          </span>
        </div>

        <span class="post__date-time">${post.updateDt}</span>
      </div>
    </footer>
  </article>
</li>
`;
}
function initPosts() {
  const postsEl = document.querySelector(".posts");
  let postsHTML = "";
  for (const post of posts) {
    postsHTML += setPost(post);
  }
  postsEl.innerHTML = postsHTML;
}

export function initDummyData() {
  initStories();
  initPosts();
}
