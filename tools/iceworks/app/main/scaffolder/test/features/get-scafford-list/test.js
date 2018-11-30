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
  const scaffords = await createIceApp.getScaffordingList();

  scaffords.should.be.an('array');
  scaffords[0].name.should.be.a('string');
  scaffords[0].npm.should.be.a('string');
  scaffords[0].version.should.be.a('string');
  scaffords[0].description.should.be.a('string');
  scaffords[0].snapshot.should.be.a('string');
  rimraf.sync(tmpDirectory);
};
