const { stdout, stderr, kill } = require("process");

function startApache() {
  const { exec } = require("child_process");
  exec(__dirname + "/../resources/apache24/bin/httpd.exe");

  document.querySelector("#apache_btn_service").innerHTML = "Parar";
  document
    .querySelector("#apache_btn_service")
    .setAttribute("onclick", "stopApache()");
  document
    .querySelector(".apache_status")
    .setAttribute("class", "apache_status active");
}

async function stopApache() {
  const { exec } = require("child_process");
  exec("taskkill /IM httpd.exe /F");
  document.querySelector("#apache_btn_service").innerHTML = "Iniciar";
  document
    .querySelector("#apache_btn_service")
    .setAttribute("onclick", "startApache()");
  document
    .querySelector(".apache_status")
    .setAttribute("class", "apache_status");
}

// MYSQLD

function startMariaDB() {
  const { exec } = require("child_process");
  exec(__dirname + "/../resources/mariadb/bin/mysqld.exe");

  document.querySelector("#mariadb_btn_service").innerHTML = "Parar";
  document
    .querySelector("#mariadb_btn_service")
    .setAttribute("onclick", "stopMariaDB()");
  document
    .querySelector(".mariadb_status")
    .setAttribute("class", "mariadb_status active");
}

async function stopMariaDB() {
  const { exec } = require("child_process");
  exec("taskkill /IM mysqld.exe /F");
  document.querySelector("#mariadb_btn_service").innerHTML = "Iniciar";
  document
    .querySelector("#mariadb_btn_service")
    .setAttribute("onclick", "startMariaDB()");
  document
    .querySelector(".mariadb_status")
    .setAttribute("class", "mariadb_status");
}

function openPHP_INI() {
  const { exec } = require("child_process");
  exec("start " + __dirname + "/../resources/php/php.ini");
}

function openHTTPD_CONF() {
  const { exec } = require("child_process");
  exec("start " + __dirname + "/../resources/apache24/conf/httpd.conf");
}

function openMARIADB() {
  const { exec } = require("child_process");
  exec("start " + __dirname + "/../resources/mariadb");
}
