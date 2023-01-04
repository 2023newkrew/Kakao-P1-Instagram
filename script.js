const $toggleThemeBtn = document.querySelector(".header__theme-button");
const $stories = document.querySelector(".stories");
const $rightArrow = document.querySelector(".story__next-button");
const $leftArrow = document.querySelector(".story__prev-button");
const $innerBox = document.querySelector(".stories__inner-box");

const util = {
    getClickCount(container, contents) {
        const contentWidth = contents[0].offsetWidth;

        const innerBoxStyle = window.getComputedStyle(container);
        const innerBoxMatrix = new WebKitCSSMatrix(innerBoxStyle.transform);

        //console.log("[translate val]", Math.abs(innerBoxMatrix.m41));
        const clickCount = Math.floor(
            Math.abs(innerBoxMatrix.m41) / contentWidth
        );
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
            const animationTime = 500;
            const contents = $innerBox.querySelectorAll(".stories__content");
            const clickCount = util.getClickCount($innerBox, contents);
            const contentWidth = contents[0].offsetWidth;

            $innerBox.style.transform = `translateX(-${
                (clickCount + adjustNum) * contentWidth
            }px)`;
            /*
            getComputedStyle가 설정된 값이 아닌 눈에 보이는 현재 값을 기준으로 하기 때문에 
            애니메이션이 종료된 후 로직이 실행되어야 한다
    
            getComputedStyle을 쓰지 않는 방법으로는 transform 값을 가져와서 정규식을 통해 값을 얻어오는 방법이 있으나
            해당 방법이 적합한 방법인지는 모르겠다.
            */
            setTimeout(() => {
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
            }, animationTime);
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
