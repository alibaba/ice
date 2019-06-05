import * as fsExtra from 'fs-extra';
import * as clonedeepwith from 'lodash.clonedeepwith';
import * as prettier from 'prettier';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

/**
 * merge default conf returns new conf
 * @param path the cli path, eg: ice.config.js
 * @param defaultConf
 */
function getCLIConf(path: string, defaultConf) {
  const code = fsExtra.readFileSync(path, 'utf8');
  const ast = parser.parse(code, { sourceType: 'module' });

  const defaultConfKeys = [];
  defaultConf.forEach(item => defaultConfKeys.push(item.name));

  const userConf = {};
  const visitor = {
    Identifier(path) {
      if (defaultConfKeys.includes(path.node.name)) {
        userConf[path.node.name] = path.container.value.value;
      }
    }
  }

  traverse(ast, visitor);

  return mergeCLIConf(defaultConf, userConf);
}

/**
 * set new conf
 * @param path the cli path, eg: ice.config.js
 * @param conf the current conf
 */
function setCLIConf(path: string, conf: object, ) {
  const confKeys = Object.keys(conf);
  const confContent = fsExtra.readFileSync(path, 'utf8');
  const ast = parser.parse(confContent, { sourceType: 'module' });
  const visitor = {
    Identifier(path) {
      if(confKeys.includes(path.node.name)) {
        path.container.value.value = conf[path.node.name];
      }
    }
  }

  traverse(ast, visitor);

  const newCLIConf = generate(ast).code;
  const formatNewCLIConf = prettier.format(newCLIConf, {
    parser: 'babel',
    singleQuote: true,
    trailingComma: 'all',
  });

  fsExtra.writeFileSync(path, formatNewCLIConf);
}

/**
 * merge default conf and user conf
 * @param defaultConf
 * @param userConf
 */
function mergeCLIConf(defaultConf: any, userConf: any) {
  return clonedeepwith(defaultConf).map((item) => {
     if (Object.keys(userConf).includes(item.name)) {
       if (item.componentName === "Switch") {
         item.componentProps.defaultChecked = JSON.parse(userConf[item.name]);
       } else {
         item.componentProps.placeholder = userConf[item.name].toString();
       }
     }
     return item;
   })
 }

export {
  getCLIConf,
  setCLIConf,
  mergeCLIConf,
};
