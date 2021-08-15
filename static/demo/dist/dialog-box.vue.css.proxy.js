// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".dialog-title {\n  font-size: 18px;\n  font-weight: bold;\n}\n\n.dialog-text {\n  font-size: 14px;\n}\n\n.dialog-box {\n  /* border-radius: 10px; */\n  /* border: 1px solid #a8a8a8; */\n  color: white;\n  /* background-color: #2e2e2e; */\n  padding: 10px;\n  padding-left: 2em;\n  margin-bottom: 10px;\n}\n\n.dialog-choice {\n  color: orange;\n}\n\n.dialog-choice:hover {\n  color: white;\n  cursor: pointer;\n}\n\n.buttons-container {\n  width: 100%;\n  padding: 10px;\n  display: flex;\n  justify-content: space-evenly;\n  align-items: stretch;\n  box-sizing: border-box;\n}\n\n.interact-button {\n  height: 50px;\n  background-color: #72080f;\n  color: white;\n  border: 1px solid black;\n  font-weight: bold;\n  font-size: 20px;\n  text-align: center;\n  flex-grow: 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n}\n\n.interact-button:not(:last-child) {\n  margin-right: 10px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}