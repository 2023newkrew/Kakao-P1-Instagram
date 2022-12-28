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

  if(emphasizedWord && emphasizedWord.length > 0){
    return suggestionKeyword.replace(emphasizedWord[0], `<strong>${emphasizedWord[0]}</strong>`);
  }
  return suggestionKeyword;
}

const getSuggestionKeywordTemplate = (suggestionKeyword, searchKeyword) => 
  `<li class="suggestion">
      <a class="suggestion__keyword" href=${SEARCH_BASE_QUERY + encodeURI(suggestionKeyword)} target="_blank">
        ${getEmphasizedKeyword(suggestionKeyword, searchKeyword)}
      </a>
  </li>`;

const findMatchResults = (keyword) => SUGGESTION_KEYWORDS.filter((suggestionKeyword)=>{
    const hasKeyword = new RegExp(keyword, 'gi');
    return suggestionKeyword.match(hasKeyword);
  });

const addSuggestions = (keyword)=>{
  const searchKeyword = keyword.trim();
  const matchResults = findMatchResults(searchKeyword);
  if(matchResults.length === 0){
    return;
  }

  const suggestionKeywordsTemplates = matchResults
                                        .map((suggestionKeyword)=> getSuggestionKeywordTemplate(suggestionKeyword, searchKeyword))
                                        .join('\n');
  suggestionsContainer.innerHTML = suggestionKeywordsTemplates;
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