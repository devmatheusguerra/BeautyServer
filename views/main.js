const { BrowserWindow } = require("electron");
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  maximizable: false,
  minHeight: 600,
  maxHeight: 600,
  minWidth: 800,
  maxWidth: 800,
  maximizable: false,
  minimizable: false,
  movable: true,
  frame: false,
  show: false,
  modal: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
});

mainWindow.loadFile("./src/index.html");
mainWindow.removeMenu();

module.exports = mainWindow;
