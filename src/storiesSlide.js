(function makeDummyStory(dummyStoryCount) {
    const storiesContent = document.querySelector('.stories__content');

    let elementString = '';
    for (let i = 1; i <= dummyStoryCount; i++) {
        elementString += `
        <li>
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
        </li>
        `
    }

    storiesContent.innerHTML = elementString;
})(20)

const storiesElement = document.querySelector('.stories');
const storySlidesElement = storiesElement.querySelector('.stories__content');
const storySlidesImgElements = storySlidesElement.querySelectorAll('li');

let currentStoryIndex = 0;
const storySlideCount = storySlidesImgElements.length;

const storyGap = 23;
const storyImgWidth = 64;

const limitCount = storySlideCount % 3 !== 0 ?
    parseInt(storySlideCount / 3) :
    parseInt(storySlideCount / 3) - 1;

const moveStorySlide = (num) => {
    storySlidesElement.style.setProperty('transform', `translateX(${-(num * ((storyImgWidth + storyGap) * 3))}px)`);
    currentStoryIndex = num;

    storyPrevButton.style.opacity = currentStoryIndex === 0 ? 0 : 100;
    storyNextButton.style.opacity = currentStoryIndex === limitCount ? 0 : 100;
}

const storyPrevButton = document.querySelector('.stories__controller-prev');
storyPrevButton.style.opacity = currentStoryIndex === 0 ? 0 : 100;

storyPrevButton.addEventListener('click', function () {
    if (currentStoryIndex !== 0) moveStorySlide(currentStoryIndex - 1);
})

const storyNextButton = document.querySelector('.stories__controller-next');
storyNextButton.style.opacity = currentStoryIndex === limitCount ? 0 : 100;

storyNextButton.addEventListener('click', function () {
    if (currentStoryIndex !== limitCount) moveStorySlide(currentStoryIndex + 1);
})