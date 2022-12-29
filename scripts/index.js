import { initializeDocumentTheme, toggleDocumentTheme } from './theme.js';

const toggleThemeButton = document.querySelector('.header__theme-button');

toggleThemeButton.addEventListener('click', toggleDocumentTheme);

initializeDocumentTheme();
