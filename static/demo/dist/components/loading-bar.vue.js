import './loading-bar.vue.css.proxy.js';
import {defineComponent} from "../../_snowpack/pkg/vue.js";
const defaultExport = defineComponent({
  props: {
    percentage: Number,
    step: String
  },
  methods: {
    loadingStyle() {
      const maxWidth = 40;
      const width = this.percentage * maxWidth;
      return {
        width: `${width}vw`
      };
    }
  },
  computed: {}
});
import { normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "loading-bar" }
const _hoisted_2 = { class: "loading-text" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      class: "inner-loading-bar",
      style: _normalizeStyle(_ctx.loadingStyle())
    }, null, 4),
    _createElementVNode("div", _hoisted_2, [
      _createElementVNode("span", null, "Loading " + _toDisplayString(Math.floor(_ctx.percentage * 100)) + "% - " + _toDisplayString(_ctx.step), 1)
    ])
  ]))
};

defaultExport.render = render;

export default defaultExport;