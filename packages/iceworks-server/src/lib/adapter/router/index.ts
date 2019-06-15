import * as EventEmitter from 'events';
import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import * as prettier from 'prettier';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

import { IRouter, IRouterModule, IProject } from '../../../interface';
const ROUTER_CONFIG_VARIABLE = 'routerConfig';
const LAYOUT_DIRECTORY = 'layouts';
const PAGE_DIRECTORY = 'pages';

const ROUTE_PROP_WHITELIST = ['component', 'path', 'exact', 'strict', 'sensitive', 'routes'];

export default class Router extends EventEmitter implements IRouterModule {
  public readonly project: IProject;
  public readonly projectPath: string;

  public readonly path: string;
  public existLazy: boolean;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
    this.path = path.join(this.projectPath, 'src', 'routerConfig.js');
  }

  async getAll(): Promise<IRouter[]> {
    let config = [];
    const configPath = path.join(this.path);
    const fileString = fs.readFileSync(configPath).toString();
    const fileAST = parser.parse(fileString, {
      allowImportExportEverywhere: true,
      sourceType: 'module',
      plugins: [
        'dynamicImport',
      ],
    });

    try {
      traverse(fileAST, {
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

  async create(data): Promise<void> {
    const routers = await this.getAll();
    const { parent } = data;

    if (parent) {
      const parentRouter = routers.find((item) => {
        if (item.routes && item.path === parent) {
          return true;
        }
        return false;
      });
      if (parentRouter) {
        delete data.parent;
        parentRouter.routes.push(data);
      }
    } else {
      delete data.parent;
      routers.push(data);
    }

    await this.setData(routers);
  }

  // set router config
  async setData(data: IRouter[]): Promise<void>  {
    const configPath = path.join(this.path);
    const fileString = fs.readFileSync(configPath).toString();
    const fileAST = parser.parse(fileString, {
      sourceType: 'module',
      plugins: [
        'dynamicImport',
      ],
    });

    const dataAST = parser.parse(JSON.stringify(this.sortData(data)), {
      sourceType: 'module',
      plugins: [
        'dynamicImport',
      ],
    });
    const arrayAST = dataAST.program.body[0];

    this.changeImportDeclarations(fileAST, data);

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
    traverse(fileAST, {
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
      prettier.format(generate(fileAST, {
        retainLines: true,
      }).code, {
        singleQuote: true,
        trailingComma: 'es5',
      })
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
  private changeImportDeclarations(fileAST, data) {
    const removeIndex = [];
    const importDeclarations = [];
    // const pageImportDeclarations = [];
    // const layoutImportDeclarations = [];
    this.existLazy = false;

    traverse(fileAST, {
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
      fileAST.program.body.splice(index, 1);
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

    const firstIndex = this.findFirstImportIndex(fileAST);
    fileAST.program.body.splice(firstIndex, 0, ...importCodeAST.program.body);
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
   * find first import index
   */
  private findFirstImportIndex(fileAST): number {
    let firstIndex = 0;
    fileAST.program.body.some((item, index) => {
      if (item.type === 'ImportDeclaration') {
        return true;
      }
      return false;
    });
    return firstIndex;
  }
}
