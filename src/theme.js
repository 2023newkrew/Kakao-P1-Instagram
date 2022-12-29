export function initThemeMode() {
  const themeButtonEl = document.querySelector(".header__theme-button");
  themeButtonEl.addEventListener("click", toggleTheme);

  const currentMode = window.localStorage.getItem("ThemeMode");
  if (currentMode === undefined) {
    window.localStorage.setItem("ThemeMode", "light");
  } else if (currentMode === "dark") {
    document.documentElement.classList.add("dark-theme");
  }
}

function toggleTheme() {
  const currentMode = window.localStorage.getItem("ThemeMode");
  const nextMode = currentMode === "light" ? "dark" : "light";
  window.localStorage.setItem("ThemeMode", nextMode);
  document.documentElement.classList.toggle("dark-theme");
}
