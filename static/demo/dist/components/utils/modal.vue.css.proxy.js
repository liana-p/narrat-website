// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".modal-mask {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  transition: opacity 0.3s ease;\n}\n\n.modal-wrapper {\n  display: table-cell;\n  vertical-align: middle;\n}\n\n.modal-container {\n  min-width: 300px;\n  max-width: 90vw;\n  margin: 0px auto;\n  padding: 20px 30px;\n  border-radius: 2px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  transition: all 0.3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n\n.modal-header h3 {\n  margin-top: 0;\n  color: #42b983;\n}\n\n.modal-body {\n  margin: 20px 0;\n}\n\n.modal-default-button {\n  float: right;\n}\n\n/*\n * The following styles are auto-applied to elements with\n * transition=\"modal\" when their visibility is toggled\n * by Vue.js.\n *\n * You can easily play with the modal transition by editing\n * these styles.\n */\n\n.modal-enter {\n  opacity: 0;\n}\n\n.modal-leave-active {\n  opacity: 0;\n}\n\n.modal-enter .modal-container,\n.modal-leave-active .modal-container {\n  transform: scale(1.1);\n}\n\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}