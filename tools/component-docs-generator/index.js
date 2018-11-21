const path = require('path');
const fs = require('fs');
const glob = require('glob');
const createDocParser = require('@alifd/doc-parser');
const extractor = require('@alifd/api-extractor');

const docParser = createDocParser();

const docsGen = (sourceDir, destDir, outputFilename) => {
  if (!sourceDir) {
    throw new Error('must specify the sourceDir parameter');
  }

  if (!destDir) {
    destDir = destDir || process.cwd();
    outputFilename = outputFilename || 'biz-components.json';
  }

  return new Promise((resolve) => {
    const isDone = {
      demo: false,
      readme: false,
    };

    const componentMap = {};

    // collect readme
    glob('*/README.md', { cwd: sourceDir }, (err, readmes) => {
      readmes.forEach((file) => {
        const componentName = /([^/]+)/.exec(file)[1];
        componentMap[componentName] = componentMap[componentName] || {};

        const readme = fs.readFileSync(path.join(sourceDir, file), 'utf-8');

        const parsedREADME = docParser.parse(readme);

        const propsSchema = safeRequire(
          path.join(sourceDir, componentName, 'propsSchema.json')
        );

        const propsREADME = extractor.generatePropsMD(propsSchema.props);

        const methodREADME = (propsSchema.methods || []).map(
          extractor.generateMethodMD
        );

        const subComponentsREADME = (propsSchema.subComponents || []).map(
          (comp) => {
            return Object.assign(
              {},
              {
                name: comp.name,
                propsREADME: extractor.generatePropsMD(comp.props),
                methodREADME: (comp.methods || []).map(
                  extractor.generateMethodMD
                ),
              }
            );
          }
        );

        const packageName =
          parsedREADME.meta.npm || `@icedesign/${componentName}`;

        Object.assign(componentMap[componentName], {
          name: parsedREADME.title,
          category: 'BizComponent',
          title: parsedREADME.meta.chinese,
          type: parsedREADME.meta.type,
          npm: parsedREADME.meta.npm,
          importStatement: `import ${
            parsedREADME.title
          } from '${packageName}';`,
          body: parsedREADME.body.replace(/\#+ *API[\w\W]+/, ''), // 去掉 README 里面的 props 说明
          propsSchema,
          propsREADME,
          methodREADME,
          subComponentsREADME,
        });
      });
      done('readme');
    });

    // collect demo
    glob('*/demo/*.md', { cwd: sourceDir }, (err, demos) => {
      demos.forEach((file) => {
        const componentName = /([^/]+)/.exec(file)[1];
        componentMap[componentName] = componentMap[componentName] || {};
        componentMap[componentName].demos =
          componentMap[componentName].demos || [];

        const content = fs.readFileSync(path.join(sourceDir, file), 'utf-8');

        const parsedDEMO = docParser.parse(content);

        if (parsedDEMO.meta.hidden || parsedDEMO.meta.hide) {
          return;
        }

        componentMap[componentName].demos.push({
          title: parsedDEMO.title,
          order: parsedDEMO.meta.order,
          iframe: parsedDEMO.meta.iframe,
          jsx: parsedDEMO.codes.jsx || '',
          css: parsedDEMO.codes.css || '',
          body: parsedDEMO.body.replace(/\`{4}[\w\W]+/, ''),
        });
      });
      done('demo');
    });

    function done(type) {
      isDone[type] = true;

      const isAlldone = Object.values(isDone).every((t) => t === true);
      if (isAlldone) {
        const result = [];
        Object.keys(componentMap).forEach((name) => {
          result.push(componentMap[name]);
        });

        const jsonStringResult = `${JSON.stringify(result, null, 2)}\n`;

        fs.writeFileSync(
          path.join(destDir, outputFilename),
          jsonStringResult
            .replace(/@alife\/next/g, '@icedesign/base')
            .replace(/@(ali)\/([^'"]+)/g, ($1, $2, $3) => {
              return `@icedesign/${$3.replace('ice-', '')}`;
            }),
          'utf-8'
        );
        resolve();
      }
    }
  });
};

function safeRequire(mod) {
  try {
    return require(mod);
  } catch (err) {
    return {};
  }
}

module.exports = docsGen;
