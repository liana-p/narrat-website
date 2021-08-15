import {
  createLogger,
  createStore,
  useStore as baseUseStore
} from "../_snowpack/pkg/vuex.js";
import {nextLine, playerAnswered, runLine} from "./vm/renpy-vm.js";
import {setDataHelper} from "./utils/data-helpers.js";
import {getFile} from "./utils/ajax.js";
import {parseRenpyScript} from "./renpy/renpy-parser.js";
import {SAVE_FILE} from "./constants.js";
import {getConfig} from "./config.js";
import {aspectRatioFit} from "./utils/helpers.js";
import {parserError} from "./utils/error-handling.js";
let key = Symbol("Store Injection Key");
let store;
export function setupStore(options) {
  const plugins = [];
  if (options.logging) {
    plugins.push(createLogger());
  }
  key = Symbol("Store Injection Key");
  console.log("setup store");
  store = createStore({
    state: {
      machine: {
        stack: [],
        script: {},
        data: {
          playerName: "Player"
        }
      },
      dialog: [],
      ready: false,
      count: 0,
      skills: {},
      lastLabel: "main",
      skillChecks: {},
      playing: false,
      currentScreen: "default",
      buttons: {},
      rendering: {
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
        renderRatio: 1,
        topOffset: 0,
        leftOffset: 0
      },
      audio: {},
      errors: []
    },
    getters: {
      machineHead(state) {
        return state.machine.stack[state.machine.stack.length - 1];
      },
      currentLine(state, getters) {
        const machineHead = getters.machineHead;
        return machineHead.branch[machineHead.currentIndex];
      },
      command(state, getters) {
        const machineHead = getters.machineHead;
        return machineHead.branch[machineHead.currentIndex];
      }
    },
    actions: {
      async startMachine({commit}, payload) {
        const {scriptPaths} = payload;
        const filePromises = [];
        for (const path of scriptPaths) {
          filePromises.push(getFile(path));
        }
        const files = await Promise.all(filePromises);
        const start = Date.now();
        let scripts = {};
        for (const index in files) {
          const file = files[index];
          scripts = {
            ...scripts,
            ...parseRenpyScript((ctx, line, error) => parserError(commit, ctx, line, error), file, scriptPaths[index])
          };
        }
        const end = Date.now();
        console.log(`script parsed in ${end - start} ms`);
        commit("setButtons", payload.config.buttons);
        commit("setScript", scripts);
        commit("setupSkills", payload.config.skills);
      },
      runLabel({state, commit}, label) {
        const branch = state.machine.script[label];
        if (!branch) {
          console.error(`Label ${branch} doesn't exist`);
        }
        commit("setLastLabel", label);
        state.machine.stack = [
          {
            currentIndex: 0,
            branch
          }
        ];
        this.dispatch("runLine");
      },
      async runLine(context) {
        await this.dispatch("saveGame");
        await runLine(context);
      },
      nextLine(context) {
        return nextLine(context);
      },
      playerAnswered(context, index) {
        return playerAnswered(context, index);
      },
      saveGame({state}) {
        const save = {
          data: state.machine.data,
          skills: state.skills,
          dialog: state.dialog,
          buttons: state.buttons,
          lastLabel: state.lastLabel,
          skillChecks: state.skillChecks
        };
        localStorage.setItem(SAVE_FILE, JSON.stringify(save));
      },
      loadGame({commit, dispatch}, saveFile) {
        if (saveFile) {
          const save = JSON.parse(saveFile);
          commit("setLoadedData", save);
          dispatch("runLabel", save.lastLabel);
        }
      }
    },
    mutations: {
      setLoadedData(state, save) {
        state.machine.data = save.data;
        state.skills = save.skills;
        state.dialog = save.dialog;
        state.buttons = save.buttons;
        state.lastLabel = save.lastLabel;
        state.skillChecks = save.skillChecks;
      },
      reset(state) {
        state.ready = false;
        state.machine.stack = [];
        state.machine.script = {};
        state.machine.data = {};
        state.dialog = [];
      },
      setLastLabel(state, label) {
        state.lastLabel = label;
      },
      setupSkillCheck(state, {skillCheck, skillCheckId}) {
        state.skillChecks[skillCheckId] = skillCheck;
      },
      passSkillCheck(state, skillCheckId) {
        state.skillChecks[skillCheckId].passed = true;
      },
      failSkillCheck(state, skillCheckId) {
        state.skillChecks[skillCheckId].passed = false;
        state.skillChecks[skillCheckId].available = false;
      },
      setScript(state, script) {
        state.machine.script = script;
        state.machine.stack.push({
          currentIndex: 0,
          branch: script.main
        });
        state.ready = true;
      },
      setupSkills(state, skills) {
        for (const skill in skills) {
          state.skills[skill] = {
            level: 1
          };
        }
      },
      incrementSkill(state, {skill, amount}) {
        state.skills[skill].level += amount;
      },
      addDialog(state, payload) {
        state.dialog.push(payload.dialog);
      },
      nextLine(state) {
        state.machine.stack[state.machine.stack.length - 1].currentIndex += 1;
      },
      previousStack(state) {
        state.machine.stack.splice(state.machine.stack.length - 1);
      },
      addStack(state, newStack) {
        state.machine.stack.push(newStack);
      },
      setStack(state, newStack) {
        state.machine.stack = [];
        state.machine.stack.push(newStack);
      },
      setData(state, {path, value}) {
        setDataHelper(state.machine.data, path, value);
      },
      startPlaying(state) {
        state.playing = true;
      },
      setScreen(state, screen) {
        state.currentScreen = screen;
      },
      setButtons(state, buttons) {
        for (const i in buttons) {
          state.buttons[i] = {
            enabled: buttons[i].enabled
          };
        }
      },
      clearDialog(state) {
        state.dialog.splice(0);
      },
      changeButton(state, payload) {
        state.buttons[payload.button].enabled = payload.enabled;
      },
      updateScreenSize(state, {width, height}) {
        state.rendering.screenHeight = height;
        state.rendering.screenWidth = width;
        const config = getConfig().layout;
        const gameWidth = config.backgrounds.width;
        const gameHeight = config.backgrounds.height;
        const screenWidth = width - config.minTextWidth;
        const screenHeight = height;
        const ratio = aspectRatioFit(screenWidth, screenHeight, gameWidth, gameHeight);
        state.rendering.renderRatio = ratio;
        const renderHeight = state.rendering.canvasHeight = gameHeight * ratio;
        const renderWidth = state.rendering.canvasWidth = gameWidth * ratio;
        state.rendering.topOffset = (screenHeight - renderHeight) / 2;
        state.rendering.leftOffset = (screenWidth - renderWidth) / 2;
      },
      setMusic(state, music) {
        state.audio.currentMusic = music;
      },
      createError(state, errorText) {
        state.errors.push({
          text: errorText
        });
      },
      clearErrors(state) {
        state.errors = [];
      }
    },
    plugins
  });
  return {
    store,
    key
  };
}
export function useStore() {
  console.log("use store");
  console.log(`key `, key);
  console.log(`store `, store);
  const result = baseUseStore(key);
  console.log(result);
  return result;
}
