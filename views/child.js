const { BrowserWindow } = require("electron");
const mainWindow = require("./main");
const child = new BrowserWindow({
  parent: mainWindow,
  modal: true,
  show: false,
  width: 400,
  height: 600,
  maximizable: false,
  minHeight: 600,
  maxHeight: 600,
  minWidth: 338,
  maxWidth: 343,
  maximizable: false,
  minimizable: false,
  movable: true,
  frame: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
});

child.loadFile("./src/modal.html");

module.exports = child;
