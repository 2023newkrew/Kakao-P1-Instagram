function initDarkMode() {
    loadDarkMode();
    addDarkModeHandler();
}
function loadDarkMode() {
    let isDark = localStorage.getItem('isDark') || false;
    setDarkMode(isDark);
}
function addDarkModeHandler() {
    const elementMoon = document.querySelector('.header__theme-button-moon');
    const elementSun = document.querySelector('.header__theme-button-sun');

    elementMoon.addEventListener('click', () => {
        setDarkMode(true);
    })
    elementSun.addEventListener('click', () => {
        setDarkMode(false);
    })
}
function setDarkMode(isDark) {
    isDark = isDark === 'true' || isDark === true
    
    if (isDark === true) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    saveDarkMode(isDark);
}
function saveDarkMode(isDark) {
    localStorage.setItem('isDark', isDark)
}
initDarkMode();