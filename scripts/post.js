/** @type {node} 게시물 사진의 너비 */
const PICTURE_WIDTH = 468;

/** @type {Node} 게시물 리스트를 감싸는 엘리먼트 */
const postItemsElement = document.querySelector('.posts');

/** @type {Node[]} 게시물 엘리먼트 리스트 */
let postElement;

/** @type {number[]} 게시물 사진 페이지 배열 */
let picturePages;

/** @type {PostItem[]} 게시물 데이터 배열 */
let postItems;

/**
 * 게시물
 * @typedef     {object}    PostItem    게시물 정보
 * @property    {User}      user        유저 정보
 * @property    {string}    content     게시물 내용
 * @property    {string[]}  pictures    게시물 사진들
 * @property    {User[]}    likes       좋아요를 누른 유저들
 * @property    {string}    updatedAt   업데이트된 날짜
 */

/**
 * postItems의 더미데이터를 불러오는 함수
 * @returns {Promise<PostItem[]>}
 */
async function getPostItems() {
    const response = await fetch('../data/postItems.json');
    const postItems = await response.json();
    
    return postItems;
}

/**
 * postItem elements를 DOM에 배치하는 함수
 */
function drawPostItems() {
    let htmlString = '';
    for (let [index, postItem] of postItems.entries()) {
        htmlString += createPost(index, postItem);
    }
    postItemsElement.innerHTML = htmlString;
}

/**
 * postItem을 바탕으로 element를 생성하는 함수
 * @param {number}      index       postItem index
 * @param {PostItem}    postItem    postItem infomation Object
 * @returns {string}                postItem Element String
 */
function createPost(index, postItem) {
    const {
        user: {     
            avatar,     
            name        
        },
        pictures,   
        content,    
        updatedAt,  
        likes       
    } = postItem;

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
                <img src='assets/icons/arrow.svg' class="post__content__left-arrow" style="visibility: hidden" onClick="onPrevPicture(${index})" />
                <img src='assets/icons/arrow.svg' class="post__content__right-arrow" ${pictures.length > 1 ? '' : 'style="visibility: hidden"'} onClick="onNextPicture(${index})"/>
            </div>

            <div class="post__footer">
                <div class="post__buttons">
                <button class="post__button">
                    <img src="assets/icons/heart.svg" alt="heart" />
                </button>
                <button class="post__button">
                    <img src="assets/icons/comment.svg" alt="comment" />
                </button>

                <ul class="post__indicators">
                ${pictures.map((_, index) => {
                    return `<li class='post__indicators__dot ${index === 0 ? 'active' : ''}'></li>`
                }).join('')}
                </ul>

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

                <span class="post__date-time">${new Date(updatedAt).toDateString()}</span>
                </div>
            </div>
        </article>`;
}

/**
 * post carousel 다음 페이지로 전환
 * @param {number} index post index
 */
function onPrevPicture(index) {
    if (picturePages[index] <= 0) return;
    picturePages[index]--;
    
    const post = postElement[index]; // index에 해당하는 post
    const prevButton = post.querySelector('.post__content__left-arrow');  // post carousel에 종속된 이전 버튼
    const nextButton = post.querySelector('.post__content__right-arrow'); // post carousel에 종속된 다음 버튼

    if (picturePages[index] === 0) {
        prevButton.style.setProperty('visibility', 'hidden');
    }
    nextButton.style.setProperty('visibility', 'visible');
    movePicture(index);
    indicatePicture(index);
}

/**
 * post carousel 이전 페이지로 전환
 * @param {number} index post index
 */
function onNextPicture(index) {
    if (picturePages[index] >= postItems[index].pictures.length - 1) return;
    picturePages[index]++;
    
    const post = postElement[index];
    const prevButton = post.querySelector('.post__content__left-arrow');
    const nextButton = post.querySelector('.post__content__right-arrow');
    
    if (picturePages[index] === postItems[index].pictures.length - 1) {
        nextButton.style.setProperty('visibility', 'hidden');
    }
    prevButton.style.setProperty('visibility', 'visible');
    movePicture(index);
    indicatePicture(index);
}

/**
 * 현재 선택된 picture의 indicator를 활성화하고, 기존 indicator를 비활성화합니다.
 * @param {number} index post index
 */
function indicatePicture(index) {
    const indicators = postElement[index].querySelectorAll('.post__indicators__dot');
    for (let i = 0; i < indicators.length; i++) {
        if (picturePages[index] === i) {
            indicators[i].classList.add('active');
        } else {
            indicators[i].classList.remove('active');
        }
    }
}

/**
 * index번째 post의 picture를 picturePages[index]번째로 이동시키는 함수
 * @param {number} index 
 */
function movePicture(index) {
    const post = document.querySelectorAll('.post__medias');
    post[index].style.setProperty('transform', `translateX(${PICTURE_WIDTH * picturePages[index] * -1}px)`)
}

/**
 * init 함수
 */
async function init () {
    // postItems 더미 데이터 불러오기
    postItems = await getPostItems();  
    
    // post pictures 페이지 배열 지정
    picturePages = Array(postItems.length).fill(0);

    // postItems element 그리기
    drawPostItems();

    // post elements 배열 지정
    postElement = document.querySelectorAll('.post');
}
init();