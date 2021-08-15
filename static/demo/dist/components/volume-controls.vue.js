import './volume-controls.vue.css.proxy.js';
import {Howler} from "../../_snowpack/pkg/howler.js";
import {defineComponent} from "../../_snowpack/pkg/vue.js";
const defaultExport = defineComponent({
  data() {
    return {
      muted: false
    };
  },
  mounted() {
    Howler.volume(0.5);
  },
  methods: {
    changeVolume(event) {
      console.log(event);
      const target = event.target;
      Howler.volume(target.value);
      console.log(target.value);
    },
    toggleMute() {
      if (this.muted) {
        Howler.mute(false);
        this.muted = false;
      } else {
        Howler.mute(true);
        this.muted = true;
      }
    }
  }
});
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "volume-controls" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("input", {
      type: "range",
      id: "volume",
      name: "volume",
      min: "0",
      max: "1",
      step: "0.1",
      value: "0.5",
      onChange: _cache[0] || (_cache[0] = (...args) => (_ctx.changeVolume && _ctx.changeVolume(...args)))
    }, null, 32),
    _createElementVNode("button", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.toggleMute && _ctx.toggleMute(...args)))
    }, "Mute/Unmute")
  ]))
};

defaultExport.render = render;

export default defaultExport;