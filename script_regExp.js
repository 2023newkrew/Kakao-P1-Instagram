/*
    util.getClickCount의 getTranslateX를 정규식을 이용하여 구함 
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
    getClickCount(container, contents) {
        const contentWidth = contents[0].offsetWidth;
        const translateX = this.getTranslateX(container);
        const clickCount = Math.floor(Math.abs(translateX) / contentWidth);
        return clickCount;
    },
    isFirst(container, contents) {
        return this.getClickCount(container, contents) === 0;
    },
    isLast(container, contents) {
        const contentsCount = contents.length;
        console.log(
            "[test]",
            contentsCount,
            this.getClickCount(container, contents)
        );
        return this.getClickCount(container, contents) === contentsCount - 1;
    },
    turnOnElement(element) {
        element.style.display = "unset";
    },
    turnOffElement(element) {
        element.style.display = "none";
    },
    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    },
    getLocalStorage(key) {
        return localStorage.getItem(key);
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
};

function init() {
    const storiesContents = $stories.querySelectorAll(".stories__content");
    for (let i = 0; i < storiesContents.length; i++) {
        const $curNode = storiesContents[i];
        $curNode.style.order = i + 1;
    }

    if (util.isFirst($innerBox, storiesContents)) {
        util.turnOffElement($leftArrow);
    }
    if (util.isLast($innerBox, storiesContents)) {
        util.turnOffElement($rightArrow);
    }

    const onload = () => {
        const theme = util.getLocalStorage("theme");

        if (theme === "dark") {
            util.addClass(document.documentElement, "darkTheme");
        } else {
            util.removeClass(document.documentElement, "darkTheme");
        }
    };

    const onDarkThemeBtnClick = () => {
        util.toggleClass(document.documentElement, "darkTheme");
        if (document.documentElement.classList.contains("darkTheme")) {
            util.setLocalStorage("theme", "dark");
        } else {
            util.setLocalStorage("theme", "light");
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

    const makeOnArrowClickByTransformWithDirection = (direction) => {
        const adjustNum = direction === "left" ? -1 : 1;
        const onArrowClickByTransform = () => {
            const contents = $innerBox.querySelectorAll(".stories__content");
            const clickCount = util.getClickCount($innerBox, contents);
            const contentWidth = contents[0].offsetWidth;

            $innerBox.style.transform = `translateX(-${
                (clickCount + adjustNum) * contentWidth
            }px)`;

            if (util.isLast($innerBox, contents)) {
                util.turnOffElement($rightArrow);
            } else {
                util.turnOnElement($rightArrow);
            }

            if (util.isFirst($innerBox, contents)) {
                util.turnOffElement($leftArrow);
            } else {
                util.turnOnElement($leftArrow);
            }
        };
        return onArrowClickByTransform;
    };

    window.addEventListener("load", onload);
    $toggleThemeBtn.addEventListener("click", onDarkThemeBtnClick);
    $rightArrow.addEventListener(
        "click",
        makeOnArrowClickByTransformWithDirection("right")
    );
    $leftArrow.addEventListener(
        "click",
        makeOnArrowClickByTransformWithDirection("left")
    );
}
function makeDummy(count) {
    const $target = document.querySelector(".stories__content");
    for (let i = 0; i < count; i++) {
        const $clone = $target.cloneNode(true);
        $clone.querySelector(".story__user").innerText = `user${i + 2}`;
        $stories.querySelector(".stories__inner-box").appendChild($clone);
    }
}
function main() {
    makeDummy(5);
    init();
}
main();
