import { SEARCH_SUGGESTIONS } from "./constants.js";

function createSuggestions({ suggestionsEl, query }) {
  const suggestionEls = query
    ? SEARCH_SUGGESTIONS.reduce((acc, cur) => {
        if (!cur.startsWith(query)) return acc;
        return [...acc, createSuggestionEl({ query, suggestion: cur })];
      }, [])
    : [];

  suggestionsEl.replaceChildren(...suggestionEls);
}

function createSuggestionEl({ query, suggestion }) {
  const suggestionEl = document.createElement("div");
  suggestionEl.classList.add("search-suggestion");
  suggestionEl.innerHTML = `<b>${query}</b>${suggestion.substring(query.length)}`;

  return suggestionEl;
}

export function initSearch() {
  const searchEl = document.body.querySelector(".header__search");
  const searchInputEl = searchEl.querySelector("input");
  const suggestionsEl = searchEl.querySelector(".search-suggestions");

  searchInputEl.addEventListener("input", (event) => {
    const query = event.target.value;

    createSuggestions({ suggestionsEl, query });
  });
}
