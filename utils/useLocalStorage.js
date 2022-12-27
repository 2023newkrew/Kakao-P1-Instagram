export function getItem(key){
    return JSON.parse(localStorage.getItem(key));
}
export function setItem(key, value){
    localStorage.setItem(key, value);
}

export default {
    getItem,
    setItem
}