import * as EventEmitter from 'events';
import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import * as uid from 'uid';

import formatCodeFromAST from '../formatCodeFromAST';
import { IMenu, IProject, IMenuModule, IMenuOptions } from '../../../interface';

const ASIDE_CONFIG_VARIABLE = 'asideMenuConfig';
const HEADER_CONFIG_VARIABLE = 'headerMenuConfig';

export default class Menu extends EventEmitter implements IMenuModule {
  public readonly projectPath: string;
  public readonly project: IProject;

  public readonly path: string;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
    this.path = path.join(this.projectPath, 'src', 'menuConfig.js');
  }

  private getFileAST(): any {
    const menuFileString = fs.readFileSync(this.path).toString();
    const menuFileAST = parser.parse(menuFileString, {
      sourceType: 'module',
    });

    return menuFileAST;
  }

  private getMenuCode(node: any, name: string): string|undefined {
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
        const _asideMenuConfig = getMenuCode(node, ASIDE_CONFIG_VARIABLE);
        const _headerMenuConfig = getMenuCode(node, HEADER_CONFIG_VARIABLE);
        if (_asideMenuConfig) {
          asideMenuConfig = eval(_asideMenuConfig);
        }
        if (_headerMenuConfig) {
          headerMenuConfig = eval(_headerMenuConfig);
        }
      }
    });
    return {
      asideMenuConfig: this.handlerData(asideMenuConfig),
      headerMenuConfig: this.handlerData(headerMenuConfig),
    };
  }

  async bulkCreate(
    data: IMenu[],
    options: IMenuOptions = {}
  ): Promise<void> {
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
    const dataAST = parser.parse(JSON.stringify(this.handlerData(data)), {
      sourceType: 'module',
    });
    const arrayAST = dataAST.program.body[0];
    traverse(menuFileAST, {
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
