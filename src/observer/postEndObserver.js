export const postEndObserver = (makeDummyMedia) => {
    const postEnd = document.querySelector('.postEnd');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && Math.floor(entries[0].intersectionRatio) === 1) {
            makeDummyMedia(2);
        }
    }, { threshold: 1 })
    observer.observe(postEnd);
}