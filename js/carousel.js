// TODO: 화면 크기 조절 시 캐러셀 스크롤 위치 뒤틀림 수정 필요 
// reference : https://codesandbox.io/s/vanilla-js-carousel-forked-rcypq1?file=/src/index.js
const getCarousel = (slidesContainer) => {
	let currentIndex = 0;
	let slides = [];
	let indicators = [];

	const render = ()=>{
		let offset = 0;
		slides.forEach((slide, index)=>{
			if(index < currentIndex){
				offset += slide.offsetWidth;
			}
		});

		slidesContainer.style.transform = `translateX(-${offset}px)`;

		if(indicators && indicators.length > 0){
			indicators.forEach((indicator, index)=>{
				if(index === currentIndex){
					indicator.classList.add("active");
				}else{
					indicator.classList.remove("active");
				}
			})
		}
	}

	const prev = ()=>{
		if(currentIndex <= 0) {
			return;
		}
		currentIndex -= 1;
		
		render();
	}
	const next = ()=>{
		console.log(slides);
		if(currentIndex === slides.length - 1) {
			return;
		}
		currentIndex+=1;
		render();
	}

	const goto = (newIndex)=>{
		if(newIndex < 0 || newIndex > slides.length - 1){
			return;
		}

		currentIndex = newIndex;
		render();
	}

	const init = ()=>{
		const newSlides = slidesContainer.querySelectorAll('.carousel-sections > div');
		slides = newSlides;

		const newIndicators = slidesContainer.querySelectorAll('.post__indicators > div');
		newIndicators.forEach((indicator, index)=>{
			indicator.onclick = () => goto(index);
		});
		indicators = newIndicators;

		render();
	}

	return {
		init,
		prev,
		goto,
		next,
		render,
	}
}
export const initCarousel = (slidesContainer, prevButton, nextButton) => {
	const { init, prev, next, render} = getCarousel(slidesContainer);

	init();
	prevButton.onclick = prev;
	nextButton.onclick = next;

	window.addEventListener('resize', ()=>{
		render();
	});
}