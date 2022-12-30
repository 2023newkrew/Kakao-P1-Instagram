import { SUGGESTION_KEYWORDS, SEARCH_BASE_QUERY, EMPTY_KEYWORD_ALERT } from "./constants/search.js";
import debounce from "./utils/debounce.js";
import throttle from "./utils/throttle.js";

const searchHeader = document.querySelector('.header__search');
const searchInput = searchHeader.querySelector('input');
const searchButton = searchHeader.querySelector('.search-icon');
const suggestionsContainer = searchHeader.querySelector('.suggestions');

let prevInputValue = '';
let currentFocus = 0; // 0 : 검색 Input, 1 ~ : 추천 검색어 목록
let currentSuggestElements =[];

const moveTo = (index)=>{
  if(index === -1){
    currentFocus = currentSuggestElements.length;
    return;
  }
  currentFocus = index % (currentSuggestElements.length + 1);
}
const moveDown = ()=>{
  moveTo(currentFocus + 1);
  console.log(currentFocus);
}
const moveUp = ()=>{
  moveTo(currentFocus - 1);
  console.log(currentFocus);
}
const initCurrentFocus = ()=>{
  currentFocus = 0;
}

const moveController = {
  'ArrowUp': moveUp,
  'ArrowDown': moveDown,
};

const moveFocus= (keyCode)=>{
  if(currentSuggestElements.length === 0){
    return;
  }

  if(currentFocus > 0){
    currentSuggestElements[currentFocus - 1].classList.remove('focus');
  }
  
  moveController[keyCode]();
  if(currentFocus === 0){
    return;
  }
  
  currentSuggestElements[currentFocus - 1].classList.add('focus');
}


const hideSuggestions = ()=>{
  suggestionsContainer.style.setProperty('display', 'none');
}

const getEmphasizedKeyword = (suggestionKeyword, searchKeyword)=>{
  const pattern = new RegExp(searchKeyword, 'i');
  const [emphasizedWord] = suggestionKeyword.match(pattern);
  
  return suggestionKeyword.replace(emphasizedWord, `<strong>${emphasizedWord}</strong>`);
}

const getSuggestionKeyword = (suggestionKeyword, searchKeyword) => {
  const liElement = document.createElement('li');
  liElement.className = 'suggestion';
  liElement.addEventListener('mouseover', ()=>{
    liElement.classList.add('focus');
  });
  liElement.addEventListener('mouseout', ()=>{
    liElement.classList.remove('focus');
  });

  const aElement = document.createElement('a');
  aElement.className = 'suggestion__keyword';
  aElement.href = SEARCH_BASE_QUERY + encodeURI(suggestionKeyword);
  aElement.target = '_blank';
  aElement.innerHTML = getEmphasizedKeyword(suggestionKeyword, searchKeyword);


  liElement.appendChild(aElement);
  return liElement;
}

const getSuggestions = (searchKeyword, keywords) => {
  return keywords.map((keyword)=> getSuggestionKeyword(keyword, searchKeyword));
}

const isContainKeyword = (searchKeyword) => (keyword) => keyword.indexOf(searchKeyword) !== -1;

const addSuggestions = (keyword)=>{
  const searchKeyword = keyword.trim();
  const suggestedKeywords = SUGGESTION_KEYWORDS.filter(isContainKeyword(searchKeyword));
  
  const suggestions = getSuggestions(searchKeyword, suggestedKeywords);
  currentSuggestElements = suggestions;

  suggestionsContainer.replaceChildren(...suggestions);
  suggestionsContainer.style.setProperty('display', 'flex');
}

const clearSuggestions = ()=>{
  suggestionsContainer.innerHTML = '';
  hideSuggestions();
}

const search = (keyword)=>{
  const searchKeyword = keyword.trim();
  if(!searchKeyword){
    alert(EMPTY_KEYWORD_ALERT);
    return;
  }

  window.open(SEARCH_BASE_QUERY + searchKeyword);
  hideSuggestions();
}

export const initSearchHandlers = ()=>{
  const setInputValueWithSuggested = (event)=>{
    if(event.target.className === 'suggestion__keyword'){
      const keyword = event.target.innerText;
      searchInput.value = keyword;
      hideSuggestions();
    }
  }
  suggestionsContainer.addEventListener('click', setInputValueWithSuggested);

  const getSuggestionsWithCurrent = ()=>{
    initCurrentFocus();
    prevInputValue = searchInput.value;
    if(searchInput.value){
      addSuggestions(searchInput.value);
    }
  }
  searchInput.addEventListener('click', getSuggestionsWithCurrent);

  const handleSearchWithEnterKey = (event)=>{
    const { code } = event;
  
    if(code === 'Enter'){
      search(searchInput.value);
      searchInput.blur();
    }
  }
  searchInput.addEventListener('keypress', handleSearchWithEnterKey);

  searchInput.addEventListener('keyup', debounce((event)=>{
    const { code } = event;
    if(!searchInput.value){
      clearSuggestions();
      return;
    }
  
    if(code === 'Escape'){
      hideSuggestions();
      return;
    }

    if(code === 'ArrowDown' || code === 'ArrowUp'){
      return;
    }

    initCurrentFocus();
    prevInputValue = searchInput.value;
    addSuggestions(searchInput.value);
  }, 200));

  searchInput.addEventListener('keydown', throttle((event)=>{
    const { code } = event;

    if(code !== 'ArrowDown' && code !== 'ArrowUp'){
      return;
    }
    
    moveFocus(code);
  
    if(currentFocus === 0){
      searchInput.value = prevInputValue;
    }else{
      searchInput.value = currentSuggestElements[currentFocus - 1].innerText;
    }
  }, 50));

  searchButton.addEventListener('click', ()=>{
    search(searchInput.value);
  });
}