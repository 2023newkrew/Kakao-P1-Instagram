export const debounce = (callback, delay = 100) => {
  if (typeof callback !== 'function') {
    console.error('The first argument must be a function');
    return;
  }
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
};
export default debounce;
