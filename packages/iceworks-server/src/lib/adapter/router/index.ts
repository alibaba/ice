import * as EventEmitter from 'events';
import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import * as prettier from 'prettier';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

import { IRouter, IProject } from '../../../interface';
const ROUTER_CONFIG_VARIABLE = 'routerConfig';
const LAYOUT_DIRECTORY = 'layouts';
const PAGE_DIRECTORY = 'pages';

const ROUTE_PROP_WHITELIST = ['component', 'path', 'exact', 'strict', 'sensitive', 'routes'];

export default class Router extends EventEmitter {
  public readonly projectPath: string;

  public readonly path: string;

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
      sourceType: 'module',
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

  // set router config
  async setData(data: IRouter[]): Promise<void>  {
    const configPath = path.join(this.path);
    const fileString = fs.readFileSync(configPath).toString();
    const fileAST = parser.parse(fileString, {
      sourceType: 'module',
    });

    const dataAST = parser.parse(JSON.stringify(this.sortData(data)), {
      sourceType: 'module',
    });
    const arrayAST = dataAST.program.body[0];

    this.changeImportDeclarations(fileAST, data);

    /**
     * { path: '/a', component: 'Page', layout: 'Layout' }
     *          transform to
     * { path: '/a', component: Page, layout: Layout } 
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
    const pageImportDeclarations = [];
    const layoutImportDeclarations = [];

    /**
     * remove import if there is no layout or component in the data 
     */
    fileAST.program.body.forEach((item, index) => {
      if (item.type === 'ImportDeclaration') {
        const matchType = item.source.value.match(/^\.\/(layouts|pages)\//);
        if (matchType) {
          const { specifiers } = item;
          const { name } = specifiers[0].local;
          let needRemove = false;
          const type = matchType[1];

          // match layout or page
          if (type) {
            if (type === LAYOUT_DIRECTORY) {
              layoutImportDeclarations.push(item);
            } else {
              pageImportDeclarations.push(item);
            }
            let findRouter = null;

            if (type === LAYOUT_DIRECTORY) {
              // layout only first layer
              findRouter = data.find(item => item.routes && item.component === name);
            } else {
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
        }
      }
    });
    removeIndex.forEach((index) => {
      fileAST.program.body.splice(index, 1);
    });

    const existImport = this.existImport;
    function setNewComponent(type, component) {
      let componentExist;
      const isLayout = type === 'layout';

      if (isLayout) {
        componentExist = existImport(layoutImportDeclarations, component);
      } else {
        componentExist = existImport(pageImportDeclarations, component);
      }

      if (!componentExist && isLayout && newLayouts.indexOf(component) > -1) {
        newLayouts.push(component);
      }

      if (!componentExist && !isLayout && newPages.indexOf(component) === -1) {
        newPages.push(component);
      }
    }

    /**
     * add import if there is no layout or component in the ImportDeclarations 
     */
    const newPages = [];
    const newLayouts = [];
    data.forEach(({ component, routes }) => {
      if (routes) {
        setNewComponent('layout', component);
        routes.forEach((route) => setNewComponent('page', route.component));
      } else {
        setNewComponent('page', component);
      }
    });

    this.addImportDeclaration(PAGE_DIRECTORY, newPages, fileAST);
    this.addImportDeclaration(LAYOUT_DIRECTORY, newLayouts, fileAST);
  }

  /**
   * add import to ast
   *  eg.
   *     import Page1 from './pages/Page1';
   */
  private addImportDeclaration(type, newList, fileAST): void {
    newList.forEach(name => {
      const importDeclaration = t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier(name))],
        t.stringLiteral(`./${type}/${name}`)
      );
      const fitstIndex = this.findFirstImportIndex(type, fileAST);
      fileAST.program.body.splice(fitstIndex, 0, importDeclaration);
    });
  }

  /**
   * exist layout or page in the ImportDeclarations 
   */
  private existImport(list, type) {
    return list.some((item) => {
      const { specifiers } = item;
      const { name } = specifiers[0].local;

      if (name === type) {
        return true;
      }
      return false;
    });
  }

  /**
   * find last page or layout import index in ast
   *  eg.
   *    import Layout1 from './layouts/Layout1';
   *    import Page1 from './pages/Page1';
   *    import Page2 from './pages/Page2';
   * 
   *    findFirstImportIndex('pages') => 1
   */
  private findFirstImportIndex(type, fileAST): number {
    let firstIndex = -1;
    fileAST.program.body.some((item, index) => {
      if (item.type === 'ImportDeclaration') {
        const match = item.source.value.indexOf(`./${type}/`) === 0;
        if (match) {
          firstIndex = index;
          return true;
        }
      }
      return false;
    });
    return firstIndex;
  }
}
