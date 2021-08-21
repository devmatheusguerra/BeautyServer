const { ipcMain, app, BrowserWindow, dialog } = require("electron");
const { exec } = require("child_process");
function manageWindows() {
  const mainWindow = require("./views/main");
  const splash = require("./views/splash");
  const child = require("./views/child");

  setTimeout(() => {
    splash.destroy();
    mainWindow.show();
    mainWindow.focusOnWebView();
  }, 5000);

  ipcMain.on("asynchronous-message", (event, arg) => {
    // New project button clicked.
    if (arg == "+project") {
      child.show();
    } else if (arg == "cancel") {
      // Cancel modal new project.
      child.hide();
    } else if (arg == "minimize") {
      mainWindow.minimize();
    } else if (arg == "quit") {
      const confirm = dialog.showMessageBoxSync(mainWindow, {
        type: "question",
        title: "Você está prestes a finalizar a aplicação",
        message: "Deseja continuar?",
        buttons: ["Cancelar", "Sim"],
        noLink: true,
      });
      console.log(confirm);
      if (confirm == 1) {
        exec("taskkill /IM httpd.exe /F");
        exec("taskkill /IM mysqld.exe /F");
        app.quit();
      }
    }
  });
}

app.whenReady().then(() => {
  manageWindows();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  exec("taskkill /IM httpd.exe /F");
  exec("taskkill /IM mysqld.exe /F");
  if (process.platform !== "darwin") app.quit();
});
