import { NIGHT_MODE_CLASS } from "./const.js";

const themeBtnEl = document.querySelector(".header__theme-button");

const getIsNightMode = () => localStorage.getItem(NIGHT_MODE_CLASS) === "true";
const toggleNightMode = () => localStorage.setItem(NIGHT_MODE_CLASS, !getIsNightMode());

const setNightTheme = () => document.documentElement.classList.add(NIGHT_MODE_CLASS);
const setDayTheme = () => document.documentElement.classList.remove(NIGHT_MODE_CLASS);

const setThemeMode = () => getIsNightMode() ? setNightTheme() : setDayTheme();

export const initNightMode = () => {
  themeBtnEl.addEventListener("click", () => {
    toggleNightMode();
    setThemeMode(getIsNightMode());
  });

  if (getIsNightMode()) setNightTheme();
}