module.exports = (outputPath) => {
  const isWin = process.platform === 'win32';
  // js\index.js => js/index.js
  return isWin ? outputPath.replace(/\\/g, '/') : outputPath;
};
