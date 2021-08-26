import {startApp} from "../_snowpack/pkg/narrat.js";
window.addEventListener("load", () => {
  startApp({
    charactersPath: "data/characters.json",
    configPath: "data/config.json"
  }, {
    debug: false,
    logging: false
  });
});
