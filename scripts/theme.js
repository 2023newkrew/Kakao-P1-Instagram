function initTheme() {
  const $toggleThemeButton = document.querySelector(".header__theme-button");

  $toggleThemeButton.addEventListener("click", () => {
    const rootClassList = document.documentElement.classList;

    rootClassList.toggle("dark-theme");
    localStorage.setItem("theme", rootClassList.contains("dark-theme") ? "dark" : "light");
  });

  window.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme");
    const rootClassList = document.documentElement.classList;

    if (theme === "dark") rootClassList.add("dark-theme");
  });
}

initTheme();
