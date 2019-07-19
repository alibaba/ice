const { remote } = require('electron')
const log = require('electron-log');

document.addEventListener('DOMContentLoaded', function() {
  const logPath = log.transports.file.findLogPath(remote.app.getName());
  document.getElementById('log_text').innerText = logPath;
}, false)