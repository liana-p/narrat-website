import './dialog-picture.vue.css.proxy.js';
import {defineComponent} from "../../_snowpack/pkg/vue.js";
const defaultExport = defineComponent({
  props: {
    pictureUrl: String
  }
});
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "dialog-picture override" }
const _hoisted_2 = ["src"]

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("img", {
      src: _ctx.pictureUrl,
      class: "picture override"
    }, null, 8, _hoisted_2)
  ]))
};

defaultExport.render = render;

export default defaultExport;