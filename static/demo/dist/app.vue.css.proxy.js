// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#app {\n  background-color: black;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  width: 100vw;\n  height: 100vh;\n  box-sizing: border-box;\n}\n\n.interact-button {\n  height: 50px;\n  background-color: #72080f;\n  border: 1px solid black;\n  font-weight: bold;\n  font-size: 20px;\n  text-align: center;\n  flex-grow: 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n.interact-button:not(:last-child) {\n  margin-right: 10px;\n}\n\n.dialog-container {\n  flex-grow: 2;\n  height: 100%;\n  /* padding: 20px; */\n  background-color: #171717;\n  overflow-y: scroll;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n  padding-bottom: 200px;\n}\n\n.dialog {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  align-items: center;\n  float: right;\n  margin: 0;\n}\n\n.background {\n  margin: 0;\n}\n\n#background-canvas {\n  width: 100%;\n  height: 100%;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}