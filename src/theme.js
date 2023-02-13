export function initThemeMode() {
  const themeButtonEl = document.querySelector(".header__theme-button");
  themeButtonEl.addEventListener("click", toggleTheme);

  const currentMode = window.localStorage.getItem("ThemeMode");
  window.localStorage.setItem("ThemeMode", currentMode || "light-theme");
  document.documentElement.classList.add(currentMode);
}

function toggleTheme() {
  const currentMode = window.localStorage.getItem("ThemeMode");
  const nextMode = currentMode === "light-theme" ? "dark-theme" : "light-theme";
  window.localStorage.setItem("ThemeMode", nextMode);
  document.documentElement.classList.add(nextMode);
  document.documentElement.classList.remove(currentMode);
}
