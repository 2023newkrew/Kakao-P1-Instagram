export const useVisibilityObserver = (observeTarget, controlTarget)=>{
  const observe = (target)=>{
    const storyObserver = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          hide();
        }else {
          show();
        }
      });
    });

    storyObserver.observe(target);  
  }

  const hide = ()=>{
    controlTarget.style.display = 'none';
  }
  const show = ()=>{
    controlTarget.style.display = 'block';
  }

  const init = ()=>{
    observe(observeTarget);
  }

  return init;
}