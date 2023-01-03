export function imageObserver(posts) {
    const images = posts.querySelectorAll('.post__media');

    // IntersectionObserver 를 등록한다.
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            // 관찰 대상이 viewport 안에 들어오지 않은 경우 return
            if (!entry.isIntersecting) return;

            // 관찰 대상이 viewport 안에 들어온 경우 image 로드
            const image = entry.target;
            const newURL = image.getAttribute('data-src');
            // data-src 정보를 타켓의 src 속성에 설정
            image.src = newURL
            // 이미지를 불러왔다면 타켓 엘리먼트에 대한 관찰을 멈춘다.
            observer.unobserve(image)
        });
    }, { threshold: 0.2 });

    // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
    images.forEach((image) => {
        observer.observe(image);
    })
}