import { initDummyData } from "./dummy.js";
import { setCarousel } from "./carousel.js";
import { initThemeMode } from "./theme.js";
import { initSearch } from "./search.js";

function main() {
  initDummyData();
  initThemeMode();
  setCarousel();
  initSearch();
}

main();
