(() => {
  const postsElement = document.querySelector('.posts');

  const ClassName = {
    VISIBLE: 'visible',
  };

  const buildPostHTML = ({ userName, images, description }) => `<article class="post" data-medias-index="0">
  <div class="post__header">
    <div class="post__profile">
      <a href="" target="_blank" class="post__avatar">
        <img src="assets/images/avatar.png" alt="user picture" />
      </a>
      <a href="" target="_blank" class="post__user">${userName}</a>
    </div>

    <button class="post__more-options">
      <img src="assets/icons/more.svg" alt="more" />
    </button>
  </div>

  <div class="post__content">
    <div class="post__medias">
      ${images.map(buildPostImageHTML).join('\n')}
    </div>
    <button class="post__shift-left-button" title="Shift Left">
      <img src="assets/icons/arrow.svg" alt="left" />
    </button>
    <button class="post__shift-right-button ${images.length > 1 ? 'visible' : ''}" title="Shift Right">
      <img src="assets/icons/arrow.svg" alt="right" />
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
          <img src="assets/images/avatar.png" alt="user picture" />
        </a>

        <span>Liked by
          <a class="post__name--underline" href="#">user1</a> and
          <a href="#">33 others</a></span>
      </div>

      <div class="post__description">
        <span>
          <a class="post__name--underline" href="" target="_blank">${userName}</a>
          ${description}
        </span>
      </div>

      <span class="post__date-time">30 minutes ago</span>
    </div>
  </div>
</article>`;

  const buildPostImageHTML = ({ source, alternativeText }) => `<img class="post__media" src="${source}" alt="${alternativeText}" />`;

  const renderPosts = (posts) => {
    postsElement.innerHTML = posts.map(buildPostHTML).join('\n');
  };

  const mockPosts = [
    {
      userName: 'user',
      images: [
        {
          source: 'assets/images/picture.jpeg',
          alternativeText: 'Post Content',
        },
        {
          source: 'assets/images/picture.jpeg',
          alternativeText: 'Post Content',
        },
        {
          source: 'assets/images/picture.jpeg',
          alternativeText: 'Post Content',
        },
      ],
      description: 'description',
    },
    {
      userName: 'user',
      images: [
        {
          source: 'assets/images/picture.jpeg',
          alternativeText: 'Post Content',
        },
      ],
      description: 'description',
    },
  ];

  const updatePostElement = (postElement) => {
    const shiftLeftButton = postElement.querySelector('.post__shift-left-button');
    const shiftRightButton = postElement.querySelector('.post__shift-right-button');
    const mediasElement = postElement.querySelector('.post__medias');

    const mediasIndex = Number(postElement.dataset.mediasIndex);
    const mediasLength = mediasElement.children.length;

    if (mediasIndex === 0) {
      shiftLeftButton.classList.remove(ClassName.VISIBLE);
    } else {
      shiftLeftButton.classList.add(ClassName.VISIBLE);
    }

    if (mediasIndex === mediasLength - 1) {
      shiftRightButton.classList.remove(ClassName.VISIBLE);
    } else {
      shiftRightButton.classList.add(ClassName.VISIBLE);
    }

    mediasElement.style.transform = `translateX(-${mediasIndex}00%)`;
  };

  renderPosts(mockPosts);

  postsElement.addEventListener('click', (event) => {
    if (!event.target.closest('.post__shift-right-button')) return;

    const postElement = event.target.closest('.post');
    postElement.dataset.mediasIndex = (Number(postElement.dataset.mediasIndex) + 1).toString();
    updatePostElement(postElement);
  });

  postsElement.addEventListener('click', (event) => {
    if (!event.target.closest('.post__shift-left-button')) return;

    const postElement = event.target.closest('.post');
    postElement.dataset.mediasIndex = (Number(postElement.dataset.mediasIndex) - 1).toString();
    updatePostElement(postElement);
  });
})();
