import * as execa from 'execa';
import * as detectPort from 'detect-port';
import * as path from 'path';
import chalk from 'chalk';
import * as ipc from './ipc';
import { getCLIConf, setCLIConf, mergeCLIConf } from '../utils/cliConf';
import { DEV_CONF, BUILD_CONF, LINT_CONF } from './const';
import { ITaskModule, ITaskParam, IProject, IContext } from '../../../interface';

const DEFAULT_PORT = '4444';
const TASK_STATUS_WORKING = 'working';
const TASK_STATUS_STOP = 'stop';

export default class Task implements ITaskModule {
  public readonly title: string = '任务管理';
  public readonly description: string = '工程相关任务的执行。';
  public readonly cover: string = '';
  public project: IProject;
  public storage: any;

  public status: string;

  public readonly cliConfPath: string;

  private cliConfFilename: string = 'ice.config.js';

  private process: object = {};

  constructor(params: {project: IProject; storage: any;}) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.cliConfPath = path.join(this.project.path, this.cliConfFilename);
  }

  /**
   * run start task
   * @param args
   */
  async start(args: ITaskParam, ctx: IContext) {
    let { command } = args;

    if (this.process[command]) {
      throw new Error(
        'The task has started. Please stop the task before trying again.'
      );
    }

    let env: object = {};
    if (command === 'dev') {
      env = { PORT: await detectPort(DEFAULT_PORT) };

      // create an ipc channel
      ipc.start();
    }

    const eventName = `start.data.${command}`;
    this.process[command] = execa(
      'npm',
      ['run', command === 'dev' ? 'start' : command],
      {
        cwd: this.project.path || process.cwd(),
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true,
        env: Object.assign({}, process.env, env),
      }
    );

    this.process[command].stdout.on('data', (buffer) => {
      ctx.socket.emit(`adapter.task.${eventName}`, {
        status: TASK_STATUS_WORKING,
        chunk: buffer.toString(),
      });
    });

    this.process[command].on('close', () => {
      if (command === 'build' || command === 'lint') {
        this.process[command] = null;
        ctx.socket.emit(`adapter.task.${eventName}`, {
          status: TASK_STATUS_STOP,
          chunk: chalk.grey('Task has stopped'),
        });
      }
    });

    this.process[command].on('error', (buffer) => {
      throw new Error(buffer.toString());
    });

    return this;
  }

  /**
   * run stop task
   * @param args
   */
  async stop(args: ITaskParam, ctx: IContext) {
    const { command } = args;
    const eventName = `stop.data.${command}`;

    if (command === 'dev') {
      // close the server and stop ipc serving
      ipc.stop();
    }

    this.process[command].kill();
    this.process[command].on('exit', (code) => {
      if (code === 0) {
        ctx.socket.emit(`adapter.task.${eventName}`, {
          status: TASK_STATUS_STOP,
          chunk: chalk.grey('Task has stopped'),
        });
      }
    });

    this.process[command] = null;

    return this;
  }

  /**
   * get the conf of the current task
   * @param args
   */
  async getConf(args: ITaskParam) {
    switch (args.command) {
      case 'dev':
        return this.getDevConf()
      case 'build':
       return getCLIConf(this.cliConfPath, BUILD_CONF)
      case 'lint':
        return LINT_CONF
      default:
        return [];
    }
  }

  /**
   * set the conf of the current task
   * @param args
   */
  async setConf(args: ITaskParam) {
    switch (args.command) {
      case 'dev':
        return this.setDevConf(args);
      case 'build':
        return setCLIConf(this.cliConfPath, args.options)
      default:
        return false;
    }
  }

  /**
  * get dev configuration
  * merge the user configuration to return to the new configuration
  * @param projectPath
  */
  private getDevConf() {
   const pkgContent = this.project.getPackageJSON();
   const devScriptContent = pkgContent.scripts.start;
   const devScriptArray = devScriptContent.split(' ');
   const userConf = {};
   devScriptArray.forEach(item => {
     if (item.indexOf('--') !== -1) {
      const key = item.match(/--(\S*)=/)[1];
      const value = item.match(/=(\S*)$/)[1];
      userConf[key] = value
    }
  })

   return mergeCLIConf(DEV_CONF, userConf)
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

    let newDevScriptContent =  `${cli} ${command}`;
    Object.keys(args.options).forEach((key) => {
      newDevScriptContent = newDevScriptContent + ` --${key}=${args.options[key]}`
    });

    pkgContent.scripts.start = newDevScriptContent;

    this.project.setPackageJSON(pkgContent);
  }
}
