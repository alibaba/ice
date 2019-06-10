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

  private async getOriginBranches() {
    return await this.gitTools.branch(['--remotes', '--list', '-v']);
  }

  private async getLocalBranches() {
    return await this.gitTools.branchLocal();
  }

  public async getStatus() {
    const isRepository = await this.gitTools.checkIsRepo();
    const localBranches = await this.getLocalBranches();
    const originBranches = await this.getOriginBranches();

    const originRemotes = await this.gitTools.getRemotes(true);
    const originRemote = originRemotes[0];
    const remoteUrl = originRemote && originRemote.refs ? originRemote.refs.push : '';

    return { 
      isRepository,
      remoteUrl,
      currentBranch: localBranches.current,
      localBranches: localBranches.all,
      originBranches: originBranches.all,
    };
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

  public async checkoutLocalBranch(name: string) {
    await this.gitTools.checkoutLocalBranch(name);
  }

  public async switchBranch(data: {originBranch: string; checkoutBranch: string;}) {
    const { originBranch, checkoutBranch } = data;

    await this.gitTools.checkoutBranch(checkoutBranch, originBranch);
  }

  public async getBranches() {
    await this.gitTools.fetch();
    const originBranches = await this.gitTools.branch(['--remotes', '--list', '-v']);
    const localBranches = await this.gitTools.branchLocal();
    return {
      localBranches: localBranches.all,
      originBranches: originBranches.all
    };
  }

  public async pull(branch: string) {
    await this.gitTools.pull('origin', branch);
  }

  public async push(branch: string) {
    await this.gitTools.push('origin', branch);
  }
}
