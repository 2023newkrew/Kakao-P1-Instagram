(() => {
  const postsElement = document.querySelector('.posts');

  const ClassName = Object.freeze({
    VISIBLE: 'visible',
    FOCUS: 'focus',
  });

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
    <ul class="post__medias">
      ${images.map(buildPostImageHTML).join('\n')}
    </ul>
    <button class="post__shift-left-button" title="Shift Left">
      <img src="assets/icons/arrow.svg" alt="left" />
    </button>
    <button class="post__shift-right-button ${images.length > 1 ? ClassName.VISIBLE : ''}" title="Shift Right">
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

      <div class="post__indicators">${buildPostIndicatorsInnerHTML({ mediasLength: images.length, mediasIndex: 0 })}</div>

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

  const buildPostImageHTML = ({ source, alternativeText }) => `<li class="post__media">
  <img src="${source}" alt="${alternativeText}" />
</li>`;

  const buildPostIndicatorsInnerHTML = ({ mediasLength, mediasIndex }) => {
    if (mediasLength <= 1) return '';

    return Array.from({ length: mediasLength }, (_, index) => `<div class="post__indicator ${index === mediasIndex ? ClassName.FOCUS : ''}"></div>`).join('');
  };

  const renderPosts = (posts) => {
    postsElement.innerHTML = posts.map(buildPostHTML).join('\n');
  };

  const updatePostShiftButtons = ({ postElement, mediasLength, mediasIndex }) => {
    const shiftLeftButton = postElement.querySelector('.post__shift-left-button');
    const shiftRightButton = postElement.querySelector('.post__shift-right-button');

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
  };

  const updatePostIndicators = ({ postElement, mediasLength, mediasIndex }) => {
    const postIndicatorElement = postElement.querySelector('.post__indicators');

    postIndicatorElement.innerHTML = buildPostIndicatorsInnerHTML({ mediasLength, mediasIndex });
  };

  const updatePostElement = (postElement) => {
    const mediasElement = postElement.querySelector('.post__medias');
    const mediasLength = mediasElement.children.length;
    const mediasIndex = Number(postElement.dataset.mediasIndex);

    updatePostShiftButtons({ postElement, mediasLength, mediasIndex });
    updatePostIndicators({ postElement, mediasLength, mediasIndex });
    mediasElement.style.transform = `translateX(-${mediasIndex}00%)`;
  };

  const mockPosts = [
    {
      userName: 'user',
      images: [
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/317630577_514669740691028_1275676419564108105_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=gjnuLV5RITcAX8n5oMN&_nc_ht=scontent-gmp1-1.xx&oh=00_AfBjustOdB1BedB-B5NGO6IFG9Ph2dyhK0M_kuHh9SJGgg&oe=63B19E4C',
          alternativeText: 'Post Content',
        },
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/317641904_514669744024361_1246674972814523250_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=tRJ2fJEkS4cAX8Z2Z59&_nc_ht=scontent-gmp1-1.xx&oh=00_AfCu_5D1_GwqBBEJPJvxQDk6h9Uzb55a4pmhJqHAclvOzQ&oe=63B161B8',
          alternativeText: 'Post Content',
        },
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/317482478_514669730691029_7965858732177659745_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=FGq3yi2co_IAX8LGWna&_nc_ht=scontent-gmp1-1.xx&oh=00_AfCD6a2aYFlKf9OqPEN15bbJuTbSJyE3fEZzdARSOeLdBA&oe=63B0CCAB',
          alternativeText: 'Post Content',
        },
      ],
      description: 'description',
    },
    {
      userName: 'user',
      images: [
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/316530098_509111174580218_3288726548484223717_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=YlFQFgfJ_bAAX9kzJfB&_nc_ht=scontent-gmp1-1.xx&oh=00_AfB2HRFLXf3HfOjcdapMo2n88IucYsyiGaGrnPQcXNHdYg&oe=63B01670',
          alternativeText: 'Post Content',
        },
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/316421671_509111181246884_8716287198811641435_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=5OK9-Th-f9wAX9wmIG-&_nc_ht=scontent-gmp1-1.xx&oh=00_AfCUfVYlo8DYgC3_c-nJQViudeBv6McwPWRcygojW9ar0A&oe=63B1C6BA',
          alternativeText: 'Post Content',
        },
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/316533884_509111177913551_2112276236892919714_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=PHCJKoT_PDQAX8ys6s9&_nc_ht=scontent-gmp1-1.xx&oh=00_AfBbyZM1gCtKpS1it0H--ezCucoP336_k86U_7ZqZ0G6vg&oe=63B15400',
          alternativeText: 'Post Content',
        },
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/316279282_509111184580217_4191800842323353200_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=QRUeRS8cKfAAX8DLkBW&_nc_oc=AQklrETJsdA1-H6rEurVVVFliaE1RpNFS44pI4f6AAky6mhHX9FuLG8gjVTG7Sa6k4s&_nc_ht=scontent-gmp1-1.xx&oh=00_AfD0PrB6w-frHa4bSFXO4lXDR-3VGzcymuJZ5i6MYil5oA&oe=63B02DC7',
          alternativeText: 'Post Content',
        },
      ],
      description: 'description',
    },
    {
      userName: 'user',
      images: [
        {
          source: 'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/298588644_1075264139861603_4895572830968268997_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a26aad&_nc_ohc=uvaT2Ud9A1wAX_Ladpo&_nc_ht=scontent-gmp1-1.xx&oh=00_AfCFe9G6j4VrAOICJ8tTytgtRLsDVwVye07HyF4tMmjxGw&oe=63B0959B',
          alternativeText: 'Post Content',
        },
      ],
      description: 'description',
    },
  ];

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
