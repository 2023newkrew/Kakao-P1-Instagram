import { NIGHT_MODE_CLASS } from "./const.js";

const dayNightToggleBtn = document.querySelector(".header__theme-button");
const dayNightToggleBtnSunIcon = document.querySelector(".header__theme-button-sun");
const dayNightToggleBtnMoonIcon = document.querySelector(".header__theme-button-moon");

const isNightMode = () => localStorage.getItem(NIGHT_MODE_CLASS) === "true";
const toggleNightMode = () => localStorage.setItem(NIGHT_MODE_CLASS, !isNightMode());

const setNightTheme = () => {
  document.documentElement.classList.add(NIGHT_MODE_CLASS);
  dayNightToggleBtnSunIcon.style.display = "unset";
  dayNightToggleBtnMoonIcon.style.display = "none";
}

const setDayTheme = () => {
  document.documentElement.classList.remove(NIGHT_MODE_CLASS);
  dayNightToggleBtnSunIcon.style.display = "none";
  dayNightToggleBtnMoonIcon.style.display = "unset";
}

const setThemeMode = (isNightMode) => !!isNightMode ? setNightTheme() : setDayTheme();

dayNightToggleBtn.addEventListener("click", () => {
  toggleNightMode();
  setThemeMode(isNightMode());
});

export const initNightMode = () => {
  if (isNightMode()) setNightTheme();
}