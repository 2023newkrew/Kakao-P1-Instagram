const debounce = (func) => {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
    };
}

export default debounce;