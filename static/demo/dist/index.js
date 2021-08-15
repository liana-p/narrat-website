import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

import "../_snowpack/pkg/es6-promise/auto.js";
import "./sass/main.css.proxy.js";
import {createApp} from "../_snowpack/pkg/vue.js";
import GameApp from "./app.vue.js";
import {setupStore} from "./store.js";
import "./lib.js";
import {images} from "./utils/images-loader.js";
import {getConfig} from "./config.js";
import {aabb, screenToCanvas} from "./utils/helpers.js";
import {debounce} from "./utils/debounce.js";
let app;
let store;
const mousePos = {
  x: 0,
  y: 0
};
export function startApp(config, options) {
  document.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });
  document.addEventListener("click", debounce(mouseclick, 100, {maxWait: 200, isImmediate: true}));
  console.log("%c Narrat game engine – [VI]{version} - {date}[/VI]", "background: #222; color: #bada55");
  const storeSetup = setupStore(options);
  store = storeSetup.store;
  app = createApp(GameApp, {
    config,
    options
  });
  app.use(store, storeSetup.key);
  app.mount("#app");
  if (options.debug) {
    const narrat = {
      store,
      app,
      state: store.state
    };
    window.narrat = narrat;
  }
  if (undefined /* [snowpack] import.meta.hot */ ) {
    undefined /* [snowpack] import.meta.hot */ .accept();
    undefined /* [snowpack] import.meta.hot */ .dispose(() => {
    });
  }
  gameLoop();
}
let canvas;
let ctx;
function gameLoop() {
  if (store.state.playing) {
    if (!canvas) {
      canvas = document.querySelector("#background-canvas");
      if (canvas && !ctx) {
        ctx = canvas.getContext("2d");
      }
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const currentScreen = store.state.currentScreen;
      const screen = getConfig().screens[currentScreen];
      const bg = screen.background;
      ctx.drawImage(images[bg], 0, 0);
      let foundCollision = false;
      const scaledMousePos = screenToCanvas(mousePos.x, mousePos.y, store.state.rendering);
      if (screen.buttons) {
        for (const buttonName of screen.buttons) {
          if (store.state.buttons[buttonName].enabled) {
            const button = getConfig().buttons[buttonName];
            const image = images[button.background];
            ctx.drawImage(image, button.position.left, button.position.top);
            if (aabb(scaledMousePos.x, scaledMousePos.y, 1, 1, button.position.left, button.position.top, button.position.width, button.position.height)) {
              foundCollision = true;
            }
          }
        }
      }
      if (foundCollision) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
    }
  }
  window.requestAnimationFrame(gameLoop);
}
function mouseclick(e) {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  const scaledMousePos = screenToCanvas(mousePos.x, mousePos.y, store.state.rendering);
  const currentScreen = store.state.currentScreen;
  const screen = getConfig().screens[currentScreen];
  if (screen.buttons) {
    for (const buttonName of screen.buttons) {
      if (store.state.buttons[buttonName].enabled) {
        const button = getConfig().buttons[buttonName];
        if (aabb(scaledMousePos.x, scaledMousePos.y, 1, 1, button.position.left, button.position.top, button.position.width, button.position.height)) {
          const scriptToRun = button.action;
          const newStack = {
            branch: store.state.machine.script[scriptToRun],
            currentIndex: 0
          };
          store.commit("setStack", newStack);
          store.dispatch("runLine");
        }
      }
    }
  }
}
