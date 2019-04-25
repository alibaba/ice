const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const createIceApp = require('../../..');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

module.exports = async () => {
  const categories = await createIceApp.getCategories();

  const cat = categories[0];
  const blocks = await createIceApp.getBlockList({
    category: cat.name,
  });
  blocks.should.to.be.an('array');
  blocks[0].should.to.be.an('object');
  blocks[0].id.should.to.be.a('number');
  blocks[0].npm.should.to.be.a('string');
  rimraf.sync(tmpDirectory);
};
