module.exports = function formatPathForWin(filepath) {
  const isWin = process.platform === 'win32';
  return isWin ? filepath.replace(/\\/g, '\\\\') : filepath;
};
