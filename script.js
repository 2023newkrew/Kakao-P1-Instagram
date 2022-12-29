const toggleThemeButton = document.querySelector('.header__theme-button');

toggleThemeButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('darkTheme');
});
