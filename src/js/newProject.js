function newProject() {
  const { exec } = require("child_process");
  const fs = require("fs");
  const unzipper = require("unzipper");
  let local = fs.realpathSync(__dirname + "/../resources/htdocs/");
  const project_name = document.querySelector("#project_name").value;

  const stream = fs.createReadStream(
    __dirname + "/assets/skeleton-project.zip"
  );
  stream.pipe(unzipper.Extract({ path: local + "/" + project_name }));
  const tries = setInterval(() => {
    try {
      let composer = fs.readFileSync(
        local + "/" + project_name + "/composer.json",
        "utf-8"
      );
      console.log(composer);
      composer = composer.replace(
        "{{NAME}}",
        "beautyserver/" + document.querySelector("#project_name").value
      );
      composer = composer.replace(
        "{{DESCRIPTION}}",
        document.querySelector("#project_desc").value
      );
      composer = composer.replace(
        "{{LICENSE}}",
        document.querySelector("#project_license").value
      );
      composer = composer.replace(
        "{{DEV}}",
        document.querySelector("#project_dev").value
      );
      composer = composer.replace(
        "{{EMAIL}}",
        document.querySelector("#project_email").value
      );
      fs.writeFileSync(
        local + "/" + project_name + "/composer.json",
        composer,
        "utf-8"
      );

      // Change preferences
      const preferences = require(__dirname + "/data/preferences.json");
      fs.writeFileSync(
        __dirname + "/data/preferences.json",
        JSON.stringify({
          ...preferences,
          author: document.querySelector("#project_dev").value,
          email: document.querySelector("#project_email").value,
        }),
        "utf-8"
      );

      const { ipcRenderer } = require("electron");
      ipcRenderer.send("asynchronous-message", "cancel");
      clearInterval(tries);
    } catch (e) {
      console.log("Not finished!");
    }
  }, 500);
}
