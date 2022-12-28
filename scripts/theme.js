import { LocalStorageKey } from './const.js';

const Theme = Object.freeze({
  LIGHT_THEME: 'lightTheme',
  DARK_THEME: 'darkTheme',
});

const initializeDocumentTheme = () => {
  setDocumentTheme(getInitialDocumentTheme());
};

const toggleDocumentTheme = () => {
  const nextTheme = reverseTheme(getDoucmentTheme());

  setDocumentTheme(nextTheme);
  setLocalStorageTheme(nextTheme);
};

const getInitialDocumentTheme = () => {
  const localStorageValue = localStorage.getItem(LocalStorageKey.THEME);

  if (Object.values(Theme).includes(localStorageValue)) {
    return localStorageValue;
  }

  return getMediaQueryTheme();
};

const setLocalStorageTheme = (theme) => {
  localStorage.setItem(LocalStorageKey.THEME, theme);
};

const getMediaQueryTheme = () => {
  return matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK_THEME : Theme.LIGHT_THEME;
};

const getDoucmentTheme = () => {
  return document.documentElement.classList.contains(Theme.DARK_THEME) ? Theme.DARK_THEME : Theme.LIGHT_THEME;
};

const setDocumentTheme = (theme) => {
  document.documentElement.classList.remove(reverseTheme(theme));
  document.documentElement.classList.add(theme);
};

const reverseTheme = (theme) => {
  return theme === Theme.DARK_THEME ? Theme.LIGHT_THEME : Theme.DARK_THEME;
};

export { initializeDocumentTheme, toggleDocumentTheme };
