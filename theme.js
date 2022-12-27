import { getItem, setItem } from './utils/localStorage.js';

const theme = {
    LIGHT_THEME: 'light',
    DARK_THEME: 'dark',
};

export const setDarkTheme = (toggleButton) => {
    setItem('theme', theme.DARK_THEME);

    document.documentElement.classList.add('darkMode');
    
    const icon = toggleButton.querySelector('.icon');
    if(icon){
        icon.src = "assets/icons/moon.svg";
        icon.alt = 'dark mode';
    }
}

export const setLightTheme = (toggleButton) => {
    setItem('theme', theme.LIGHT_THEME);

    document.documentElement.classList.remove('darkMode');

    const icon = toggleButton.querySelector('.icon');
    if(icon){
        icon.src = "assets/icons/sun.svg";
        icon.alt = 'light mode';
    }
}

export const toggleMode = (toggleButton) => {
    const currentTheme = getItem('theme');

    if(currentTheme === theme.DARK_THEME) {
        setLightTheme(toggleButton);
    } else {
        setDarkTheme(toggleButton);
    }
}

export const initTheme = (toggleButton) => {
    toggleButton.addEventListener('click', () => {
        toggleMode(toggleButton);
    });

    const currentTheme = getItem('theme');

    if(currentTheme === theme.DARK_THEME){
        setDarkTheme(toggleButton);
    } else {
        setLightTheme(toggleButton);
    }
}

export default {
    setDarkTheme,
    setLightTheme,
    toggleMode,
    initTheme
};