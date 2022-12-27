import { initTheme } from './utils/useDarkMode.js';

const onLoadScript = ()=>{
    const darkModeButton = document.querySelector('.button__darkmode');
    initTheme(darkModeButton);
}
onLoadScript();