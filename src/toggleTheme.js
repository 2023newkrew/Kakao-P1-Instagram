const toggleThemeButton = document.querySelector('.header__theme-button');

toggleThemeButton.addEventListener('click', () => {
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
    function init() {
        const localTheme = getTheme()
        if (localTheme === 'darkTheme') document.documentElement.classList.toggle('darkTheme');
    }
)()