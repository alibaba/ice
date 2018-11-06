const path = require('path');
const fs = require('fs');
const glob = require('glob');
const createDocParser = require('@alifd/doc-parser');
const extractor = require('@alifd/api-extractor');

const docParser = createDocParser();
const cwd = process.cwd();
const bizComponents = path.join(cwd, 'react-materials', 'components');
const build = path.join(cwd, 'build');

const syncBizComponents = () => {
  return new Promise((resolve) => {
    const isDone = {
      demo: false,
      readme: false,
    };

    const componentMap = {};

    // collect readme
    glob('*/README.md', { cwd: bizComponents }, (err, readmes) => {
      readmes.forEach((file) => {
        const componentName = /([^/]+)/.exec(file)[1];
        componentMap[componentName] = componentMap[componentName] || {};

        const readme = fs.readFileSync(path.join(bizComponents, file), 'utf-8');

        const parsedREADME = docParser.parse(readme);

        const propsSchema = safeRequire(
          path.join(bizComponents, componentName, 'propsSchema.json')
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
    glob('*/demo/*.md', { cwd: bizComponents }, (err, demos) => {
      demos.forEach((file) => {
        const componentName = /([^/]+)/.exec(file)[1];
        componentMap[componentName] = componentMap[componentName] || {};
        componentMap[componentName].demos =
          componentMap[componentName].demos || [];

        const content = fs.readFileSync(
          path.join(bizComponents, file),
          'utf-8'
        );

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
      console.log({ isAlldone });
      if (isAlldone) {
        const result = [];
        Object.keys(componentMap).forEach((name) => {
          result.push(componentMap[name]);
        });

        const jsonStringResult = `${JSON.stringify(result, null, 2)}\n`;

        fs.writeFileSync(
          path.join(build, 'biz-components.json'),
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

syncBizComponents()
  .then(() => {
    console.log('biz-components 数据源生成成功');
  })
  .catch(() => {
    console.log('biz-components 数据源生成失败');
  });
