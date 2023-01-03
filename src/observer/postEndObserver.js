import debounce from "../utils/debounce.js";

export const postEndObserver = (makeDummyMedia) => {
    const postEnd = document.querySelector('.postEnd');
    const observer = new IntersectionObserver(debounce((entries) => {
        if (entries[0].isIntersecting && Math.floor(entries[0].intersectionRatio) === 1) {
            makeDummyMedia(2);
        }
    }, 200), { threshold: 1 })
    observer.observe(postEnd);
}