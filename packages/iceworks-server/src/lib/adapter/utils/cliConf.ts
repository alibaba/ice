import * as fsExtra from 'fs-extra';
import * as _ from 'lodash';
import * as prettier from 'prettier';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

/**
 * merge default conf returns new conf
 * @param path the cli path, eg: ice.config.js
 * @param defaultConf
 */
function getCLIConf(path: string, defaultConf) {
  try {
    // Do not merge if there is no user specified config file
    if (path.length === 0) {
      return null;
    }
    const code = fsExtra.readFileSync(path, 'utf8');
    const ast = parser.parse(code, { sourceType: 'module' });

    const defaultConfKeys = defaultConf.map(item => item.name);

    const userConf = {};
    const visitor = {
      Identifier(path) {
        if (defaultConfKeys.includes(path.node.name)) {
          userConf[path.node.name] = path.container.value.value;
        }
      },
    };

    traverse(ast, visitor);

    return mergeCLIConf(defaultConf, userConf);
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * set new conf
 * @param path the cli path, eg: ice.config.js
 * @param conf the current conf
 */
function setCLIConf(path: string, conf: object) {
  const confKeys = Object.keys(conf);
  const useConfContent = fsExtra.readFileSync(path, 'utf8');
  const ast = parser.parse(useConfContent, { sourceType: 'module' });

  let flag = false;
  let properties = [];

  // find object properties via ast
  const visitor = {
    ObjectExpression({ node }) {
      if (!flag) {
        properties = node.properties;
        flag = true;
      }
    },
  };

  // traverse ast
  traverse(ast, visitor);

  // compare user conf and project conf
  // modify the object if the conf exist
  // add a new object if the conf does not exist
  confKeys.forEach(key => {
    const node = properties.find((property) => property.key.name === key);

    if (node) {
      node.value.value = conf[key];
    } else {
      // distinguish between string and boolean
      // eg: { hash: true,  entry: 'src/index' }
      const value = (typeof conf[key] === 'boolean') ? t.booleanLiteral(conf[key]) : t.stringLiteral(conf[key]);
      properties.push(t.objectProperty(t.identifier(key), value));
    }
  });

  // generate and write new conf
  const newUserConf = generate(ast).code;
  const formatNewUserConf = prettier.format(newUserConf, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'all',
  });

  fsExtra.writeFileSync(path, formatNewUserConf);
}

/**
 * merge default conf and user conf
 * @param defaultConf
 * @param userConf
 */
function mergeCLIConf(defaultConf: any, userConf: any) {
  return _.cloneDeepWith(defaultConf).map((item) => {
    if (Object.keys(userConf).includes(item.name)) {
      if (item.componentName === 'Switch') {
        item.componentProps.defaultChecked = JSON.parse(userConf[item.name]);
      } else {
        item.componentProps.placeholder = userConf[item.name].toString();
      }
    }
    return item;
  });
}

export {
  getCLIConf,
  setCLIConf,
  mergeCLIConf,
};
