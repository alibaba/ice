import { IProject, IGitModule, IGitBranchs, IGitGetLog, IGitGetStatus, IUnstagedFile, IGitSwitchBranchParams, IGitAddAndCommitParams } from '../../../interface';
import * as gitPromie from 'simple-git/promise';

export default class Git implements IGitModule {
  public readonly project: IProject;
  public storage: any;

  private gitTools: any;

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
    this.gitTools = gitPromie(this.project.path);
  }

  private async getOriginBranches(): Promise<{all: string[]}> {
    return await this.gitTools.branch(['--remotes', '--list', '-v']);
  }

  private async getLocalBranches(): Promise<{current: string; all: string[]}> {
    return await this.gitTools.branchLocal();
  }

  private async getUnstagedFiles(): Promise<IUnstagedFile[]> {
    const gitStatus = await this.gitTools.status();
    const types = ['conflicted', 'not_added', 'modified', 'created', 'deleted', 'renamed'];
    let unstageFiles = [];
    if (gitStatus && gitStatus.files && gitStatus.files.length > 0) {
      types.forEach((type) => {
        const statusFiles = gitStatus[type];
        if (statusFiles) {
          unstageFiles = unstageFiles.concat(statusFiles.map((file) => ({
            type,
            file,
          })));
        }
      });
    }
    return unstageFiles;
  }

  public async getStatus(): Promise<IGitGetStatus> {
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
      unstageFiles: await this.getUnstagedFiles(),
    };
  }

  public async init(params: {remoteUrl: string}): Promise<void> {
    const {remoteUrl} = params;
    await this.gitTools.init();
    await this.gitTools.addRemote('origin', remoteUrl);
  }

  public async setRemote(params: {remoteUrl: string}): Promise<void> {
    const {remoteUrl} = params;
    const originRemotes = await this.gitTools.getRemotes(true);
    if (originRemotes.length > 0) {
      await this.gitTools.removeRemote('origin');
    }
    await this.gitTools.addRemote('origin', remoteUrl);
  }

  public async checkoutLocalBranch(params: {name: string}): Promise<void> {
    const {name} = params;
    await this.gitTools.checkoutLocalBranch(name);
  }

  public async switchBranch(params: IGitSwitchBranchParams): Promise<void> {
    const { originBranch, checkoutBranch } = params;

    await this.gitTools.checkoutBranch(checkoutBranch, originBranch);
  }

  public async getBranches(): Promise<IGitBranchs> {
    await this.gitTools.fetch();
    const originBranches = await this.gitTools.branch(['--remotes', '--list', '-v']);
    const localBranches = await this.gitTools.branchLocal();
    return {
      localBranches: localBranches.all,
      originBranches: originBranches.all
    };
  }

  public async pull(params: {branch: string}): Promise<void> {
    const {branch} = params;
    await this.gitTools.pull('origin', branch);
  }

  public async push(params: {branch: string}): Promise<void> {
    const {branch} = params;
    await this.gitTools.push('origin', branch);
  }

  public async addAndCommit(params: IGitAddAndCommitParams): Promise<void> {
    const {message, files} = params;
    await this.gitTools.add(files);
    await this.gitTools.commit(message);
  }

  public async getLog(branches: string[]): Promise<IGitGetLog> {
    return await this.gitTools.log(branches);
  }
}
