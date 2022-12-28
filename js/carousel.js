// TODO: 화면 크기 조절 시 캐러셀 스크롤 위치 뒤틀림 수정 필요
export const initCarousel = (slidesContainer, prevButton, nextButton) => {
	const slide = slidesContainer.querySelector('.slide');
	
	prevButton.addEventListener('click', () => {
		const slideWidth = slide.clientWidth;
		slidesContainer.scrollLeft -= slideWidth;
	});
	nextButton.addEventListener('click', () => {
		const slideWidth = slide.clientWidth;
		slidesContainer.scrollLeft += slideWidth;
	});
}