/*
    util.getCurrentIndex getTranslateX를 정규식을 이용하여 구함 
    이 방법이 적합한 방법인가?
*/
const $toggleThemeBtn = document.querySelector(".header__theme-button");
const $stories = document.querySelector(".stories");
const $rightArrow = document.querySelector(".story__next-button");
const $leftArrow = document.querySelector(".story__prev-button");
const $innerBox = document.querySelector(".stories__inner-box");
const $searchBox = document.querySelector(".header__search");
const $searchBoxInput = $searchBox.querySelector("input");

const POST_DEBOUNCE_DELAY = 100;
const SEARCH_DEBOUNCE_DELAY = 300;

const searchKeywords = ["apple", "banana"];

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
    makeDebounceHandler(handler, delay) {
        let timeOut = undefined;

        const debounceHandler = (event) => {
            clearTimeout(timeOut);
            timeOut = setTimeout(() => handler(event), delay);
        };

        return debounceHandler;
    },
};

function init() {
    /* 더미 스토리 유저 이름 변경 */
    const storiesContents = $stories.querySelectorAll(".stories__content");
    for (let i = 0; i < storiesContents.length; i++) {
        const $curNode = storiesContents[i];
        $curNode.style.order = i + 1;
    }

    /* 스토리 초기 화살표 버튼 설정 */
    const currentIndex = util.getCurrentIndex($innerBox, storiesContents);

    if (currentIndex === 0) {
        // first position
        util.turnOffElement($leftArrow);
    }
    if (currentIndex === storiesContents.length - 1) {
        // last position
        util.turnOffElement($rightArrow);
    }

    /* 다크 모드 설정 */
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

    /* Transform의 translateX를 이용한 캐러셀 동작 함수 */
    const makeAdjustPostTransform = () => {
        // 자유변수
        let beforeContainerWidth =
            document.querySelector(".post__content").offsetWidth;

        const adjustPostTransform = (event) => {
            const currentContainerWidth =
                document.querySelector(".post__content").offsetWidth;

            const targets = document.querySelectorAll(".post__medias");
            for (let i = 0; i < targets.length; i++) {
                const $target = targets[i];

                const targetTranslateValue = util.getTranslateX($target);
                $target.style.transform = `translateX(-${
                    (targetTranslateValue * currentContainerWidth) /
                    beforeContainerWidth
                }px)`;
            }
            beforeContainerWidth = currentContainerWidth;
        };
        return adjustPostTransform;
    };
    const closeSearchBox = () => {
        $searchBoxInput.style.borderBottomLeftRadius = "";
        $searchBoxInput.style.borderBottomRightRadius = "";
        const $keywordBoxes = $searchBox.querySelector("keyword-boxes");
        if ($keywordBoxes) $searchBox.removeChild($keywordBoxes);
    };

    /* 검색창에 값 입력 */
    const onKeyDownSearchBox = (event) => {
        // TODO
        // 키보드로 자동완성된 키워드 선택 및 하이라이팅

        /* 포커스 해제 키(ex Tab)를 눌렀을 때는 동작 안 하도록 함*/
        if (event.target !== document.activeElement) return;

        let $keywordBoxes = $searchBox.querySelector("keyword-boxes");
        const inputValue = event.target.value;

        if (inputValue === "") {
            //비어있는 값 입력
            closeSearchBox();
            return;
        }

        const showList = searchKeywords.filter((keyword) =>
            keyword.includes(inputValue)
        );

        if (showList.length > 0) {
            $searchBoxInput.style.borderBottomLeftRadius = "0px";
            $searchBoxInput.style.borderBottomRightRadius = "0px";
        } else {
            $searchBoxInput.style.borderBottomLeftRadius = "";
            $searchBoxInput.style.borderBottomRightRadius = "";
        }

        if ($keywordBoxes) $searchBox.removeChild($keywordBoxes);

        const $newKeywordBoxes = document.createElement("keyword-boxes");

        for (let i = 0; i < showList.length; i++) {
            const curKeyword = showList[i];
            const $node = document.createElement("keyword-box");
            $node.innerText = curKeyword;
            $newKeywordBoxes.appendChild($node);
        }

        $searchBox.appendChild($newKeywordBoxes);
    };

    const onKeyDownSearchBoxInput = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            window.location.href = `https://www.google.com/search?q=${event.target.value}`;
        }
    };

    const onClickExceptSearchBoxHandler = (event) => {
        if (event.target.closest(".header__search")) return;

        closeSearchBox();
    };

    /* 이벤트 핸들러 부착*/
    $searchBoxInput.addEventListener("keydown", onKeyDownSearchBoxInput);
    $searchBoxInput.addEventListener("focus", onKeyDownSearchBox);
    $searchBoxInput.addEventListener("focusout", closeSearchBox);

    $searchBox.addEventListener(
        "keydown",
        util.makeDebounceHandler(onKeyDownSearchBox, SEARCH_DEBOUNCE_DELAY)
    );
    $searchBox.addEventListener("click", onKeyDownSearchBox);

    window.addEventListener(
        "resize",
        util.makeDebounceHandler(makeAdjustPostTransform(), POST_DEBOUNCE_DELAY)
    );
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
    document.body.addEventListener("click", onClickExceptSearchBoxHandler);
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
    //count는 포스트 개수 / imgCount는 포스트마다 이미지 개수
    const $target = document.querySelector(".post");
    for (let i = 0; i < count; i++) {
        const $clone = $target.cloneNode(true);
        /* 이미지 추가 */
        for (let j = 0; j < imgCount; j++) {
            const $imgClone = $clone
                .querySelector(".post__media")
                .cloneNode(true);
            $clone.querySelector(".post__medias").appendChild($imgClone);
        }

        /* 왼쪽, 오른쪽 화살표 구현 */
        const $rightArrow = $clone.querySelector(".post__next-button");
        const $leftArrow = $clone.querySelector(".post__prev-button");

        const container = $clone.querySelector(".post__medias");
        const contents = $clone.querySelectorAll(".post__media");

        util.turnOffElement($leftArrow);
        if (contents.length <= 1) util.turnOffElement($rightArrow);

        /* 포스트 화살표 핸들러 부착 */
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

        /* 인디케이터 구현 */
        const $indicators = $clone.querySelector(".post__indicators");

        const $indicatorSet = document.createElement("div");
        $indicatorSet.classList.add("post__indicator-set");
        for (let i = 0; i < imgCount + 1; i++) {
            //html에 기본적으로 1개가 추가되어 있어서 imgCount+1임 나중에 지워야 함
            const $indicator = document.createElement("div");
            $indicator.classList.add("post__indicator");
            if (i === 0) $indicator.classList.add("active");

            $indicatorSet.appendChild($indicator);
        }
        $indicators.appendChild($indicatorSet);

        const onClickIndicatorHandler = (event) => {
            const indicatorList =
                $indicatorSet.querySelectorAll(".post__indicator");
            const currentIndex = util.getCurrentIndex(container, contents);

            for (let i = 0; i < indicatorList.length; i++) {
                const $curIndicator = indicatorList[i];

                $curIndicator.classList.remove("active");
                if (i === currentIndex) $curIndicator.classList.add("active");
            }
        };
        /* 인디케이터 핸들러 부착 */
        $rightArrow.addEventListener("click", onClickIndicatorHandler);
        $leftArrow.addEventListener("click", onClickIndicatorHandler);

        document.querySelector(".posts").appendChild($clone);
    }
}
function main() {
    makeStoryDummy(15);
    makePostDummy(2, 4);
    init();
}
main();
