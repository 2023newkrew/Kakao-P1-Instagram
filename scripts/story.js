/*
    더미 데이터입니다.
*/
const stories = [
    {
        avatar: 'assets/images/avatar.png',
        name: 'hash.table'
    },
    {
        avatar: 'assets/images/avatar.png',
        name: 'tori.ham'
    },
    {
        avatar: 'assets/images/avatar.png',
        name: 'muse.le'
    },
    {
        avatar: 'assets/images/avatar.png',
        name: 'carter.p'
    },
    {
        avatar: 'assets/images/avatar.png',
        name: 'pepsi.colla'
    },
    {
        avatar: 'assets/images/avatar.png',
        name: 'edan.gwan'
    },
    {
        avatar: 'assets/images/avatar.png',
        name: 'frey.ryu'
    },
];

/*
    setStories(): void
    
    스토리 배열을 바탕으로 elementStories를 그려주는 함수입니다.
*/
function setStories() {
    const elementStories = document.querySelector('.stories');
    
    let elementString = '<div class="stories__content">';
    elementString = '<div class="stories__content">';
    for (let story of stories) {
        elementString += makeStory(story);
    }
    elementString += '</div>';
    elementString += '<button onClick="pageController.onPrevStory()" style="display: none" class="stories__arrow__left"><img src="assets/icons/arrow.svg" /></button>';
    elementString += `<button onClick="pageController.onNextStory()" style="${stories.length < 6 ? "display: none": ""}" class="stories__arrow__right"><img src="assets/icons/arrow.svg" /></button>`;

    elementStories.innerHTML = elementString;
}

/*
    makeStory(user: User): string

    interface User = {
        avatar: string,
        name: string
    }
    
    스토리 원소를 바탕으로 하나의 스토리 html을 반환해주는 함수입니다.
*/
function makeStory ({avatar, name}) {
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

/* 
    스토리 페이지를 컨트롤하기 위한 객체입니다.
*/
const pageController = {
    storyPage: 0,
    moveStory: function () {
        const elementStory = document.querySelector('.stories__content');
        elementStory.style.setProperty('transform', `translate(${this.storyPage * -80}px)`);
    },
    onPrevStory: function () {
        if (this.storyPage <= 0) return;
        this.setNextStoryButtonVisible(true);
        
        this.storyPage--;
        this.moveStory();

        if (this.storyPage === 0) this.setPrevStoryButtonVisible(false);
    },
    onNextStory: function () {
        if (this.storyPage >= stories.length - 5) return;
        this.setPrevStoryButtonVisible(true);

        this.storyPage++;
        this.moveStory();

        if (this.storyPage === stories.length - 5) this.setNextStoryButtonVisible(false);
    },
    setPrevStoryButtonVisible: function (visible) {
        const elementPrevStoryButton = document.querySelector('.stories__arrow__left')
        if (visible === true) {
            elementPrevStoryButton.style.setProperty('display', 'block');
        } else {
            elementPrevStoryButton.style.setProperty('display', 'none');
        }
    },
    setNextStoryButtonVisible: function (visible) {
        const elementNextStoryButton = document.querySelector('.stories__arrow__right')
        if (visible === true) {
            elementNextStoryButton.style.setProperty('display', 'block');
        } else {
            elementNextStoryButton.style.setProperty('display', 'none');
        }
    }
}

// init function
setStories();