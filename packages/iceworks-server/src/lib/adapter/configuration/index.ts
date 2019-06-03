import * as EventEmitter from 'events';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as prettier from 'prettier';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { ICLIConf, IProject, IConfigurationModule, IConfParam } from '../../../interface';
import { CLI_CONF } from './const';

export default class Configuration extends EventEmitter implements IConfigurationModule {
  public project: IProject;

  constructor(project: IProject) {
    super();
    this.project = project;
  }

  async getCLIConf(): Promise<ICLIConf[]> {
    const confPath = getConfPath(this.project.path);
    const userConf = require(confPath);

    CLI_CONF.map((item) => {
      if (Object.keys(userConf).includes(item.name)) {
        if (item.componentName === "Switch") {
          item.componentProps.defaultChecked = JSON.parse(userConf[item.name]);
        } else {
          item.componentProps.placeholder = userConf[item.name].toString();
        }
        return item;
      }
    })

    return CLI_CONF;
  }

  async setCLIConf(args: IConfParam) {
    const confkeys = Object.keys(args.options);
    const confPath = getConfPath(this.project.path);
    const userConf = fs.readFileSync(confPath, 'utf8');
    const ast = parser.parse(userConf, { sourceType: 'module' });
    const visitor = {
      Identifier(path) {
        if (confkeys.includes(path.node.name)) {
          path.container.value.value = args.options[path.node.name];
        }
      },
    };

    traverse(ast, visitor);

    const newUserConf = generate(ast).code;
    const formatNewUserConf= prettier.format(newUserConf, {
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'all',
    });

    try {
      await fs.writeFile(confPath, formatNewUserConf);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

function getConfPath(projectPath: string) {
  return  path.join(projectPath, 'ice.config.js');
}
