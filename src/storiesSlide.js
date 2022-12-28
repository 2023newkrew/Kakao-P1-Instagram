(function makeStory(dummyStoryCount) {
    const storiesContent = document.querySelector('.stories__content');

    let elementString = '';
    for (let i = 1; i <= dummyStoryCount; i++) {
        elementString += `
        <button class="story ">
            <div class="story__avatar">
                <div class="story__border">
                    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                        <circle r="31" cy="32" cx="32" />
                    </svg>
                </div>
                <div class="story__picture">
                    <img src="assets/images/avatar.png" alt="user picture" />
                </div>
            </div>
            <span class="story__user">user${i}</span>
        </button>
        `
    }

    storiesContent.innerHTML = elementString;
})(20)


const storySlidesElement = document.querySelector('.stories__content');
const storySlidesImgElements = document.querySelectorAll('.stories__content button');

const storiesElement = document.querySelector('.stories');

let currentStoryIndex = 0;
const storySlideCount = storySlidesImgElements.length;
const storySlideWidth = storiesElement.clientWidth;

const storyGap = 23;
const storyImgWidth = 64;
const storyCount = parseInt(storySlideWidth / (storyGap + storyImgWidth));

const moveStorySlide = (num) => {
    storySlidesElement.style.setProperty('transform', `translateX(${-(num * ((storyImgWidth + storyGap) * 3))}px)`);
    currentStoryIndex = num;
}

const storyPrevButton = document.querySelector('.stories__controller-prev');

storyPrevButton.addEventListener('click', function () {
    if (currentStoryIndex !== 0) moveStorySlide(currentStoryIndex - 1);
})

const storyNextButton = document.querySelector('.stories__controller-next');

storyNextButton.addEventListener('click', function () {
    if (currentStoryIndex !== parseInt(storySlideCount / 3)) moveStorySlide(currentStoryIndex + 1);
})