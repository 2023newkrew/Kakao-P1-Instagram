import debounce from "../utils/debounce.js";

export const resizeObserver = (posts) => {
    function rerender(postListElements) {
        function getCurrentMediaIndex(post) {
            const postIndicatorsElement = post.querySelector(`.post__indicators`);
            const indicators = Array.prototype.slice.call(postIndicatorsElement.children);

            for (let index = 0; index < indicators.length; index++) {
                if (indicators[index].className === "active") return index;
            }
        }

        const postContentElement = document.querySelector(`.post__content`);
        const mediaSlideWidth = postContentElement.clientWidth;

        postListElements.forEach(post => {
            if (post.className !== 'postEnd') {
                const mediaSlidesElement = post.querySelector(`.post__medias`);
                const mediaSlideImgElements = mediaSlidesElement.querySelectorAll('li');
                const mediaSlideCount = mediaSlideImgElements.length;

                const currentMediaIndex = getCurrentMediaIndex(post);

                mediaSlidesElement.style.width = `${mediaSlideWidth * mediaSlideCount}px`;
                mediaSlidesElement.style.setProperty('transform', `translateX(${-(currentMediaIndex * mediaSlideWidth)}px)`);
            }
        });
    }
    const resizeObserver = new ResizeObserver(debounce((entries) => {
        const target = Array.prototype.slice.call(entries[0].target.children);
        rerender(target);
    }, 200));

    resizeObserver.observe(posts);
}