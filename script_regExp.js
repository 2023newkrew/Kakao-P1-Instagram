/*
    util.getCurrentIndex getTranslateX를 정규식을 이용하여 구함 
    이 방법이 적합한 방법인가?
*/
const $toggleThemeBtn = document.querySelector(".header__theme-button");
const $stories = document.querySelector(".stories");
const $rightArrow = document.querySelector(".story__next-button");
const $leftArrow = document.querySelector(".story__prev-button");
const $innerBox = document.querySelector(".stories__inner-box");

const util = {
    getTranslateX(element) {
        return Number(element.style.transform.replace(/[^\d.]/g, ""));
    },
    getCurrentIndex(container, contents) {
        const contentWidth = contents[0].offsetWidth;
        const translateX = this.getTranslateX(container);
        const currentIndex = Math.floor(Math.abs(translateX) / contentWidth);
        return currentIndex;
    },
    isFirst(container, contents) {
        return this.getCurrentIndex(container, contents) === 0;
    },
    isLast(container, contents) {
        const contentsCount = contents.length;
        console.log(
            "[test]",
            contentsCount,
            this.getCurrentIndex(container, contents)
        );
        return this.getCurrentIndex(container, contents) === contentsCount - 1;
    },
    turnOnElement(element) {
        element.style.display = "unset";
    },
    turnOffElement(element) {
        element.style.display = "none";
    },
    setThemeInLocalStorage(value) {
        localStorage.setItem("theme", value);
    },
    getThemeInLocalStorage() {
        return localStorage.getItem("theme");
    },
    addClass(element, className) {
        element.classList.add(className);
    },
    removeClass(element, className) {
        element.classList.remove(className);
    },
    toggleClass(element, className) {
        element.classList.toggle(className);
    },
    makeOnArrowClickByTransform(
        container,
        contents,
        direction,
        $rightArrow,
        $leftArrow
    ) {
        const adjustNum = direction === "left" ? -1 : 1;
        const onArrowClickByTransform = () => {
            const currentIndex = util.getCurrentIndex(container, contents);
            const contentWidth = contents[0].offsetWidth;

            const afterIndex = currentIndex + adjustNum;
            container.style.transform = `translateX(-${
                afterIndex * contentWidth
            }px)`;

            if (afterIndex === contents.length - 1) {
                // last index
                util.turnOffElement($rightArrow);
            } else {
                util.turnOnElement($rightArrow);
            }

            if (afterIndex === 0) {
                // first index
                util.turnOffElement($leftArrow);
            } else {
                util.turnOnElement($leftArrow);
            }
        };
        return onArrowClickByTransform;
    },
};

function init() {
    const storiesContents = $stories.querySelectorAll(".stories__content");
    for (let i = 0; i < storiesContents.length; i++) {
        const $curNode = storiesContents[i];
        $curNode.style.order = i + 1;
    }

    const currentIndex = util.getCurrentIndex($innerBox, storiesContents);

    if (currentIndex === 0) {
        // first position
        util.turnOffElement($leftArrow);
    }
    if (currentIndex === storiesContents.length - 1) {
        // last position
        util.turnOffElement($rightArrow);
    }

    const onload = () => {
        const theme = util.getThemeInLocalStorage();

        if (theme === "dark") {
            util.addClass(document.documentElement, "darkTheme");
        } else if (theme === "light") {
            util.removeClass(document.documentElement, "darkTheme");
        } else {
            //theme === null
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                // dark mode
                util.addClass(document.documentElement, "darkTheme");
            }
        }
    };

    const onDarkThemeBtnClick = () => {
        util.toggleClass(document.documentElement, "darkTheme");
        if (document.documentElement.classList.contains("darkTheme")) {
            util.setThemeInLocalStorage("dark");
        } else {
            util.setThemeInLocalStorage("light");
        }
    };

    /* 
    flex item의 order 을 변경하는 식으로 구현하였으나 애니메이션 적용 방법을 모르겠음. 
    (order 변화에 따른 위치 변화를 직접 계산하여 적용하면 css의 transition을 이용 가능하긴 함 ) 
    */
    const onRightArrowClickByOrder = () => {
        const storiesContents = $stories.querySelectorAll(".stories__content");

        for (let i = 0; i < storiesContents.length; i++) {
            const $curNode = storiesContents[i];
            $curNode.style.order--;

            if (Number($curNode.style.order) === 0) {
                $curNode.style.order = storiesContents.length;
            }
        }
    };

    window.addEventListener("load", onload);
    $toggleThemeBtn.addEventListener("click", onDarkThemeBtnClick);
    $rightArrow.addEventListener(
        "click",
        util.makeOnArrowClickByTransform(
            $innerBox,
            $innerBox.querySelectorAll(".stories__content"),
            "right",
            $rightArrow,
            $leftArrow
        )
    );
    $leftArrow.addEventListener(
        "click",
        util.makeOnArrowClickByTransform(
            $innerBox,
            $innerBox.querySelectorAll(".stories__content"),
            "left",
            $rightArrow,
            $leftArrow
        )
    );
}
function makeStoryDummy(count) {
    const $target = document.querySelector(".stories__content");
    for (let i = 0; i < count; i++) {
        const $clone = $target.cloneNode(true);
        $clone.querySelector(".story__user").innerText = `user${i + 2}`;
        $stories.querySelector(".stories__inner-box").appendChild($clone);
    }
}
function makePostDummy(count, imgCount) {
    const $target = document.querySelector(".post");
    for (let i = 0; i < count; i++) {
        const $clone = $target.cloneNode(true);

        for (let j = 0; j < imgCount; j++) {
            const $imgClone = $clone
                .querySelector(".post__media")
                .cloneNode(true);
            $clone.querySelector(".post__medias").appendChild($imgClone);
        }

        const $rightArrow = $clone.querySelector(".post__next-button");
        const $leftArrow = $clone.querySelector(".post__prev-button");

        const container = $clone.querySelector(".post__medias");
        const contents = $clone.querySelectorAll(".post__media");

        util.turnOffElement($leftArrow);
        if (contents.length <= 1) util.turnOffElement($rightArrow);

        $rightArrow.addEventListener(
            "click",
            util.makeOnArrowClickByTransform(
                container,
                contents,
                "right",
                $rightArrow,
                $leftArrow
            )
        );
        $leftArrow.addEventListener(
            "click",
            util.makeOnArrowClickByTransform(
                container,
                contents,
                "left",
                $rightArrow,
                $leftArrow
            )
        );
        document.querySelector(".posts").appendChild($clone);
    }
}
function main() {
    makeStoryDummy(15);
    makePostDummy(1, 3);
    init();
}
main();
