/** @type {node} 검색 입력창 Element */
const searchInputElement = document.querySelector('.header__search input');

/** 검색 입력창 autocomplte 활성화 */
searchInputElement.setAttribute('autocomplete', 'on');

/** 검색 입력창 name 설정 */
searchInputElement.setAttribute('name', 'nickname');

