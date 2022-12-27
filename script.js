const toggleThemeBtn = document.querySelector(".header__theme-button");

const onDarkThemeBtnClick = () => {
    document.documentElement.classList.toggle("darkTheme");
};

toggleThemeBtn.addEventListener("click", onDarkThemeBtnClick);
