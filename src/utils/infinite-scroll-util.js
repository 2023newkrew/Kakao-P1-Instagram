const infiniteScrollUtil = ({ lastItemSelector, onReachLastItem, threshold = 0.5 }) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      observer.unobserve(entry.target);
      onReachLastItem();
      observer.observe(document.querySelector(lastItemSelector));
    });
  }, { threshold });

  observer.observe(document.querySelector(lastItemSelector));
};

export default infiniteScrollUtil;