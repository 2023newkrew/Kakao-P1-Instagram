import debounce from "./utils/debounce.js";

const autoCompleteDataList = [
    { key: 1, name: '데이터1' },
    { key: 2, name: '데이터2' },
    { key: 3, name: '자바스크립트' },
    { key: 4, name: 'Json' },
    { key: 5, name: '카카오' },
    { key: 6, name: '주식' },
    { key: 7, name: 'Joy' },
    { key: 8, name: '나는 긴 텍스트입니다 ! 나는 긴 텍스트입니다 ! 나는 긴 텍스트입니다 !' }
];

const headerSearchElement = document.querySelector('.header__search');
const searchButtonElement = headerSearchElement.querySelector('img')

const searchElement = document.querySelector('.search__area');
const textAreaElement = document.querySelector('.recommend__area');

searchButtonElement.addEventListener('click', () => {
    const text = searchElement.value;

    if (text !== '') {
        window.open(`https://www.google.com/search?q=${text}`)
        searchElement.value = '';
        textAreaElement.innerHTML = ``;
    }
})

headerSearchElement.addEventListener('click', () => {
    textAreaElement.style.display = 'block';
})

headerSearchElement.addEventListener('focusout', () => {
    textAreaElement.style.display = 'none';
})

textAreaElement.addEventListener('mousedown', (event) => {
    const text = event.target.innerText;
    if (text !== '') {
        window.open(`https://www.google.com/search?q=${text}`);
        searchElement.value = '';
        textAreaElement.innerHTML = ``;
    }
})

searchElement.addEventListener('keyup', debounce((event) => {
    const text = searchElement.value;

    if (event.key == "Enter") {
        if (text !== '') {
            window.open(`https://www.google.com/search?q=${text}`)
            searchElement.value = '';
            textAreaElement.innerHTML = ``;
        }
    }

    if (text !== '') {
        let elementString = ``;
        autoCompleteDataList.forEach(value => {
            if (value.name.match(`^${text}`)) {
                elementString += `
                <a href="https://www.google.com/search?q=${value.name}" target="_blank">
                    <div key=${value.key}>${value.name}</div>
                </a>
            `;
            }
        });

        textAreaElement.innerHTML = elementString;
    }
    else if (text === '') textAreaElement.innerHTML = ``;
}, 200))
