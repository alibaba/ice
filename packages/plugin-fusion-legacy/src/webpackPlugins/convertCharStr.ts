function convertCharStr2CSS(ch: string) {
  let code = ch.charCodeAt(0).toString(16);
  while (code.length < 4) {
    code = `0${code}`;
  }
  return `\\${code}`;
}

export default convertCharStr2CSS;
