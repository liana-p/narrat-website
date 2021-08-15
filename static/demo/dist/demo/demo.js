import {startApp} from "../index.js";
window.addEventListener("load", () => {
  startApp({
    charactersPath: "data/characters.json",
    configPath: "data/config.json"
  }, {
    logging: false,
    debug: false
  });
});
