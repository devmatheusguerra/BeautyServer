function local() {
  const { exec } = require("child_process");
  exec("start " + __dirname + "/../");
}

function minimize() {
  const { ipcRenderer } = require("electron");
  ipcRenderer.send("asynchronous-message", "minimize");
}

function quit() {
  const { ipcRenderer } = require("electron");
  ipcRenderer.send("asynchronous-message", "quit");
}

function githubProject() {
  const { exec } = require("child_process");
  exec("start " + "https://github.com/devmatheusguerra/BeautyServer");
}

function help() {
  const { exec } = require("child_process");
  exec("start " + "https://github.com/devmatheusguerra/BeautyServer#readme");
}

function donate() {
  const { exec } = require("child_process");
  exec(
    "start " + "https://www.paypal.com/donate?hosted_button_id=RH8P5GCRQM3P8"
  );
}

// GET Preference Auto Start User
const checked_button = document.querySelector("input[type=checkbox]");
const preferences = require(__dirname + "/data/preferences.json");
checked_button.checked = preferences.auto_start;

checked_button.onchange = () => {
  const fs = require("fs");
  fs.writeFileSync(
    __dirname + "/data/preferences.json",
    JSON.stringify({
      ...preferences,
      auto_start: checked_button.checked,
    }),
    "utf-8"
  );

  const os = require("os");
  const path = require("path");
  // Full Path to Auto Startup Windows folder.
  var path_startup = path.join(
    os.userInfo().homedir,
    "\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup"
  );
  if (checked_button.checked) {
    // Create a .bat file to autoinitialize.
    const bat_file_content = `start '${preferences.install_path}'`;
    fs.writeFileSync(
      path_startup + "\\beautyserver-start.bat",
      bat_file_content,
      "utf-8"
    );
  } else {
    fs.unlinkSync(path_startup + "\\beautyserver-start.bat");
  }
};
