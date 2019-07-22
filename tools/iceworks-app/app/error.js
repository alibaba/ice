const { remote, shell } = require('electron')
const log = require('electron-log');

const logPath = log.transports.file.findLogPath(remote.app.getName());

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('log_text').innerText = logPath;
}, false);

document.getElementById('log_text').addEventListener('click', function() {
  shell.showItemInFolder(logPath);
  shell.openItem(logPath);
});
