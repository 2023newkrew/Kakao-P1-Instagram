import { AUTO_COMPLETE_LOCAL_KEYWORDS, GOOGLE_SEARCH_BASE_URL, MAXIMUM_RESULT_COUNT } from './const.js';


const initAutoComplete = () => {
  const searchInputEl = document.querySelector('.header__search input');
  const searchResultEl = document.querySelector('.header__search-result');

  const getSearchResultTemplate = (result) => {
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

  const getSearchResultList = (results) => {
    return `
      <ul class='header__search-result-list'>
        ${results.length > 0
          ? results.map((result) => getSearchResultTemplate(result)).join('')
          : `<li class='header__search-result-item'>No result</li>`}
      </ul>
    `;
  };

  const search = (searchKeyword) => {
    const trimKeyword = searchKeyword.trim();

    const regex = new RegExp(`(^${trimKeyword}| +${trimKeyword})`, 'gi');

    const result = AUTO_COMPLETE_LOCAL_KEYWORDS
      .filter((keyword) => keyword.match(regex))
      .slice(0, MAXIMUM_RESULT_COUNT);

    searchResultEl.innerHTML = getSearchResultList(result);
  };

  const onTextInput = ({ target: { value }}) => {
    if (value.length === 0) {
      searchResultEl.classList.remove('header__search-result--show');
      return;
    }

    searchResultEl.classList.add('header__search-result--show');
    search(value);
  };

  searchInputEl.addEventListener('input', onTextInput);
};

export default initAutoComplete;