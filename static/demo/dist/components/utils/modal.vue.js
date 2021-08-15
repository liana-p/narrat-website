import './modal.vue.css.proxy.js';
import {defineComponent} from "../../../_snowpack/pkg/vue.js";
const defaultExport = defineComponent({});
import { renderSlot as _renderSlot, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, Transition as _Transition, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "../../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "modal-mask" }
const _hoisted_2 = { class: "modal-wrapper" }
const _hoisted_3 = { class: "modal-container bg-gray-800" }
const _hoisted_4 = { class: "modal-header" }
const _hoisted_5 = /*#__PURE__*/_createTextVNode(" default header ")
const _hoisted_6 = { class: "modal-body" }
const _hoisted_7 = /*#__PURE__*/_createTextVNode(" default body ")
const _hoisted_8 = { class: "modal-footer" }
const _hoisted_9 = /*#__PURE__*/_createTextVNode(" - ")

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock(_Transition, { name: "modal" }, {
    default: _withCtx(() => [
      _createElementVNode("div", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _createElementVNode("div", _hoisted_4, [
              _renderSlot(_ctx.$slots, "header", {}, () => [
                _hoisted_5
              ])
            ]),
            _createElementVNode("div", _hoisted_6, [
              _renderSlot(_ctx.$slots, "body", {}, () => [
                _hoisted_7
              ])
            ]),
            _createElementVNode("div", _hoisted_8, [
              _renderSlot(_ctx.$slots, "footer", {}, () => [
                _hoisted_9,
                _createElementVNode("button", {
                  class: "modal-default-button",
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close')))
                }, " Close ")
              ])
            ])
          ])
        ])
      ])
    ]),
    _: 3
  }))
};

defaultExport.render = render;

export default defaultExport;