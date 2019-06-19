import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

import formatCodeFromAST from '../formatCodeFromAST';
import { IRouter, IRouterModule, IProject, IRouterOptions } from '../../../interface';
const ROUTER_CONFIG_VARIABLE = 'routerConfig';
const LAYOUT_DIRECTORY = 'layouts';
const PAGE_DIRECTORY = 'pages';

const ROUTE_PROP_WHITELIST = ['component', 'path', 'exact', 'strict', 'sensitive', 'routes'];

export default class Router implements IRouterModule {
  public readonly project: IProject;
  public readonly storage: any;

  public readonly path: string;
  public existLazy: boolean;

  constructor(params: {project: IProject; storage: any;}) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'routerConfig.js');
  }

  private getRouterConfigAST(): any {
    const routerConfigString = fs.readFileSync(this.path).toString();
    const routerConfigAST = parser.parse(routerConfigString, {
      allowImportExportEverywhere: true,
      sourceType: 'module',
      plugins: [
        'dynamicImport',
      ],
    });

    return routerConfigAST;
  }

  async getAll(): Promise<IRouter[]> {
    let config = [];
    const routerConfigAST = this.getRouterConfigAST();

    try {
      traverse(routerConfigAST, {
        VariableDeclarator: ({ node }) => {
          if (
            t.isIdentifier(node.id, { name: ROUTER_CONFIG_VARIABLE })
            && t.isArrayExpression(node.init)
          ) {
            config = this.parseRoute(node.init.elements);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    return config;
  }

  parseRoute(elements) {
    const config = [];
    elements.forEach((element) => {
      // { path: '/home', component: Home, routes: [] }
      const { properties } = element;
      const item: any = {};
      properties.forEach((property) => {
        const { key, value } = property;
        const { name: keyName } = key;

        // component is react Component
        if (keyName === 'component') {
          item[keyName] = value.name;
        } else if (keyName === 'routes') {
          // routes is array
          item.routes = this.parseRoute(value.elements);
        } else if (ROUTE_PROP_WHITELIST.indexOf(keyName) > -1) {
          item[keyName] = value.value;
        }
      });
      if (Object.keys(item).length > 0) {
        config.push(item);
      }
    });

    return config;
  }

  // bulk create routers
  async bulkCreate(params: {data: IRouter[], options: IRouterOptions}): Promise<void>  {
    let {data, options = {}} = params;
    const { replacement = false, parent } = options;
    const routerConfigAST = this.getRouterConfigAST();
    const currentData = await this.getAll();

    if (!replacement) {
      if (parent) {
        const parentRouter = currentData.find((item) => {
          if (item.routes && item.path === parent) {
            return true;
          }
          return false;
        });
        if (parentRouter) {
          parentRouter.routes = parentRouter.routes.concat(data);
          data = currentData;
        }
      } else {
        data = currentData.concat(data);
      }
    }
    const dataAST = parser.parse(JSON.stringify(this.sortData(data)), {
      sourceType: 'module',
      plugins: [
        'dynamicImport',
      ],
    });
    const arrayAST = dataAST.program.body[0];

    this.changeImportDeclarations(routerConfigAST, data);

    /**
     * { path: '/a', component: 'Page' }
     *          transform to
     * { path: '/a', component: Page }
     */
    traverse(dataAST, {
      ObjectProperty({ node }) {
        if (['component'].indexOf(node.key.value) > -1) {
          node.value = t.identifier(node.value.value);
        }
      }
    });
    traverse(routerConfigAST, {
      VariableDeclarator({ node }) {
        if (
          t.isIdentifier(node.id, { name: ROUTER_CONFIG_VARIABLE })
          && t.isArrayExpression(node.init)
        ) {
          node.init = arrayAST;
        }
      },
    });

    fs.writeFileSync(
      this.path,
      formatCodeFromAST(routerConfigAST)
    );
  }

  /**
   * sort data
   * eg.
   *  [{path: '/'}, {path: '/project'}, {path: '/project/abc'}, {path: '/bbc'}]
   *  [{path: '/project/abc'}, {path: '/project'}, {path: '/bbc'}, {path: '/'}]
   */
  private sortData(data: IRouter[]): IRouter[] {
    return data.sort((a, b) => {
      if (a.routes) {
        a.routes = this.sortData(a.routes);
      }
      if (a.path.indexOf(b.path) === 0) {
        return -1;
      }
      if (b.path.indexOf(a.path) === 0) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * 1. constant if there is layout or component in the data and ImportDeclarations
   * 2. remove import if there is no layout or component in the data
   * 3. add import if there is no layout or component in the ImportDeclarations
   */
  private changeImportDeclarations(routerConfigAST, data) {
    const removeIndex = [];
    const importDeclarations = [];
    // const pageImportDeclarations = [];
    // const layoutImportDeclarations = [];
    this.existLazy = false;

    traverse(routerConfigAST, {
      ImportDeclaration: ({ node, key }) => {
        const { source } = node;
        const match = source.value.match(/^\.\/(layouts|pages)\//);

        if (match && match[1]) {
          const { specifiers } = node;
          const { name } = specifiers[0].local;
          importDeclarations.push({
            index: key,
            name,
            type: match[1],
          });
        }
      },

      VariableDeclaration: ({ node, key }) => {
        const code = generate(node.declarations[0]).code;
        const matchLazyReg = /(\w+)\s=\sReact\.lazy(.+)import\(['|"](\.\/(\w+)\/.+)['|"]\)/;
        const match = code.match(matchLazyReg);

        if (match && match.length > 4) {
          this.existLazy = true;
          importDeclarations.push({
            index: key,
            name: match[1],
            type: match[4],
          });
        }
      },
    });

    /**
     * remove import if there is no layout or component in the data 
     */
    importDeclarations.forEach((importItem) => {
      const { name, type, index } = importItem;
      let needRemove = false;

      // match layout or page
      if (type) {
        let findRouter = null;

        if (type === LAYOUT_DIRECTORY) {
          // layout only first layer
          findRouter = data.find(item => item.routes && item.component === name);
        } else if(type === PAGE_DIRECTORY) {
          findRouter = data.find(item => {
            let pageItem = null;

            if (!item.routes && item.component === name) {
              pageItem = item;
            }

            if (item.routes) {
              item.routes.forEach((route) => {
                if (route.component === name) {
                  pageItem = route;
                }
              });
            }

            return pageItem;
          });
        }
        if (!findRouter) {
          needRemove = true;
        }
      }

      if (needRemove) {
        removeIndex.unshift(index);
      }
    });

    removeIndex.forEach((index) => {
      routerConfigAST.program.body.splice(index, 1);
    });

    const existImport = this.existImport;
    function setNewComponent(type, component) {
      const componentExist = existImport(importDeclarations, component, type);

      if (!componentExist && !newImports.find(item => item.name === component)) {
        newImports.push({
          type,
          name: component,
        });
      }
    }

    // /**
    //  * add import if there is no layout or component in the ImportDeclarations 
    //  */
    const newImports = [];
    data.forEach(({ component, routes }) => {
      if (routes) {
        setNewComponent(LAYOUT_DIRECTORY, component);
        routes.forEach((route) => setNewComponent(PAGE_DIRECTORY, route.component));
      } else {
        setNewComponent(PAGE_DIRECTORY, component);
      }
    });

    /**
     * add import to ast
     *  eg.
     *     import Page1 from './pages/Page1';
     *            or
     *     const Profile = React.lazy(() => import('./pages/Profile'));
     */
    let code = '';
    newImports.forEach(({name, type}) => {
      if (this.existLazy) {
        code += `const ${name} = React.lazy(() => import('./${type}/${name}'));\n`;
      } else {
        code += `import ${name} from './${type}/${name}';\n`;
      }
    });

    const importCodeAST = parser.parse(code, {
      sourceType: 'module',
      plugins: [
        'dynamicImport',
      ],
    });

    const lastIndex = this.findLastImportIndex(routerConfigAST);
    routerConfigAST.program.body.splice(lastIndex, 0, ...importCodeAST.program.body);
  }

  /**
   * exist layout or page in the ImportDeclarations 
   */
  private existImport(list, name, type) {
    return list.some((item) => {
      if (name === item.name && type === item.type) {
        return true;
      }
      return false;
    });
  }

  /**
   * find last import index
   */
  private findLastImportIndex(routerConfigAST): number {
    let lastIndex = 0;
    routerConfigAST.program.body.forEach((item, index) => {
      if (item.type === 'ImportDeclaration') {
        if (this.existLazy) {
          lastIndex = index + 2;
        } else {
          lastIndex = index + 1;
        }
      }
    });
    return lastIndex;
  }
}
