import { AUTO_COMPLETE_LOCAL_KEYWORDS, DISPLAY, GOOGLE_SEARCH_BASE_URL, MAXIMUM_RESULT_COUNT } from './const.js';


const initAutoComplete = () => {
  const searchInputEl = document.querySelector('.header__search input');
  const searchResultEl = document.querySelector('.header__search-result');

  const searchResultTemplate = (result) => {
    return `
      <li class='header__search-result-item'>
        <a href='${`${GOOGLE_SEARCH_BASE_URL}${result}`}' class='header__search-result-link'>
          <div class='header__search-result-content'>
            <p>${result}</p>
          </div>
        </a>
      </li>
    `;
  };

  const searchResultList = (results) => {
    const hasResults = results.length > 0;
    
    return `
      <ul class='header__search-result-list'>
        ${hasResults
          ? results.map((result) => searchResultTemplate(result)).join('')
          : `<li class='header__search-result-item'>No result</li>`}
      </ul>
    `;
  };

  const search = (keyword) => {
    const regex = new RegExp(`^${keyword}`, 'gi');

    const result = AUTO_COMPLETE_LOCAL_KEYWORDS
      .filter((keyword) => keyword.match(regex))
      .slice(0, MAXIMUM_RESULT_COUNT);

    searchResultEl.innerHTML = searchResultList(result);
  };

  const onTextInput = (event) => {
    const keyword = event.target.value;

    if (keyword.length === 0) {
      searchResultEl.style.display = DISPLAY.NONE;
      return;
    }

    if (searchResultEl.style.display !== DISPLAY.BLOCK) searchResultEl.style.display = DISPLAY.BLOCK;
    search(keyword);
  };

  searchInputEl.addEventListener('input', onTextInput);
};

export default initAutoComplete;