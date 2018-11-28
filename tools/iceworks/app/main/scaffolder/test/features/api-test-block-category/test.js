const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const request = require('request');
const createIceApp = require('../../..');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

module.exports = async () => {
  // console.log('createIceApp', createIceApp);

  const categories = await createIceApp.getCategories();

  const cat = categories[0];
  const blocks = await createIceApp.getBlockList({
    category: cat.name,
  });
  blocks.should.to.be.an('array');
  blocks[0].should.to.be.an('object');
  blocks[0].id.should.to.be.a('number');
  blocks[0].npm.should.to.be.a('string');
  // console.log(blocks);
  rimraf.sync(tmpDirectory);
};
