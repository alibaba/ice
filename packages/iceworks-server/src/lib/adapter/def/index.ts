/** eslint camelcase:0 */

import Client from './client';
import { IProject, IDEFModule, IDEFPushParams, IContext } from '../../../interface';

const isDev = process.env.NODE_ENV === 'local';

// DEF Token for iceworks client
const token = isDev
  ? 'f87bf958ad0ecb310b86b1536746b5209799902b1f556850f1a29f26a2375f28'
  : '72d7d45ac4495e9fb0047a96579a9af886e5c869f8ae148b68957c543d49ada1';
const env = isDev ? 'daily' : 'prod';

export default class DEF implements IDEFModule {
  public readonly title: string = 'DEF 发布';
  public readonly description: string = '支持阿里内网 DEF 发布构建流程，发布到日常以及线上。';
  public readonly cover: string = 'https://img.alicdn.com/tfs/TB1qDkAXMFY.1VjSZFnXXcFHXXa-300-300.png';
  public project: IProject;
  public storage: any;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
  }

  async push(params: IDEFPushParams, ctx: IContext): Promise<void> {
    const { target, commitId, branch, repository, empId } = params;
    const client = new Client.Client();
    client.run({
      hideBuildMessage: true,
      client_token: token,
      client_emp_id: empId,
      target,
      repo: repository,
      branch,
      commit_id: commitId,
      env,
    });

    client.on('start', () => {
      ctx.socket.emit('adapter.def.push.start');
    });
    client.on('message', (message) => {
      ctx.socket.emit('adapter.def.push.data', `${message}\n\r`);
    });
    client.on('build_message', (message) => {
      ctx.socket.emit('adapter.def.push.data', message);
    });
    client.on('error', (error) => {
      ctx.socket.emit('adapter.def.push.data', `\r\n${error.message}`);
      ctx.socket.emit('adapter.def.push.exit', 1);
    });
    client.on('success', () => {
      ctx.socket.emit('adapter.def.push.exit', 0);
    });
  }
}
