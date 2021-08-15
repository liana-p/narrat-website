import './debug-menu.vue.css.proxy.js';
import {defineComponent} from "../../../_snowpack/pkg/vue.js";
import Modal from "../utils/modal.vue.js";
const defaultExport = defineComponent({
  components: {
    Modal
  },
  data() {
    return {
      showDebug: false
    };
  },
  methods: {
    labelSelected(event) {
      const labelName = event.target.value;
      this.$store.dispatch("runLabel", labelName);
      this.close();
    },
    close() {
      this.showDebug = false;
    },
    closeErrors() {
      this.$store.commit("clearErrors");
    },
    open() {
      this.showDebug = true;
    },
    save() {
      this.$store.dispatch("saveGame");
    },
    wordCount() {
      const scripts = Object.values(this.$store.state.machine.script);
      const count = scripts.reduce((count2, script) => {
        console.log(count2);
        return count2 + this.countWordsInScriptBranch(script);
      }, 0);
      alert(`You have ${count} words`);
    },
    countWordsInScriptLine(scriptLine) {
      if (scriptLine.commandType === "talk") {
        return this.countWordsInString(scriptLine.args[2]);
      }
      if (scriptLine.commandType === "text") {
        return this.countWordsInString(scriptLine.options.text);
      }
      if (scriptLine.commandType === "choice") {
        const opt = scriptLine.options;
        let count = this.countWordsInScriptLine(opt.prompt);
        count += opt.choices.reduce((count2, choice) => count2 + this.countWordsInString(choice.choice), 0);
        const choices = opt.choices;
        return choices.reduce((count2, choice) => {
          return count2 + this.countWordsInScriptBranch(choice.branch);
        }, count);
      }
      if (scriptLine.commandType === "if") {
        const opt = scriptLine.options;
        const branches = [opt.success, opt.failure];
        return branches.reduce((count, choice) => {
          if (choice) {
            return count + this.countWordsInScriptBranch(choice);
          }
          return count;
        }, 0);
      }
      return 0;
    },
    countWordsInString(string) {
      return string.split(" ").length;
    },
    countWordsInScriptBranch(branch) {
      return branch.reduce((count, script) => {
        if (script) {
          return count + this.countWordsInScriptLine(script);
        }
        return count;
      }, 0);
    }
  },
  computed: {
    labels() {
      const scripts = this.$store.state.machine.script;
      return Object.keys(scripts).sort();
    },
    errors() {
      return this.$store.state.errors;
    }
  }
});
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString } from "../../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "debug-menu" }
const _hoisted_2 = /*#__PURE__*/_createElementVNode("h3", null, "Error(s)", -1)
const _hoisted_3 = /*#__PURE__*/_createTextVNode(" There are errors in your dialogue scripts. Open the developer console for more details. ")
const _hoisted_4 = ["innerHTML"]
const _hoisted_5 = /*#__PURE__*/_createElementVNode("h3", null, "Debug Menu!", -1)
const _hoisted_6 = /*#__PURE__*/_createTextVNode(" Hello this is the debug menu. ")
const _hoisted_7 = /*#__PURE__*/_createElementVNode("option", {
  selected: "",
  disabled: ""
}, "Jump to a label", -1)
const _hoisted_8 = ["value"]
const _hoisted_9 = { class: "grid grid-cols-3 gap-4" }

export function render(_ctx, _cache) {
  const _component_modal = _resolveComponent("modal")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("button", {
      onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.open && _ctx.open(...args))),
      class: "debug-button"
    }, "Debug Menu"),
    (_ctx.errors.length > 0)
      ? (_openBlock(), _createBlock(_component_modal, {
          key: 0,
          onClose: _ctx.closeErrors
        }, {
          header: _withCtx(() => [
            _hoisted_2
          ]),
          body: _withCtx(() => [
            _hoisted_3,
            _createElementVNode("ul", null, [
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.errors, (error, index) => {
                return (_openBlock(), _createElementBlock("li", {
                  key: index,
                  class: "error-message list-disc",
                  innerHTML: error.text
                }, null, 8, _hoisted_4))
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["onClose"]))
      : _createCommentVNode("", true),
    (_ctx.showDebug)
      ? (_openBlock(), _createBlock(_component_modal, {
          key: 1,
          onClose: _ctx.close
        }, {
          header: _withCtx(() => [
            _hoisted_5
          ]),
          body: _withCtx(() => [
            _hoisted_6,
            _createElementVNode("select", {
              name: "label-selector",
              onChange: _cache[1] || (_cache[1] = $event => (_ctx.labelSelected($event)))
            }, [
              _hoisted_7,
              (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.labels, (label) => {
                return (_openBlock(), _createElementBlock("option", {
                  value: label,
                  key: label
                }, _toDisplayString(label), 9, _hoisted_8))
              }), 128))
            ], 32),
            _createElementVNode("div", _hoisted_9, [
              _createElementVNode("button", {
                onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.wordCount && _ctx.wordCount(...args)))
              }, "Word Count"),
              _createElementVNode("button", {
                onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.save && _ctx.save(...args)))
              }, "Save Game")
            ])
          ]),
          _: 1
        }, 8, ["onClose"]))
      : _createCommentVNode("", true)
  ]))
};

defaultExport.render = render;

export default defaultExport;