/** @type {node} 스토리의 너비 */
const STORY_WIDTH = 80;

/** @type {node} 스토리 전체 영역을 감싸는 엘리먼트 */
const storyContainerElement = document.querySelector('.stories');

/** @type {node} 스토리 리스트를 감싸는 엘리먼트 */
let storyWrapperElement;

/** @type {User[]} 스토리를 올린 유저 배열*/
let storyItems;

/** @type {Node} 스토리 이전 버튼 */
let prevButton;

/** @type {Node} 스토리 다음 버튼 */
let nextButton;

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
    
    let elementString = '<div class="stories__content">';
    elementString = '<div class="stories__content">';
    for (let storyItem of storyItems) {
        elementString += createStory(storyItem);
    }
    elementString += '</div>';
    elementString += '<button onClick="pageController.onPrevStory()" style="display: none" class="stories__arrow__left"><img src="assets/icons/arrow.svg" /></button>';
    elementString += `<button onClick="pageController.onNextStory()" style="${storyItems.length < 6 ? "display: none": ""}" class="stories__arrow__right"><img src="assets/icons/arrow.svg" /></button>`;

    storyContainerElement.innerHTML = elementString;
}

/**
 * storyItem을 바탕으로 element를 생성하는 함수
 * @param   {User}      user    스토리를 올린 유저
 * @returns {string}            storyItem Element String
 */
function createStory ({avatar, name}) {
    return (`
        <button class="story ">
            <div class="story__avatar">
            <div class="story__border">
                <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
                </svg>
            </div>
            <div class="story__picture">
                <img src=${avatar} alt="${name} picture" />
            </div>
            </div>
            <span class="story__user">${name}</span>
        </button>
    `)
}


/**
 * story page controll 객체
 */
const pageController = {
    /** @type {number} 스토리 페이지 변수 */
    storyPage: 0,

    /** 스*/
    moveStory: function () {
        storyWrapperElement.style.setProperty('transform', `translate(${STORY_WIDTH * this.storyPage * -1}px)`);
    },
    onPrevStory: function () {
        if (this.storyPage <= 0) return;
        this.setNextStoryButtonVisible(true);
        
        this.storyPage--;
        this.moveStory();

        if (this.storyPage === 0) this.setPrevStoryButtonVisible(false);
    },
    onNextStory: function () {
        if (this.storyPage >= storyItems.length - 5) return;
        this.setPrevStoryButtonVisible(true);

        this.storyPage++;
        this.moveStory();

        if (this.storyPage === storyItems.length - 5) this.setNextStoryButtonVisible(false);
    },
    setPrevStoryButtonVisible: function (visible) {
        if (visible === true) {
            prevButton.style.setProperty('display', 'block');
        } else {
            prevButton.style.setProperty('display', 'none');
        }
    },
    setNextStoryButtonVisible: function (visible) {
        
        if (visible === true) {
            nextButton.style.setProperty('display', 'block');
        } else {
            nextButton.style.setProperty('display', 'none');
        }
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

    // storyItems element를 감싸는 element 지정
    storyWrapperElement = document.querySelector('.stories__content')

    // story pagination prev button 지정
    prevButton = document.querySelector('.stories__arrow__left');

    // story pagination next button 지정
    nextButton = document.querySelector('.stories__arrow__right');
}
init();