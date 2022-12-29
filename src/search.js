const ref = [
    { key: 1, name: '데이터1' },
    { key: 2, name: '데이터2' },
    { key: 3, name: '자바스크립트' },
    { key: 4, name: 'Json' },
    { key: 4, name: '카카오' },
    { key: 4, name: '주식' },
    { key: 4, name: 'Joy' },
    { key: 3, name: '나는 긴 텍스트입니다 ! 나는 긴 텍스트입니다 ! 나는 긴 텍스트입니다 !' }
];

const search = document.querySelector('.search__area');
const textArea = document.querySelector('.recommend__area');

const searchButton = document.querySelector('.header__search img')
searchButton.style.cursor = 'pointer';

searchButton.addEventListener('click', () => {
    const text = search.value;

    if (text !== '') {
        window.open(`https://www.google.com/search?q=${text}`)
        search.value = '';
        textArea.innerHTML = ``;
    }
})

search.addEventListener('keyup', (event) => {
    const text = search.value;

    if (event.key == "Enter") {
        window.open(`https://www.google.com/search?q=${text}`)

        search.value = '';
        textArea.innerHTML = ``;
    }

    if (text !== '') {  //빈줄이 들어오면
        let elementString = ``;
        ref.forEach(function (arg) {
            if (arg.name.indexOf(text) > -1) {
                elementString += `
                <a href="https://www.google.com/search?q=${arg.name}" target="_blank">
                    <div key=${arg.key}>${arg.name}</div>
                </a>`
            }
        });
        textArea.innerHTML = elementString;
    }
    else if (text === '') textArea.innerHTML = ``;
})