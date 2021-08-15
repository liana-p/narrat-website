// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".loading-bar {\n  position: relative;\n  width: 40vw;\n  height: 10vh;\n  border: 1px solid black;\n  background-color: lightgrey;\n}\n\n.inner-loading-bar {\n  height: 100%;\n  background-color: lightgreen;\n  color: black;\n}\n\n.loading-text {\n  z-index: 99999;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  color: black;\n  top: 0;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}