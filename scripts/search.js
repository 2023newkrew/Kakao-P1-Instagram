import { SEARCH_SUGGESTIONS } from "./CONSTANTS.js";

function createSuggestions({ $suggestions, query }) {
  const suggestions = query
    ? SEARCH_SUGGESTIONS.reduce((acc, cur) => {
        if (!cur.startsWith(query)) return acc;
        return [...acc, createSuggestionEl({ query, suggestion: cur })];
      }, [])
    : [];

  $suggestions.replaceChildren(...suggestions);
}

function createSuggestionEl({ query, suggestion }) {
  const $suggestion = document.createElement("div");
  $suggestion.classList.add("search-suggestion");
  $suggestion.innerHTML = `<b>${query}</b>${suggestion.substring(query.length)}`;

  return $suggestion;
}

export function initSearch() {
  const $search = document.querySelector(".header__search");
  const $searchInput = $search.querySelector("input");
  const $suggestions = $search.querySelector(".search-suggestions");

  $searchInput.addEventListener("input", (event) => {
    const query = event.target.value;

    createSuggestions({ $suggestions, query });
  });
}
