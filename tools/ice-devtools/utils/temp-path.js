const fs = require('fs');
const path = require('path');

module.exports = function getTempPath() {
  const TEMP_PATH = path.join(__dirname, '../.tmp');
  if (!fs.existsSync(TEMP_PATH)) {
    fs.mkdirSync(TEMP_PATH);
  }
  return TEMP_PATH;
}
