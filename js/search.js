const suggestions = [ '아이유','아이유 자작곡 테스트 텍스트 긴 텍스트','아이들','아기','아파트','아파트 전세','아파트 매매', '아이유 콘서트', '아이유 자작곡', '아이유 소속사', '강남','강남역', '강남역 맛집', '카카오', '카카오 아지트', '판교 카카오', '판교역', '신분당선 판교역', '광교역','광교 중앙역', '신분당선 광교중앙역', '뉴크루','라이언','춘식이','라이언 춘식이','춘식도락','하찮은 춘식이' ];

const SEARCH_BASE_QUERY = 'https://www.google.com/search?q=';

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

const findMatchResults = (keyword) => suggestions.filter((suggestionKeyword)=>{
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
    alert('검색어를 입력해주세요');
    return;
  }

  window.open(`https://www.google.com/search?q=${searchKeyword}`);
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