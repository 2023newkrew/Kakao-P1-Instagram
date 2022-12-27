import { getItem, setItem } from './utils/localStorage.js';


export const setDarkTheme = (toggleButton) => {
    setItem('darkMode', true);
    document.documentElement.classList.add('darkMode');
    
    const icon = toggleButton.querySelector('.icon');
    if(icon){
        icon.src = "assets/icons/moon.svg";
        icon.alt = 'dark mode';
    }
}
export const setLightTheme = (toggleButton) => {
    setItem('darkMode', false);
    document.documentElement.classList.remove('darkMode');

    const icon = toggleButton.querySelector('.icon');
    if(icon){
        icon.src = "assets/icons/sun.svg";
        icon.alt = 'light mode';
    }
}
export const toggleMode = (toggleButton) => {
    const isDarkMode = getItem('darkMode');
    if(isDarkMode) {
        setLightTheme(toggleButton);
    }
    else {
        setDarkTheme(toggleButton);
    }
}

export const initTheme = (toggleButton) => {
    toggleButton.addEventListener('click', ()=>{
        toggleMode(toggleButton);
    });
    const isDarkMode = getItem('darkMode');
    if(isDarkMode){
        setDarkTheme(toggleButton);
    }else{
        setLightTheme(toggleButton);
    }
}

export default {
    setDarkTheme,
    setLightTheme,
    toggleMode,
    initTheme
};