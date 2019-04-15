const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

module.exports = async () => {
  // console.log('createIceApp', createIceApp);

  // const categories = await createIceApp.getCategories();
  // console.log(categories);
  rimraf.sync(tmpDirectory);
};
