import './dialog-box.vue.css.proxy.js';
import {defineComponent} from "../_snowpack/pkg/vue.js";
import {getCharacterStyle} from "./utils/characters.js";
const defaultExport = defineComponent({
  data() {
    return {
      passed: false
    };
  },
  props: {
    options: Object,
    active: Boolean
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (this.canInteract) {
        let choice = -1;
        if (e.key === " ") {
          if (this.choices) {
            choice = 0;
          } else {
            this.chooseOption(0);
          }
        } else {
          switch (e.key) {
            case " ":
              choice = 0;
              break;
            case "1":
              choice = 0;
              break;
            case "2":
              choice = 1;
              break;
            case "3":
              choice = 2;
              break;
            case "4":
              choice = 3;
              break;
            case "5":
              choice = 4;
              break;
          }
        }
        if (choice !== -1 && this.choices && choice < this.choices.length) {
          this.chooseOption(this.choices[choice]);
        }
      }
    });
  },
  computed: {
    preText() {
      if (this.options.title) {
        return " &nbsp;\u2013&nbsp; ";
      } else {
        return "";
      }
    },
    style() {
      return getCharacterStyle(this.options.styleId);
    },
    dialogBoxStyle() {
      const style = getCharacterStyle(this.options.styleId);
      const css = {
        opacity: this.options.old ? "0.5" : "1"
      };
      if (!this.options.title) {
        css.marginTop = "-20px";
      }
      return {...style.boxCss, ...css};
    },
    titleStyle() {
      const style = getCharacterStyle(this.options.styleId);
      const result = {color: style.color, ...style.nameCss};
      return result;
    },
    textStyle() {
      const style = getCharacterStyle(this.options.styleId);
      return style.textCss;
    },
    choices() {
      if (this.options.choices) {
        return this.options.choices;
      }
      return void 0;
    },
    canInteract() {
      return this.active && !this.passed && this.options.interactive;
    }
  },
  methods: {
    chooseOption(choice) {
      this.passed = true;
      this.$store.dispatch("playerAnswered", choice.originalIndex);
    },
    dialogStyle(choice) {
      const style = {};
      if (!choice.allowed) {
        style.pointerEvents = "none";
        style.textDecoration = "line-through";
      }
      return style;
    }
  }
});
import { normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment } from "../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "dialog-content" }
const _hoisted_2 = ["innerHTML"]
const _hoisted_3 = ["innerHTML"]
const _hoisted_4 = ["innerHTML"]
const _hoisted_5 = {
  key: 1,
  class: "dialog-choices"
}
const _hoisted_6 = ["onClick", "innerHTML"]
const _hoisted_7 = {
  key: 2,
  class: "buttons-container"
}

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", {
    class: "dialog-box w-full override",
    style: _normalizeStyle(_ctx.dialogBoxStyle)
  }, [
    _createElementVNode("div", _hoisted_1, [
      (_ctx.options.title)
        ? (_openBlock(), _createElementBlock("span", {
            key: 0,
            class: "dialog-title override",
            style: _normalizeStyle(_ctx.titleStyle),
            innerHTML: _ctx.options.title
          }, null, 12, _hoisted_2))
        : _createCommentVNode("", true),
      _createElementVNode("span", {
        class: "dialog-text dialog-separator override",
        style: _normalizeStyle(_ctx.textStyle),
        innerHTML: _ctx.preText
      }, null, 12, _hoisted_3),
      _createElementVNode("span", {
        class: "dialog-text override",
        style: _normalizeStyle(_ctx.textStyle),
        innerHTML: _ctx.options.text
      }, null, 12, _hoisted_4),
      (_ctx.canInteract && _ctx.choices)
        ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
            (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.choices, (choice, index) => {
              return (_openBlock(), _createElementBlock("p", {
                key: index,
                style: _normalizeStyle(_ctx.dialogStyle(choice)),
                onClick: $event => (_ctx.chooseOption(choice)),
                class: "dialog-choice override",
                innerHTML: `${index + 1}. –  ${choice.choice}`
              }, null, 12, _hoisted_6))
            }), 128))
          ]))
        : (_ctx.canInteract)
          ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
              _createElementVNode("div", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.chooseOption(0))),
                class: "interact-button override"
              }, " Continue ")
            ]))
          : _createCommentVNode("", true)
    ])
  ], 4))
};

defaultExport.render = render;

export default defaultExport;