const autoCompleteData = [
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
const searchElement = document.querySelector('.search__area');
const textAreaElement = document.querySelector('.recommend__area');

const searchButtonElement = document.querySelector('.header__search img')
searchButtonElement.style.cursor = 'pointer';

searchButtonElement.addEventListener('click', (event) => {
    const text = searchElement.value;

    if (text !== '') {
        window.open(`https://www.google.com/search?q=${text}`)
        searchElement.value = '';
        textAreaElement.innerHTML = ``;
    }
})

headerSearchElement.addEventListener('click', (event) => {
    textAreaElement.style.display = 'block';
})

headerSearchElement.addEventListener('focusout', (event) => {
    textAreaElement.style.display = 'none';
})

textAreaElement.addEventListener('mousedown', (event) => {
    const text = event.target.innerText;
    window.open(`https://www.google.com/search?q=${text}`);

    searchElement.value = '';
    textAreaElement.innerHTML = ``;
})

searchElement.addEventListener('keyup', (event) => {
    console.log('keyup');
    const text = searchElement.value;

    if (event.key == "Enter") {
        if (text !== '') {
            window.open(`https://www.google.com/search?q=${text}`)

            searchElement.value = '';
            textAreaElement.innerHTML = ``;
        }
    }

    if (text !== '') {  //빈줄이 들어오면
        let elementString = ``;
        autoCompleteData.forEach(function (arg) {
            if (arg.name.indexOf(text) > -1) {
                elementString += `
                <a href="https://www.google.com/search?q=${arg.name}" target="_blank">
                    <div key=${arg.key}>${arg.name}</div>
                </a>`
            }
        });
        textAreaElement.innerHTML = elementString;
    }
    else if (text === '') textAreaElement.innerHTML = ``;
})
