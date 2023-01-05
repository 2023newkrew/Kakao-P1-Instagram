const infiniteScrollUtil = ({ lastItemSelector, fetchItem, threshold = 0.5 }) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      fetchItem();
    });
  }, { threshold });

  observer.observe(document.querySelector(lastItemSelector));
};

export default infiniteScrollUtil;