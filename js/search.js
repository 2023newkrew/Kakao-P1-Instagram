import { SUGGESTION_KEYWORDS, SEARCH_BASE_QUERY, EMPTY_KEYWORD_ALERT } from "./constants/search.js";

const searchHeader = document.querySelector('.header__search');
const searchInput = searchHeader.querySelector('input');
const searchButton = searchHeader.querySelector('.search-icon');
const suggestionsContainer = searchHeader.querySelector('.suggestions');

const hideSuggestions = ()=>{
  suggestionsContainer.style.setProperty('display', 'none');
}

const getEmphasizedKeyword = (suggestionKeyword, searchKeyword)=>{
  const pattern = new RegExp(searchKeyword, 'i');
  const emphasizedWord = suggestionKeyword.match(pattern);
  
  if(!emphasizedWord) return suggestionKeyword;
  
  return suggestionKeyword.replace(emphasizedWord[0], `<strong>${emphasizedWord[0]}</strong>`);
 
}

const getSuggestionKeywordTemplate = (suggestionKeyword, searchKeyword) => 
  `<li class="suggestion">
      <a class="suggestion__keyword" href=${SEARCH_BASE_QUERY + encodeURI(suggestionKeyword)} target="_blank">
        ${getEmphasizedKeyword(suggestionKeyword, searchKeyword)}
      </a>
  </li>`;

const getSuggestionsTemplate = (searchKeyword) => {
  const keywordTemplates = SUGGESTION_KEYWORDS.reduce((suggestions, suggestion)=>{
    if(suggestion.indexOf(searchKeyword) === -1){
      return suggestions;
    }

    suggestions.push(getSuggestionKeywordTemplate(suggestion, searchKeyword));
    return suggestions;
  }, []);
  return keywordTemplates.join('\n');
}

const addSuggestions = (keyword)=>{
  const searchKeyword = keyword.trim();

  const suggestionsTemplate = getSuggestionsTemplate(searchKeyword);

  suggestionsContainer.innerHTML = suggestionsTemplate;
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

  searchInput.addEventListener('keypress', (event)=>{
    const { code } = event;

    if(code === 'Enter'){
      search(searchInput.value);
      searchInput.blur();
    }
  });

  searchInput.addEventListener('keyup', ()=>{
    if(!searchInput.value){
      clearSuggestions();
      return;
    }

    addSuggestions(searchInput.value);
  });

  searchButton.addEventListener('click', ()=>{
    search(searchInput.value);
  });
}