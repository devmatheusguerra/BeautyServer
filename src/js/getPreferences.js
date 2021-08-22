function getPreferences(obj) {
  const preferences = require(__dirname + "/data/preferences.json");
  try {
    document.querySelector("#project_dev").value = preferences.author;
    document.querySelector("#project_email").value = preferences.email;
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("DOMContentLoaded", getPreferences);
