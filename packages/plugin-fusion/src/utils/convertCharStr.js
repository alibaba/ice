function convertCharStr2CSS(ch) {
  let code = ch.charCodeAt(0).toString(16);
  while (code.length < 4) {
    code = `0${code}`;
  }
  return `\\${code}`;
}

module.exports = convertCharStr2CSS;