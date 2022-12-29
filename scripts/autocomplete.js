/** @type {node} 검색 입력창 Element */
const elementSearchInput = document
    .querySelector('.header__search')
    .querySelector('input');

/** 검색 입력창 autocomplte 활성화 */
elementSearchInput.setAttribute('autocomplete', 'on');

/** 검색 입력창 name 설정 */
elementSearchInput.setAttribute('name', 'nickname');

