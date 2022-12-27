export const stories = [
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
]; //users

export const posts = [
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

export const suggestions = [
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
