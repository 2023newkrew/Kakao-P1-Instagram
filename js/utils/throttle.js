function throttle(callback, limit=100){
  let isWaiting = false;

  return function (){
    if(!isWaiting){
      callback.apply(this, arguments);
      isWaiting = true;
      setTimeout(()=>{
        isWaiting = false;
      }, limit);
    }
  }
}
export default throttle;