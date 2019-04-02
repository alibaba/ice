module.exports = (path) => {
  const isWin = process.platform === 'win32';
  return isWin ? path.replace(/\\/g, '\\\\') : path;
};
