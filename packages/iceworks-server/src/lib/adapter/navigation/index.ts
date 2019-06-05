import * as EventEmitter from 'events';
import * as path from 'path';
import * as fs from 'fs';
import * as parser from '@babel/parser';
import * as prettier from 'prettier';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

import { IProjectNavigation, IProject } from '../../../interface';

const MENU_CONFIG_VARIABLE = 'asideMenuConfig'; 

export default class Navigation extends EventEmitter {
  public readonly projectPath: string;

  public readonly path: string;

  constructor(project: IProject) {
    super();
    this.projectPath = project.path;
    this.path = path.join(this.projectPath, 'src', 'menuConfig.js');
  }

  async getAll(): Promise<{ asideMenuConfig: IProjectNavigation[] }> {
    let asideMenuConfig = [];
    const menuConfigPath = path.join(this.path);
    const menuFileString = fs.readFileSync(menuConfigPath).toString();
    const menuFileAST = parser.parse(menuFileString, {
      sourceType: 'module',
    });

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
      asideMenuConfig,
    };
  }

  async setData(config: {
    type: string,
    data: IProjectNavigation[],
  }): Promise<void> {
    const { data } = config;
    const menuConfigPath = path.join(this.path);
    const menuFileString = fs.readFileSync(menuConfigPath).toString();
    const menuFileAST = parser.parse(menuFileString, {
      sourceType: 'module',
    });
    const dataAST = parser.parse(JSON.stringify(data), {
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
      prettier.format(generate(menuFileAST, {
        retainLines: true,
      }).code, {
        singleQuote: true,
        trailingComma: 'es5',
      })
    );
  }
}
