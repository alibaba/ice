module.exports = function() {
  return new Promise((resolve, reject) => {
    try {
      const sassInfo = require('node-sass').info;
      resolve(sassInfo);
    } catch (err) {
      reject(err);
    }
  });
};
