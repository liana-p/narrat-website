// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".debug-menu {\n  z-index: 9999;\n}\n\n.debug-button {\n  position: fixed;\n  bottom: 10px;\n  left: 10px;\n}\n\n.error-message {\n  color: orangered;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.error-filename {\n  color: grey;\n  text-decoration: underline;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}