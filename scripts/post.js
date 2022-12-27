const posts = [
    // example post 1
    {
        user: {
            avatar: 'assets/images/avatar.png',
            name: 'hash.table'
        },
        content: '오늘도 카카오맨 hash는 행복합니다.\n카카오라서 행복합니다',
        pictures: [
            'assets/images/picture.jpeg',
        ],
        likes: [
            {
                user: {
                    avatar: 'assets/images/avatar.png',
                    name: 'tori.ham'
                },
            },
            {
                user: {
                    avatar: 'assets/images/avatar.png',
                    name: 'muse.le'
                },
            }
        ],
        updatedAt: new Date('2022-12-26')
    },
    // example post 2
    {
        user: {
            avatar: 'assets/images/avatar.png',
            name: 'hash.table'
        },
        content: '오늘도 카카오맨 hash는 행복합니다.\n카카오라서 행복합니다',
        pictures: [
            'assets/images/picture.jpeg',
            'assets/images/picture.jpeg',
        ],
        likes: [
            {
                user: {
                    avatar: 'assets/images/avatar.png',
                    name: 'tori.ham'
                },
            },
            {
                user: {
                    avatar: 'assets/images/avatar.png',
                    name: 'muse.le'
                },
            }
        ],
        updatedAt: new Date('2022-12-26')
    }
]
const picturePages = Array(posts.length).fill(0);

function setPosts() {
    const elementPosts = document.querySelector('.posts');
    elementPosts.innerHTML = '';
    for (let [index, post] of posts.entries()) {
        const { user, pictures, content, updatedAt, likes } = post
        elementPosts.innerHTML += makePost(index, user, pictures, content, updatedAt, likes);
    }
}
function makePost(index, {avatar, name}, pictures, content, updatedAt, likes) {
    return `
        <article class="post">
            <div class="post__header">
                <div class="post__profile">
                <a href="" target="_blank" class="post__avatar">
                    <img src="${avatar}" alt="user picture" />
                </a>
                <a href="" target="_blank" class="post__user">${name}</a>
                </div>

                <button class="post__more-options">
                <img src="assets/icons/more.svg" alt="more" />
                </button>
            </div>

            <div class="post__content">
                <div class="post__medias">
                    ${pictures.map((picture) => {
                        return `<img class="post__media" src="${picture}" alt="Post Content" />`
                    }).join('')}
                </div>
                <img src='assets/icons/arrow.svg' class="post__content__left-arrow" style="visibility: hidden" onClick="prevPicture(${index})" />
                <img src='assets/icons/arrow.svg' class="post__content__right-arrow" ${pictures.length > 1 ? '' : 'style="visibility: hidden"'} onClick="nextPicture(${index})"/>
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
                ${ likes.length !== 0 && `
                    <div class="post__likes">
                        <a href="#" class="post__likes-avatar">
                        <img src="${likes[0].user.avatar}" alt="user picture" />
                        </a>

                        <span>Liked by
                        <a class="post__name--underline" href="#">${likes[0].user.name}</a> and
                        <a href="#">${likes.length - 1} others</a></span>
                    </div>
                `}
                <div class="post__description">
                    <span>
                    <a class="post__name--underline" href="" target="_blank">user</a>
                        ${content}
                    </span>
                </div>

                <span class="post__date-time">${updatedAt.toDateString()}</span>
                </div>
            </div>
        </article>`;
}
function prevPicture(index) {
    if (picturePages[index] <= 0) return;
    picturePages[index]--;
    
    const post = document.querySelectorAll('.post__content')[index];
    if (picturePages[index] === 0) {
        const prevButton = post.querySelector('.post__content__left-arrow');
        prevButton.style.setProperty('visibility', 'hidden');
    }
    const nextButton = post.querySelector('.post__content__right-arrow');
    nextButton.style.setProperty('visibility', 'visible');
    movePicture(index);
}
function nextPicture(index) {
    if (picturePages[index] >= posts[index].pictures.length - 1) return;
    picturePages[index]++;
    
    const post = document.querySelectorAll('.post__content')[index];
    if (picturePages[index] === posts[index].pictures.length - 1) {
        const nextButton = post.querySelector('.post__content__right-arrow')
        nextButton.style.setProperty('visibility', 'hidden');
    } 
    const prevButton = post.querySelector('.post__content__left-arrow')
    prevButton.style.setProperty('visibility', 'visible');
    movePicture(index);
}
function movePicture(index) {
    const post = document.querySelectorAll('.post__medias');
    post[index].style.setProperty('transform', `translateX(${-468 * picturePages[index]}px)`)
}

setPosts();