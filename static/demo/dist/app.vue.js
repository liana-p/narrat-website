import './app.vue.css.proxy.js';
import {defineComponent} from "../_snowpack/pkg/vue.js";
import DialogBox from "./dialog-box.vue.js";
import DialogPicture from "./components/dialog-picture.vue.js";
import DebugMenu from "./components/debug/debug-menu.vue.js";
import VolumeControls from "./components/volume-controls.vue.js";
import LoadingBar from "./components/loading-bar.vue.js";
import {getFile} from "./utils/ajax.js";
import {
  getCharacterInfo,
  getCharacterPictureUrl,
  setCharactersConfig
} from "./utils/characters.js";
import {processText} from "./utils/string-helpers.js";
import {getConfig, setConfig} from "./config.js";
import {SAVE_FILE} from "./constants.js";
import {loadImages} from "./utils/images-loader.js";
import {loadAudioAssets} from "./utils/audio-loader.js";
import {debounce} from "./utils/debounce.js";
console.log("hello app");
const defaultExport = defineComponent({
  components: {
    VolumeControls,
    DialogBox,
    DialogPicture,
    DebugMenu,
    LoadingBar
  },
  data() {
    return {
      lineTitle: "title",
      lineText: "hello",
      gameLoaded: false,
      dialogPlaying: false,
      loadingStep: "Loading",
      loadingPercentage: 0.1
    };
  },
  props: {
    config: Object,
    options: Object
  },
  async mounted() {
    this.loadingStep = "Characters";
    const charsFile = await getFile("data/characters.json");
    await setCharactersConfig(JSON.parse(charsFile));
    this.loadingPercentage = 0.2;
    this.loadingStep = "Data";
    const configFile = await getFile("data/config.json");
    await setConfig(JSON.parse(configFile));
    this.loadingPercentage = 0.3;
    this.loadingStep = "Images";
    await loadImages(getConfig());
    this.loadingPercentage = 0.7;
    this.loadingStep = "Audio";
    await loadAudioAssets(getConfig());
    this.loadingPercentage = 0.95;
    this.loadingStep = "Starting...";
    await this.startMachine();
    this.loadingPercentage = 0.1;
    this.gameLoaded = true;
    window.addEventListener("resize", debounce(() => {
      this.updateScreenSize();
    }, 100, {
      maxWait: 200
    }));
    this.updateScreenSize();
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
    lastDialog() {
      if (this.dialog.length > 0) {
        return this.dialog[this.dialog.length - 1];
      }
      return void 0;
    },
    command() {
      return this.$store.getters.command;
    },
    picture() {
      if (this.lastDialog) {
        return getCharacterPictureUrl(this.lastDialog.speaker, this.lastDialog.pose);
      }
      return void 0;
    },
    saveFile() {
      const saveString = localStorage.getItem(SAVE_FILE);
      return saveString;
    },
    backgroundStyle() {
      return {
        width: `${this.backgroundSize.width}px`,
        height: `${this.backgroundSize.height}px`,
        top: `${this.backgroundSize.top}px`,
        left: `${this.backgroundSize.left}px`,
        backgroundColor: "red",
        position: "absolute"
      };
    },
    gameWidth() {
      return getConfig().layout.backgrounds.width;
    },
    gameHeight() {
      return getConfig().layout.backgrounds.height;
    },
    screenWidth() {
      return this.$store.state.rendering.screenWidth;
    },
    screenHeight() {
      return this.$store.state.rendering.screenHeight;
    },
    backgroundSize() {
      return {
        width: this.$store.state.rendering.canvasWidth,
        height: this.$store.state.rendering.canvasHeight,
        top: this.$store.state.rendering.topOffset,
        left: this.$store.state.rendering.leftOffset
      };
    },
    dialogStyle() {
      return {
        position: "absolute",
        backgroundColor: "green",
        width: `${getConfig().layout.minTextWidth}px`,
        height: "100%",
        left: `${this.screenWidth - getConfig().layout.minTextWidth}px`,
        top: 0
      };
    }
  },
  methods: {
    async startMachine() {
      const scriptPaths = getConfig().scripts;
      return this.$store.dispatch("startMachine", {
        scriptPaths,
        config: getConfig()
      });
    },
    async startGame() {
      this.$store.commit("startPlaying");
      await this.$store.dispatch("runLine");
      this.dialogPlaying = true;
    },
    async loadGame() {
      this.$store.commit("startPlaying");
      await this.$store.dispatch("loadGame", this.saveFile);
      this.dialogPlaying = true;
    },
    isDialogActive(i) {
      const result = i === this.dialog.length - 1 && this.$store.state.machine.stack.length > 0;
      return result;
    },
    nextLine() {
      this.$store.dispatch("nextLine");
    },
    choosePrompt(index) {
      this.$store.dispatch("choosePrompt", index);
    },
    updateScreenSize() {
      this.$store.commit("updateScreenSize", {
        width: window.innerWidth,
        height: window.innerHeight
      });
    },
    getDialogBoxOptions(dialogKey, index) {
      const info = getCharacterInfo(dialogKey.speaker);
      let title = info.name;
      if (index >= 1) {
        const previousDialog = this.dialog[index - 1];
        if (previousDialog.speaker === dialogKey.speaker) {
          title = void 0;
        }
      }
      return {
        title,
        text: processText(this.$store, dialogKey.text),
        styleId: dialogKey.speaker,
        choices: dialogKey.choices,
        old: index < this.dialog.length - 1,
        interactive: dialogKey.interactive
      };
    }
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, Transition as _Transition, withCtx as _withCtx, renderList as _renderList, Fragment as _Fragment, TransitionGroup as _TransitionGroup } from "../_snowpack/pkg/vue.js"

const _hoisted_1 = { id: "app" }
const _hoisted_2 = ["width", "height"]
const _hoisted_3 = { class: "dialog-container override" }
const _hoisted_4 = {
  key: 2,
  class: "flex flex-col"
}
const _hoisted_5 = { key: 3 }

export function render(_ctx, _cache) {
  const _component_VolumeControls = _resolveComponent("VolumeControls")
  const _component_DialogPicture = _resolveComponent("DialogPicture")
  const _component_DialogBox = _resolveComponent("DialogBox")
  const _component_LoadingBar = _resolveComponent("LoadingBar")
  const _component_DebugMenu = _resolveComponent("DebugMenu")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_VolumeControls),
    (_ctx.dialogPlaying)
      ? (_openBlock(), _createElementBlock("div", {
          key: 0,
          class: "background",
          style: _normalizeStyle(_ctx.backgroundStyle)
        }, [
          _createElementVNode("canvas", {
            width: _ctx.gameWidth,
            height: _ctx.gameHeight,
            id: "background-canvas"
          }, null, 8, _hoisted_2)
        ], 4))
      : _createCommentVNode("", true),
    (_ctx.dialogPlaying)
      ? (_openBlock(), _createElementBlock("div", {
          key: 1,
          class: "dialog override",
          style: _normalizeStyle(_ctx.dialogStyle)
        }, [
          _createVNode(_Transition, { name: "fade" }, {
            default: _withCtx(() => [
              (_ctx.picture)
                ? (_openBlock(), _createBlock(_component_DialogPicture, {
                    key: 0,
                    pictureUrl: _ctx.picture
                  }, null, 8, ["pictureUrl"]))
                : _createCommentVNode("", true)
            ]),
            _: 1
          }),
          _createElementVNode("div", _hoisted_3, [
            _createVNode(_TransitionGroup, {
              name: "list",
              tag: "div",
              class: "w-full"
            }, {
              default: _withCtx(() => [
                (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.dialog, (dialog, i) => {
                  return (_openBlock(), _createBlock(_component_DialogBox, {
                    key: i,
                    options: _ctx.getDialogBoxOptions(dialog, i),
                    active: _ctx.isDialogActive(i)
                  }, null, 8, ["options", "active"]))
                }), 128))
              ]),
              _: 1
            })
          ])
        ], 4))
      : (_ctx.gameLoaded)
        ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            _createElementVNode("button", {
              class: "button menu-button start-button override",
              onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.startGame && _ctx.startGame(...args)))
            }, " Start Game "),
            (_ctx.saveFile)
              ? (_openBlock(), _createElementBlock("button", {
                  key: 0,
                  class: "button menu-button continue-button override",
                  onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.loadGame && _ctx.loadGame(...args)))
                }, " Continue Game "))
              : _createCommentVNode("", true)
          ]))
        : (_openBlock(), _createElementBlock("div", _hoisted_5, [
            _createVNode(_component_LoadingBar, {
              percentage: _ctx.loadingPercentage,
              step: _ctx.loadingStep
            }, null, 8, ["percentage", "step"])
          ])),
    (_ctx.options.debug)
      ? (_openBlock(), _createBlock(_component_DebugMenu, { key: 4 }))
      : _createCommentVNode("", true)
  ]))
};

defaultExport.render = render;

export default defaultExport;