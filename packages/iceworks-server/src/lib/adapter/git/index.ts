import * as EventEmitter from 'events';
import { IProject, IGitModule } from '../../../interface';
import * as gitPromie from 'simple-git/promise';

export default class Git extends EventEmitter implements IGitModule {
  public project: IProject;

  private gitTools: any;

  constructor(project: IProject) {
    super();
    this.project = project;
    this.gitTools = gitPromie(this.project.path);
  }

  public async getStatus() {
    const isRepository = await this.gitTools.checkIsRepo();
    const originRemotes = await this.gitTools.getRemotes(true);
    const originRemote = originRemotes[0];
    const remoteUrl = originRemote && originRemote.refs ? originRemote.refs.push : '';
    return { isRepository, remoteUrl };
  }

  public async init(remoteUrl: string) {
    await this.gitTools.init();
    await this.gitTools.addRemote('origin', remoteUrl);
  }

  public async setRemote(remoteUrl: string) {
    const originRemotes = await this.gitTools.getRemotes(true);
    if (originRemotes.length > 0) {
      await this.gitTools.removeRemote('origin');
    }
    await this.gitTools.addRemote('origin', remoteUrl);
  }
}
