function list_htdocs() {
  const { dir } = require("console");
  const fs = require("fs");
  const path = require("path");
  const dir_path = __dirname + "/../resources/htdocs";

  var html = `
<div id="add_project" onclick="showProjectDialog()">
    <i class="fas fa-folder-plus"></i>
    Novo Projeto
</div>`;
  const files = fs.readdirSync(dir_path, () => {});
  const dir_full_information = [];
  files.forEach((file) => {
    const result = fs.statSync(dir_path + "/" + file);

    const ext = path.extname(dir_path + "/" + file);
    let icon = '<i class="fas fa-file-code"></i>';
    if (ext != null) {
      if (ext == ".html" || path.extname(file) == ".htm") {
        icon = '<i class="fab fa-html5"></i>';
      } else if (ext == ".php") {
        icon = '<i class="fab fa-php"></i>';
      } else if (ext == ".css") {
        icon = '<i class="fab fa-css3-alt"></i>';
      } else if (ext == ".js") {
        icon = '<i class="fab fa-js"></i>';
      }
    }
    dir_full_information.push({
      isDir: result.isDirectory(),
      name: file,
      realpath: btoa(fs.realpathSync(dir_path + "/" + file)),
      ext: path.extname(dir_path + "/" + file) || null,
      icon,
    });
  });

  for (elem of dir_full_information) {
    if (elem.isDir) {
      html += `<div onclick="openFile('${elem.realpath}')" class="folders" type="folder" path="${elem.realpath}">
      <i class="fas fa-folder-open"></i>
        ${elem.name}
      </div>`;
    } else {
      html += `<div onclick="openFile('${elem.realpath}')" class="folders" type="file" path="${elem.realpath}">
        ${elem.icon}
        ${elem.name}
      </div>`;
    }
  }

  return html;
}
