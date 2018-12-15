module.exports = (files, data, done) => {
  Object.keys(files).forEach((filename) => {
    let newFilename = filename;

    if (/[_\.]/.test(filename)) {
      newFilename = filename.replace(/[_\.]_className__/, data.className);
    }
    if (/_gitignore/.test(filename)) {
      newFilename = filename.replace(/_gitignore/, '.gitignore');
    }
    if (/_package.json/.test(filename)) {
      newFilename = filename.replace(/_package.json/, 'package.json');
    }

    if (newFilename !== filename) {
      files[newFilename] = files[filename];
      delete files[filename];
    }
  });
  done();
};
