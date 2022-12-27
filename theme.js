import { getItem, setItem } from './utils/localStorage.js';

const theme = {
	LIGHT_THEME: 'light',
	DARK_THEME: 'dark',
};

const themeButton = document.querySelector('.theme-button');
const icon = themeButton.querySelector('.icon');

export const setDarkTheme = () => {
	setItem('theme', theme.DARK_THEME);

	document.documentElement.classList.add('darkMode');
	
	if(icon){
		icon.src = "assets/icons/moon.svg";
		icon.alt = 'dark mode';
	}
}

export const setLightTheme = () => {
	setItem('theme', theme.LIGHT_THEME);

	document.documentElement.classList.remove('darkMode');

	if(icon){
		icon.src = "assets/icons/sun.svg";
		icon.alt = 'light mode';
	}
}

export const toggleTheme = () => {
	const currentTheme = getItem('theme');

	if(currentTheme === theme.DARK_THEME) {
		setLightTheme();
	} else {
		setDarkTheme();
	}
}

export const initTheme = () => {
	toggleButton.addEventListener('click', toggleMode);

	const currentTheme = getItem('theme');

	if(currentTheme === theme.DARK_THEME){
		setDarkTheme();
	} else {
		setLightTheme();
	}
}

export default {
	setDarkTheme,
	setLightTheme,
	toggleMode,
	initTheme
};