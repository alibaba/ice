import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import junk from 'junk';

jest.setTimeout(60000);

const cases = process.env.CASES
  ? process.env.CASES.split(',')
  : fs.readdirSync(path.join(__dirname, 'cases')).filter(junk.not);

describe('Webpack Integration Tests', () => {
  cases
    .filter((testCase) => {
      // return testCase.indexOf('timeout') > -1;
      return true;
    })
    .forEach((testCase) => {
      it(testCase, (done) => {
        let options = { entry: { test: './index.js' } };
        const testDirectory = path.join(__dirname, 'cases', testCase);
        const outputDirectory = path.join(__dirname, 'actual', testCase);
        const configFile = path.join(testDirectory, 'webpack.config.js');

        if (fs.existsSync(configFile)) {
          options = require(configFile);
        }
        options.context = testDirectory;

        if (!options.output) options.output = { filename: '[name].js' };
        if (!options.output.path) options.output.path = outputDirectory;
        if (process.env.CASES) {
          console.log(
            `\nwebpack.${testCase}.config.js ${JSON.stringify(
              options,
              null,
              2
            )}`
          );
        }

        webpack(options, (err, stats) => {
          done();
        });
      });
    });
});
