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
  public project: IProject;
  public storage: any;
 
  constructor(params: {project: IProject; storage: any;}) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
  }

  async push(params: IDEFPushParams, context: IContext): Promise<void> {
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
      context.socket.emit('project.def.push.start');
    });
    client.on('message', (message) => {
      context.socket.emit('project.def.push.data', `${message}\n\r`);
    });
    client.on('build_message', (message) => {
      context.socket.emit('project.def.push.data', message);
    });
    client.on('error', (error) => {
      context.socket.emit('project.def.push.data', `\r\n${error.message}`);
      context.socket.emit('project.def.push.exit', 1);
    });
    client.on('success', () => {
      context.socket.emit('project.def.push.exit', 0);
    });
  }
}
