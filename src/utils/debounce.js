export const debounce = (func, time) => {
    let timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}