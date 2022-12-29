const toggleThemeButtonElement = document.querySelector('.header__theme-button');

toggleThemeButtonElement.addEventListener('click', () => {
    document.documentElement.classList.toggle('darkTheme');
    setTheme(document.documentElement.classList.value);
})

function getTheme() {
    return localStorage.getItem('theme')
}

function setTheme(theme) {
    localStorage.setItem('theme', theme)
}

(
    function initTheme() {
        const localTheme = getTheme()
        if (localTheme === 'darkTheme') document.documentElement.classList.toggle('darkTheme');
    }
)()