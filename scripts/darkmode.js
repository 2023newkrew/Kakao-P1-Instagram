
/**
 * localstorage에 저장된 다크모드 상태를 가져오고 적용합니다.
 */
function loadDarkMode() {
    const isDark = localStorage.getItem('isDark') === 'true' ? true : false;
    setDarkMode(isDark);
}

/**
 * 다크모드를 켜고 끄는 함수
 * @param {boolean} isDark 
 */
function setDarkMode(isDark) {
    if (isDark === true) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * localstorage에 다크모드 상태를 저장하는 함수
 * @param {boolean} isDark 
 */
function saveDarkMode(isDark) {
    localStorage.setItem('isDark', isDark)
}

/**
 * 다크모드 버튼에 다크모드 전환을 위한 이벤트핸들러(click)를 등록하는 함수
 */
 function addDarkModeHandler() {
    const elementMoon = document.querySelector('.header__theme-button-moon');
    const elementSun = document.querySelector('.header__theme-button-sun');

    elementMoon.addEventListener('click', () => {
        setDarkMode(true);
        saveDarkMode(true);
    })
    elementSun.addEventListener('click', () => {
        setDarkMode(false);
        saveDarkMode(false);
    })
}

/**
 * init 함수
 */
function init() {
    // 기존 DarkMode 상태 불러오기
    loadDarkMode();

    // 다크모드 변환 핸들러 적용
    addDarkModeHandler();
}
init();