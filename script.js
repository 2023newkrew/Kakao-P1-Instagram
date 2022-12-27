const $toggleThemeBtn = document.querySelector(".header__theme-button");

function init() {
    const onload = () => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("darkTheme");
        } else {
            document.documentElement.classList.remove("darkTheme");
        }
    };

    const onDarkThemeBtnClick = () => {
        document.documentElement.classList.toggle("darkTheme");

        if (document.documentElement.classList.contains("darkTheme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    };

    window.addEventListener("load", onload);
    $toggleThemeBtn.addEventListener("click", onDarkThemeBtnClick);
}

function main() {
    init();
}
main();
