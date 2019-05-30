import * as EventEmitter from 'events';
import * as execa from 'execa';
import * as detectPort from 'detect-port';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import chalk from 'chalk';
import * as ipc from './ipc';
import { DEV_CONF, BUILD_CONF, LINT_CONF } from './const';
import { ITaskModule, ITaskParam, IProject } from '../../../interface';

const writeFileAsync = util.promisify(fs.writeFile);

const DEFAULT_PORT = '4444';
const TASK_STATUS_WORKING = 'working';
const TASK_STATUS_STOP = 'stop';

export default class Task extends EventEmitter implements ITaskModule {
  public project: IProject;

  public status: string = '';

  private process: object = {};

  constructor(project: IProject) {
    super();
    this.project = project;
  }

  /**
   * run start task
   * @param args
   */
  async start(args: ITaskParam) {
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
      this.emit(eventName, {
        status: TASK_STATUS_WORKING,
        chunk: buffer.toString(),
      });
    });

    this.process[command].on('close', () => {
      if (command === 'build' || command === 'lint') {
        this.process[command] = null;
        this.emit(eventName, {
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
  async stop(args: ITaskParam) {
    const { command } = args;
    const eventName = `stop.data.${command}`;

    if (command === 'dev') {
      // close the server and stop ipc serving
      ipc.stop();
    }

    this.process[command].kill();
    this.process[command].on('exit', (code) => {
      if (code === 0) {
        this.emit(eventName, {
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
    const { command } = args;
    const projectPath = this.project.path;

    if (command === 'dev') {
      return getDevConf(projectPath);
    }

    if (command === 'build') {
      return BUILD_CONF;
    }

    if (command === 'lint') {
      return LINT_CONF;
    }
  }

  /**
   * set the conf of the current task
   * @param args
   */
  async setConf(args: ITaskParam) {
    const { command } = args;
    const projectPath = this.project.path;

    if (command === 'dev') {
      return setDevConf(projectPath, args);
    }
  }
}

/**
 * get dev configuration
 * @param projectPath
 */
function getDevConf(projectPath: string) {
  const pkgContent = getPkg(projectPath).content;
  const devScriptContent = pkgContent.scripts.start;
  const devScriptArray = devScriptContent.split(' ');
  // read the start command parameter from package.json
  const userDevConf = {};
  devScriptArray.forEach(item => {
    if (item.indexOf('--') !== -1) {
     const key = item.match(/--(\S*)=/)[1];
     const value = item.match(/=(\S*)$/)[1];
     userDevConf[key] = value
   }
 })

  // merge the default configuration to return to the new configuration
  return DEV_CONF.map((item) => {
    if (Object.keys(userDevConf).includes(item.name)) {
      if (item.componentName === "Switch") {
        item.componentProps.defaultChecked = JSON.parse(userDevConf[item.name])
      } else {
        item.componentProps.placeholder = userDevConf[item.name].toString()
      }
    }
    return item;
  })
}

/**
 * set dev configuration
 * @param args
 */
async function setDevConf(projectPath: string, args: ITaskParam) {
  const pkg = getPkg(projectPath);
  const devScriptContent = pkg.content.scripts.start;
  const devScriptArray = devScriptContent.split(' ');
  const cli = devScriptArray[0];
  const command = devScriptArray[1];

  let newDevScriptContent =  `${cli} ${command}`;
  Object.keys(args.options).forEach((key) => {
    newDevScriptContent = newDevScriptContent + ` --${key}=${args.options[key]}`
  });

  pkg.content.scripts.start = newDevScriptContent;

  try {
    await writeFileAsync(pkg.path, `${JSON.stringify(pkg.content, null, 2)}\n`, 'utf-8');
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

/**
 * get the package information of the current project
 * @param projectPath Current project path
 */
function getPkg(projectPath: string) {
  const pkgPath = path.join(projectPath, 'package.json')
  const pkgContent = require(pkgPath);
  return {
    path: pkgPath,
    content: pkgContent
  };
}
