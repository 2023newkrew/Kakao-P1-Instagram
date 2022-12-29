import { MOCK_STORIES } from "./constants/story.js";

const storySection = document.querySelector('.content .stories');
const storiesContainer = storySection.querySelector('.stories__content');

const renderProfileImage = ({user, thumbnailPath})=>{
  if(!thumbnailPath){
    return `<img class="avatar" src="assets/images/avatar.png" alt="user picture" />`;
  }

  return `<img src="${thumbnailPath}" alt="${user} 프로필 사진" width="64" height="64" />`;
}

const getStoryTemplate = ({ id, user, thumbnailPath, active})=>{
  return `<li id="profile-${id}">
    <button class="story ${active ? 'active' : ''}">
      <div class="story__avatar">
        <div class="story__border">
          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <circle r="31" cy="32" cx="32" />
          </svg>
        </div>
        <div class="story__picture">
          ${renderProfileImage({ user, thumbnailPath })}
        </div>
      </div>
      <span class="story__user">${user}</span>
    </button>
  </li>`;
}

const sortStories = (stories)=>{
  const activeStories = [];
  const inactiveStories = [];

  for(const story of stories){
    if(story.active){
      activeStories.push(story);
    } else{
      inactiveStories.push(story);
    }
  }

  return activeStories.concat(inactiveStories);
}

const renderStories = ()=>{
  const stories = sortStories(MOCK_STORIES);

  storiesContainer.innerHTML = stories.map(getStoryTemplate).join('\n');
}
export const initStory = ()=>{
  renderStories();
}