import { SUGGESTION_KEYWORDS, SEARCH_BASE_QUERY, EMPTY_KEYWORD_ALERT } from "./constants/search.js";
import debounce from "./utils/debounce.js";
import throttle from "./utils/throttle.js";

const ARROW_KEY = {
  'ArrowUp': -1,
  'ArrowDown': 1,
};

const searchHeader = document.querySelector('.header__search');
const searchInput = searchHeader.querySelector('input');
const searchButton = searchHeader.querySelector('.search-icon');
const suggestionsContainer = searchHeader.querySelector('.suggestions');

let prevInputValue = '';
let currentFocus = 0;
let currentSuggestElements =[];

const moveFocus= (toMove)=>{
  if(currentSuggestElements.length === 0){
    return;
  }

  if(currentFocus !== -1){
    currentSuggestElements[currentFocus].classList.remove('focus');
  }
  
  currentFocus += toMove;
  if(currentFocus=== -1) {
    return;
  }
  if(currentFocus === currentSuggestElements.length){
    currentFocus = -1;
    return;
  }
  if (currentFocus === -2){
    currentFocus = currentSuggestElements.length - 1;
  }
  currentSuggestElements[currentFocus].classList.add('focus');
 
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
  suggestionsContainer.addEventListener('click', (event)=>{
    if(event.target.className === 'suggestion__keyword'){
      const keyword = event.target.innerText;
      searchInput.value = keyword;
      hideSuggestions();
    }
  });

  searchInput.addEventListener('click', ()=>{
    currentFocus = -1;
    prevInputValue = searchInput.value;
    if(searchInput.value){
      addSuggestions(searchInput.value);
    }
  });

  searchInput.addEventListener('keypress', (event)=>{
    const { code } = event;

    if(code === 'Enter'){
      search(searchInput.value);
      searchInput.blur();
    }
  });

  searchInput.addEventListener('keyup', debounce((event)=>{
    if(!searchInput.value){
      clearSuggestions();
      return;
    }
  
    if(event.code === 'ArrowDown' || event.code === 'ArrowUp'){
      return;
    }
    currentFocus = -1;
    prevInputValue = searchInput.value;
    addSuggestions(searchInput.value);
  }, 200));

  searchInput.addEventListener('keydown', throttle((event)=>{
    const { code } = event;
    if(code !== 'ArrowDown'  &&code !== 'ArrowUp'){
      return;
    }
    
    moveFocus(ARROW_KEY[code]);

  
    if(currentFocus === -1){
      searchInput.value = prevInputValue;
    }else{
      searchInput.value = currentSuggestElements[currentFocus].innerText;
    }
  }, 10));

  searchButton.addEventListener('click', ()=>{
    search(searchInput.value);
  });
}