import { CLASS_NAME } from './const.js';

const initNightMode = () => {
  const themeBtnEl = document.querySelector('.header__theme-button');

  const getIsNightMode = () => localStorage.getItem(CLASS_NAME.NIGHT_MODE) === 'true';
  const toggleNightMode = () => localStorage.setItem(CLASS_NAME.NIGHT_MODE, !getIsNightMode());

  const setNightTheme = () => document.documentElement.classList.add(CLASS_NAME.NIGHT_MODE);
  const setDayTheme = () => document.documentElement.classList.remove(CLASS_NAME.NIGHT_MODE);

  const setThemeMode = () => getIsNightMode() ? setNightTheme() : setDayTheme();

  themeBtnEl.addEventListener('click', () => {
    toggleNightMode();
    setThemeMode();
  });

  if (getIsNightMode()) setNightTheme();
}

export default initNightMode;