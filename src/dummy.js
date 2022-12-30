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
    images: ["assets/images/picture.jpeg"],
    likes: [
      {
        name: "user03",
        profileImg: "assets/images/avatar.png",
      },
    ], //users
    updateDt: "",
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
  const storyHTML = `<li>
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
  return storyHTML;
}

function initStories() {
  const storiesContentEl = document.querySelector(".stories__content");
  let storiesHTML = `<div class="carousel-side"></div>`;
  for (let story of stories) {
    storiesHTML += setStory(story);
  }
  storiesHTML += `<div class="carousel-side"></div>`;
  storiesContentEl.innerHTML = storiesHTML;
}

export function initDummyData() {
  initStories();
}
