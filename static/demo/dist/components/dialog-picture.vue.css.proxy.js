// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".dialog-picture {\n  position: absolute;\n  width: 80px;\n  height: 80px;\n  top: 60%;\n  left: -60px;\n  border: 2px solid white;\n  border-radius: 10px;\n  background-color: grey;\n}\n\n.dialog-picture img {\n  width: 100%;\n  height: 100%;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}