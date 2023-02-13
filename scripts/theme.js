import { DARK_THEME } from "./constants.js";

export function initTheme() {
  const toggleThemeButtonEl = document.body.querySelector(".header__theme-button");

  toggleThemeButtonEl.addEventListener("click", () => {
    const rootClassList = document.documentElement.classList;

    rootClassList.toggle(DARK_THEME);
    localStorage.setItem(DARK_THEME, rootClassList.contains(DARK_THEME));
  });

  window.addEventListener("DOMContentLoaded", () => {
    const isDarkTheme = JSON.parse(localStorage.getItem(DARK_THEME));
    const rootClassList = document.documentElement.classList;

    if (isDarkTheme) rootClassList.add(DARK_THEME);
  });
}
