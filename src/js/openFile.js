const { exec } = require("child_process");
function openFile(path) {
  exec("start " + atob(path));
}
