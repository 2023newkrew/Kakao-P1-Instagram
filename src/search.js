export function initSearch() {
  const searchInputEl = document.querySelector(".header__search input");
  searchInputEl.addEventListener("keydown", searchContent);
}

function searchContent(event) {
  if (event.code === "Enter") {
    window.open(`https://www.google.com/search?q=${event.target.value}`);
  }
}
