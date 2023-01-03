/** @type {number} 스토리의 너비 */
const STORY_WIDTH = 80;

/** @type {HTMLElement} 스토리 전체 영역을 감싸는 엘리먼트 */
const storyContainerElement = document.querySelector('.stories');

/** @type {HTMLElement} 스토리 리스트를 감싸는 엘리먼트 */
let storyWrapperElement;

/** @type {User[]} 스토리를 올린 유저 배열*/
let storyItems;

/** @type {HTMLElement} 스토리 이전 버튼 */
let prevButtonElement;

/** @type {HTMLElement} 스토리 다음 버튼 */
let nextButtonElement;

const options = {
  root: storyContainerElement,
  rootMargin: '0px',
  threshold: 1.0
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const { isIntersecting, target: { id } } = entry;

        console.log(id, isIntersecting);
        switch (id) {
            case 'first':
                if (isIntersecting) {
                    pageController.setPrevStoryButtonVisible(false);
                } else {
                    pageController.setPrevStoryButtonVisible(true);
                }
                break;
            case 'last':
                if (isIntersecting && id === 'last') {
                    pageController.setNextStoryButtonVisible(false);
                } else {
                    pageController.setNextStoryButtonVisible(true);
                }
                break;
            default:
        }
    }) 
}, options);

/**
 * 유저
 * @typedef     {object}    User    유저 정보
 * @property    {string}    avatar  유저 프로필 사진
 * @property    {string}    name    유저 이름
 */

/**
 * storyItems의 더미데이터를 불러오는 함수
 * @returns Promise<Story[]>
 */
async function getStoryItems() {
    const response = await fetch('../data/storyItems.json');
    const storyItems = await response.json();
    
    return storyItems;
}

/**
 * storyItem elements를 DOM에 배치하는 함수
 */
function drawStoryItems() {
    const prevButtonImageElement = document.createElement('img');
    prevButtonImageElement.setAttribute('src', 'assets/icons/arrow.svg');
    prevButtonElement = createElementWithClass('button', {}, 'stories__arrow__left');
    prevButtonElement.addEventListener('click', () => pageController.onPrevStory());
    prevButtonElement.appendChild(prevButtonImageElement);

    const nextButtonImageElement = document.createElement('img');
    nextButtonImageElement.setAttribute('src', 'assets/icons/arrow.svg');
    nextButtonElement = createElementWithClass('button', {}, 'stories__arrow__right');
    nextButtonElement.addEventListener('click', () => pageController.onNextStory());
    nextButtonElement.appendChild(nextButtonImageElement);
    
    storyWrapperElement = createElementWithClass('div', {}, 'stories__content');
    for (let storyItem of storyItems) {
        storyWrapperElement.appendChild(createStoryElement(storyItem));
    }

    const storyFragmentElement = document.createDocumentFragment();
    storyFragmentElement.appendChild(storyWrapperElement);
    storyFragmentElement.appendChild(prevButtonElement);
    storyFragmentElement.appendChild(nextButtonElement);

    storyContainerElement.innerHTML = '';
    storyContainerElement.appendChild(storyFragmentElement);
}

/**
 * storyItem을 바탕으로 element를 생성하는 함수
 * @param   {User}      user    스토리를 올린 유저
 * @returns {HTMLElement}              storyItem Element
 */
function createStoryElement ({avatar, name}) {
    const storyBorderElement = createElementWithClass('div', {}, 'story__border');
    storyBorderElement.innerHTML = `
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <circle r="31" cy="32" cx="32" />
        </svg>
    `;

    const avatarImageElement = createElementWithClass('img')
    avatarImageElement.setAttribute('src', avatar);
    avatarImageElement.setAttribute('alt', `${name} picture`);

    const storyPictureElement = createElementWithClass('div', {}, 'story__picture');
    storyPictureElement.appendChild(avatarImageElement);

    const storyAvatarElement = createElementWithClass('div', {}, 'story__avatar');
    storyAvatarElement.appendChild(storyBorderElement);
    storyAvatarElement.appendChild(storyPictureElement);
    
    const storyUserElement = createElementWithClass('span', {}, 'story__user')
    storyUserElement.innerText = name;

    const storyElement = createElementWithClass('button', {}, 'story');
    storyElement.appendChild(storyAvatarElement);
    storyElement.appendChild(storyUserElement);
    
    return storyElement;
    
}

/**
 * 
 * @param {string} tagName 
 * @param {ElementCreationOptions | undefined} options 
 * @param {string | undefined} className 
 * @returns {HTMLElement}
 */
function createElementWithClass (tagName, options, className) {
    const element = document.createElement(tagName, options);
    
    if (className) {
        element.classList.add(className);
    }
    return element;
}

/**
 * story page controll 객체
 */
const pageController = {
    /** @type {number} 스토리 페이지 변수 */
    storyPage: 0,
    moveStory: function () {
        storyWrapperElement.style.setProperty('transform', `translate(${STORY_WIDTH * this.storyPage * -1}px)`);
    },
    onPrevStory: function () {
        if (this.storyPage <= 0) return;
    
        this.storyPage--;
        this.moveStory();
    },
    onNextStory: function () {
        if (this.storyPage >= storyItems.length - 5) return;
    
        this.storyPage++;
        this.moveStory();
    },
    setPrevStoryButtonVisible: function (visible) {
        if (visible === true) {
            prevButtonElement.style.setProperty('display', 'block');
        } else {
            prevButtonElement.style.setProperty('display', 'none');
        }
    },
    setNextStoryButtonVisible: function (visible) {
        if (visible === true) {
            nextButtonElement.style.setProperty('display', 'block');
        } else {
            nextButtonElement.style.setProperty('display', 'none');
        }
    },
    observeStory: function () {
        const pictureElements = storyWrapperElement.querySelectorAll('.story__picture');
        const firstElement = pictureElements[0];
        const lastElement = pictureElements[pictureElements.length - 1];

        firstElement.setAttribute('id', 'first');
        lastElement.setAttribute('id', 'last');
        observer.observe(firstElement);
        observer.observe(lastElement);
    }
}

/** 
 * init 함수
 */
async function init () {
    // storyItems 더미 데이터 불러오기
    storyItems = await getStoryItems();

    // storyItems element 그리기
    drawStoryItems();

    pageController.observeStory();
}
init();