import * as execa from 'execa';
import * as fs from 'fs-extra';
import * as detectPort from 'detect-port';
import * as path from 'path';
import * as iconv from 'iconv-lite';
import * as iconvJschardet from 'iconv-jschardet';
import * as terminate from 'terminate';
import * as os from 'os';
import chalk from 'chalk';
import * as pathKey from 'path-key';
import { getCLIConf, setCLIConf, mergeCLIConf } from '../../utils/cliConf';
import getNpmClient from '../../../getNpmClient';
import {
  ITaskModule,
  ITaskParam,
  IProject,
  IContext,
  ITaskConf,
} from '../../../../interface';
import getTaskConfig from './getTaskConfig';

const DEFAULT_PORT = '4444';
const TASK_STATUS_WORKING = 'working';
const TASK_STATUS_STOP = 'stop';

export default class Task implements ITaskModule {
  public project: IProject;

  public storage: any;

  private status: object = {};

  private installed: boolean = true;

  public readonly cliConfPath: string;

  private process: object = {};

  public cliConfFilename = 'ice.config.js';

  public getTaskConfig: (ctx: IContext) => ITaskConf = getTaskConfig;

  constructor(params: { project: IProject; storage: any }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  /**
   * run start task
   * @param args
   */
  public async start(args: ITaskParam, ctx: IContext) {
    const { i18n, logger } = ctx;
    const projectEnv = this.project.getEnv();

    const nodeModulesPath = path.join(this.project.path, 'node_modules');
    const pathExists = await fs.pathExists(nodeModulesPath);
    if (!pathExists) {
      this.installed = false;
      return this;
    }

    this.installed = true;

    const { command } = args;
    if (this.process[command]) {
      throw new Error(i18n.format('baseAdapter.task.runing'));
    }

    let env: object = {};
    if (command === 'dev') {
      env = { PORT: await detectPort(DEFAULT_PORT) };
    }
    const [npmClient] = await getNpmClient();
    const eventName = `start.data.${command}`;

    try {
      const isWindows = os.type() === 'Windows_NT';
      const findCommand = isWindows ? 'where' : 'which';
      const { stdout: nodePath } = await execa(findCommand, ['node'], {
        env: projectEnv,
      });
      const { stdout: npmPath } = await execa(findCommand, [npmClient], {
        env: projectEnv,
      });
      ctx.socket.emit(`adapter.task.${eventName}`, {
        status: this.status[command],
        chunk: `using node: ${nodePath}\nusing npm ${npmClient}: ${npmPath}\nprocess.env.PATH: ${projectEnv[pathKey()]}\n`,
      });
    } catch (error) {
      // ignore error
    }

    this.process[command] = execa(
      npmClient,
      ['run', command === 'dev' ? 'start' : command],
      {
        cwd: this.project.path || process.cwd(),
        stdio: ['inherit', 'pipe', 'pipe'],
        env: Object.assign({}, projectEnv, env),
      },
    );

    this.process[command].stdout.on('data', buffer => {
      this.status[command] = TASK_STATUS_WORKING;
      ctx.socket.emit(`adapter.task.${eventName}`, {
        status: this.status[command],
        isStdout: true,
        chunk: buffer.toString(),
      });
    });

    this.process[command].stderr.on('data', buffer => {
      this.status[command] = TASK_STATUS_WORKING;

      const encodingType = iconvJschardet.detect(buffer);
      const chunk: string = encodingType.encoding === 'GB2312' ? iconv.decode(buffer, 'gbk') : buffer.toString();
      ctx.socket.emit(`adapter.task.${eventName}`, {
        status: this.status[command],
        isStdout: false,
        chunk,
      });
    });

    this.process[command].on('close', () => {
      this.process[command] = null;
      this.status[command] = TASK_STATUS_STOP;
      ctx.socket.emit(`adapter.task.${eventName}`, {
        status: this.status[command],
        isStdout: true,
        chunk: chalk.grey('Task has stopped'),
      });
    });

    this.process[command].on('error', error => {
      // emit adapter.task.error to show message
      const errMsg: string = error.toString();
      logger.error(errMsg);
      ctx.socket.emit('adapter.task.error', {
        message: errMsg,
        isStdout: true,
      });
    });

    return this;
  }

  /**
   * run stop task
   * @param args
   */
  public async stop(args: ITaskParam, ctx: IContext) {
    const { command } = args;
    const eventName = `stop.data.${command}`;
    // check process if it is been closed
    if (this.process[command]) {
      const { pid } = this.process[command];
      terminate(pid, err => {
        if (err) {
          const errMsg = err.toString();
          ctx.logger.error(errMsg);
          ctx.socket.emit('adapter.task.error', {
            message: errMsg,
          });
        }

        this.status[command] = TASK_STATUS_STOP;
        this.process[command] = null;

        ctx.socket.emit(`adapter.task.${eventName}`, {
          status: this.status[command],
          isStdout: true,
          chunk: chalk.grey('Task has stopped'),
        });
      });
    }

    return this;
  }

  public getStatus(args: ITaskParam) {
    const { command } = args;
    if (command) {
      return this.status[command];
    }
  }

  /**
   * get the conf of the current task
   * @param args
   */
  public async getConf(args: ITaskParam, ctx: IContext) {
    const taskConfig = this.getTaskConfig(ctx);
    switch (args.command) {
      case 'dev':
        return this.getDevConf(taskConfig);
      case 'build':
        return getCLIConf(this.cliConfPath, taskConfig.build);
      case 'lint':
        // @TODO support lint configuration
        return null;
      default:
        return [];
    }
  }

  /**
   * set the conf of the current task
   * @param args
   */
  public async setConf(args: ITaskParam) {
    switch (args.command) {
      case 'dev':
        return this.setDevConf(args);
      case 'build':
        return setCLIConf(this.cliConfPath, args.options);
      default:
        return false;
    }
  }

  /**
   * get dev configuration
   * merge the user configuration to return to the new configuration
   * @param projectPath
   */
  private getDevConf(taskConfig: ITaskConf) {
    const pkgContent = this.project.getPackageJSON();
    const devScriptContent = pkgContent.scripts.start;
    const devScriptArray = devScriptContent.split(' ');
    const userConf = {};
    devScriptArray.forEach(item => {
      if (item.indexOf('--') !== -1) {
        const key = item.match(/--(\S*)=/)[1];
        const value = item.match(/=(\S*)$/)[1];
        userConf[key] = value;
      }
    });

    return mergeCLIConf(taskConfig.dev, userConf);
  }

  /**
   * set dev configuration
   * @param args
   */
  private setDevConf(args: ITaskParam) {
    const pkgContent = this.project.getPackageJSON();
    const devScriptContent = pkgContent.scripts.start;
    const devScriptArray = devScriptContent.split(' ');
    const cli = devScriptArray[0];
    const command = devScriptArray[1];
    let newDevScriptContent = `${cli} ${command}`;
    Object.keys(args.options).forEach(key => {
      if (args.options[key]) {
        newDevScriptContent += ` --${key}=${args.options[key]}`;
      }
    });

    pkgContent.scripts.start = newDevScriptContent;

    this.project.setPackageJSON(pkgContent);
  }
}
