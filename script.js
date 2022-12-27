import { initTheme } from './theme.js';

const onLoadScript = ()=>{
    const darkModeButton = document.querySelector('.button__darkmode');
    initTheme(darkModeButton);
}
onLoadScript();