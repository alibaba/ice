import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import * as uid from 'uid';

import formatCodeFromAST from '../formatCodeFromAST';
import { IMenu, IProject, IMenuModule, IMenuOptions } from '../../../interface';

const MENU_CONFIG_VARIABLE = 'asideMenuConfig'; 

export default class Menu implements IMenuModule {
  public readonly title: string = '菜单管理';
  public readonly description: string = '展示项目中的所有菜单，支持对菜单的增删改。';
  public readonly cover: string = 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png';
  public readonly projectPath: string;
  public readonly project: IProject;
  public readonly storage: any;

  public readonly path: string;

  constructor(params: {project: IProject; storage: any;}) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.path = path.join(this.project.path, 'src', 'menuConfig.js');
  }

  private getFileAST(): any {
    const menuFileString = fs.readFileSync(this.path).toString();
    const menuFileAST = parser.parse(menuFileString, {
      sourceType: 'module',
    });

    return menuFileAST;
  }

  async getAll(): Promise<{ asideMenuConfig: IMenu[] }> {
    let asideMenuConfig = [];
    const menuFileAST = this.getFileAST();

    traverse(menuFileAST, {
      VariableDeclarator({ node }) {
        if (
          t.isIdentifier(node.id, { name: MENU_CONFIG_VARIABLE })
          && t.isArrayExpression(node.init)
        ) {
          const { code } = generate(node.init);
          asideMenuConfig = eval(code);
        }
      }
    });
    return {
      asideMenuConfig: this.handlerData(asideMenuConfig),
    };
  }

  async bulkCreate(params: {data: IMenu[], options: IMenuOptions}): Promise<void> {
    let {
      data = [],
      options = {}
    } = params;
    const { replacement = false } = options;
    const { asideMenuConfig } = await this.getAll();
    const menuFileAST = this.getFileAST();

    if (!replacement) {
      data = data.concat(asideMenuConfig);
    }
    const dataAST = parser.parse(JSON.stringify(this.handlerData(data)), {
      sourceType: 'module',
    });
    const arrayAST = dataAST.program.body[0];
    traverse(menuFileAST, {
      VariableDeclarator({ node }) {
        if (
          t.isIdentifier(node.id, { name: MENU_CONFIG_VARIABLE })
          && t.isArrayExpression(node.init)
        ) {
          node.init = arrayAST;
        }
      }
    });

    fs.writeFileSync(
      this.path,
      formatCodeFromAST(menuFileAST)
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
