const { BrowserWindow } = require("electron");
const splash = new BrowserWindow({
  width: 400,
  height: 400,
  frame: false,
  modal: true,
});

splash.loadFile("./src/splash.html");

module.exports = splash;
