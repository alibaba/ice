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
  categories.should.to.be.an('array');
  categories[0].should.to.be.an('object');
  categories[0].id.should.to.be.a('number');
  categories[0].name.should.to.be.a('string');
  rimraf.sync(tmpDirectory);
};
