import * as EventEmitter from 'events';
import * as execa from 'execa';
import * as detectPort from 'detect-port';
import chalk from 'chalk';
import * as ipc from './ipc';
import { DEV_CONF, BUILD_CONF, LINT_CONF } from './const';
import { ITaskModule, ITaskParam, IProject } from '../../../interface';

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
  async getSetting(args) {
    const { command } = args;

    if (command === 'dev') {
      return DEV_CONF;
    }

    if (command === 'build') {
      return BUILD_CONF;
    }

    if (command === 'lint') {
      return LINT_CONF;
    }
  }
}
