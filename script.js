const toggleThemeBtn = document.querySelector('.header__theme-button');

toggleThemeBtn.addEventListener('click', () => {
    console.log(document.documentElement.classList)
    document.documentElement.classList.toggle('darkTheme');
})