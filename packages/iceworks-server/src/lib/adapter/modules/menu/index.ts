import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import * as uid from 'uid';

import formatCodeFromAST from '../../utils/formatCodeFromAST';
import { IMenu, IProject, IMenuModule, IMenuOptions } from '../../../../interface';

const ASIDE_CONFIG_VARIABLE = 'asideMenuConfig';
const HEADER_CONFIG_VARIABLE = 'headerMenuConfig';

export default class Menu implements IMenuModule {
  public readonly project: IProject;
  public readonly storage: any;
  public readonly path: string;
  public configFilePath = 'config/menu.js';

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.storage = storage;
    this.project = project;
    this.path = path.join(this.project.path, 'src', this.configFilePath);
  }

  private getFileAST(): any {
    const menuFileString = fs.readFileSync(this.path).toString();
    const menuFileAST = parser.parse(menuFileString, {
      sourceType: 'module',
    });

    return menuFileAST;
  }

  private getMenuCode(node: any, name: string): string {
    let code = '';
    if (
      t.isIdentifier(node.id, { name })
      && t.isArrayExpression(node.init)
    ) {
      code = generate(node.init).code;
    }

    return code;
  }

  async getAll(): Promise<{ asideMenuConfig: IMenu[], headerMenuConfig: IMenu[] }> {
    let asideMenuConfig = [];
    let headerMenuConfig = [];
    const menuFileAST = this.getFileAST();

    const getMenuCode = this.getMenuCode;
    traverse(menuFileAST, {
      VariableDeclarator({ node }) {
        const asideMenuCode = getMenuCode(node, ASIDE_CONFIG_VARIABLE);
        const headerMenuCode = getMenuCode(node, HEADER_CONFIG_VARIABLE);
        if (asideMenuCode) {
          asideMenuConfig = eval(asideMenuCode);
        }
        if (headerMenuCode) {
          headerMenuConfig = eval(headerMenuCode);
        }
      }
    });

    return {
      asideMenuConfig: this.handlerData(asideMenuConfig),
      headerMenuConfig: this.handlerData(headerMenuConfig),
    };
  }

  async bulkCreate(params: {data: IMenu[], options: IMenuOptions}): Promise<void> {
    let {
      data = [],
      options = {}
    } = params;
    const { replacement = false, type = 'aside' } = options;
    const { asideMenuConfig, headerMenuConfig } = await this.getAll();
    const menuFileAST = this.getFileAST();
    const name = type === 'aside' ? ASIDE_CONFIG_VARIABLE : HEADER_CONFIG_VARIABLE;

    if (!replacement) {
      if (type === 'aside') {
        data = data.concat(asideMenuConfig);
      } else {
        data = data.concat(headerMenuConfig);
      }
    }
    this.setData(data, menuFileAST, name);
  }

  async delete(params: {paths: string[]}) {
    const { paths } = params;
    const menuFileAST = this.getFileAST();
    const { asideMenuConfig, headerMenuConfig } = await this.getAll();

    this.setData(this.removeItemByPaths(asideMenuConfig, paths), menuFileAST, ASIDE_CONFIG_VARIABLE);
    this.setData(this.removeItemByPaths(headerMenuConfig, paths), menuFileAST, HEADER_CONFIG_VARIABLE);
  }

  removeItemByPaths(data: IMenu[], paths: string[]) {
    const removeIndex = [];
    data.forEach((item, index) => {
      if (paths.indexOf(item.path) > -1) {
        removeIndex.unshift(index);
      }
      if (item.children) {
        item.children = this.removeItemByPaths(item.children, paths);
      }
    });

    removeIndex.forEach((index) => {
      data.splice(index, 1);
    });

    return data;
  }

  private setData(data: IMenu[], menuAST: any, name: string)  {
    const dataAST = parser.parse(JSON.stringify(this.handlerData(data)), {
      sourceType: 'module',
    });
    const arrayAST = dataAST.program.body[0];
    traverse(menuAST, {
      VariableDeclarator({ node }) {
        if (
          t.isIdentifier(node.id, { name })
          && t.isArrayExpression(node.init)
        ) {
          node.init = arrayAST;
        }
      }
    });

    fs.writeFileSync(
      this.path,
      formatCodeFromAST(menuAST)
    );
  }

  /**
   * handler data eg. generate id
   */
  private handlerData(data: IMenu[]): IMenu[] {
    return data.map((item) => {
      if (Array.isArray(item.children)) {
        item.children = this.handlerData(item.children);
      }
      item.id = item.id || `Menu_${uid(5)}`;
      return item;
    });
  }
}
