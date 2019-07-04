import { IProject, IGitModule, IGitBranchs, IGitGetLog, IGitGetStatus, IUnstagedFile, IGitSwitchBranchParams, IGitAddAndCommitParams } from '../../../../interface';
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

  private getUnstagedFiles(gitStatus): IUnstagedFile[] {
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

    let currentBranch = '';
    let localBranches = [];
    let originBranches = [];
    let remoteUrl = '';
    let unstageFiles = [];

    try {
      const gitStatus = await this.gitTools.status();
      const branchLocal = await this.getLocalBranches();
      currentBranch = gitStatus.current;
      localBranches = branchLocal.all;

      const branchOrigin = await this.getOriginBranches();
      originBranches = branchOrigin.all;

      const originRemotes = await this.gitTools.getRemotes(true);
      const originRemote = originRemotes[0];
      if (originRemote && originRemote.refs) {
        remoteUrl = originRemote.refs.push;
      }

      unstageFiles = this.getUnstagedFiles(gitStatus);
    } catch (err) {
      console.warn(err);
    }

    return {
      isRepository,
      remoteUrl,
      currentBranch,
      localBranches,
      originBranches,
      unstageFiles,
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
    const gitStatus = await this.gitTools.status();

    await this.gitTools.checkoutBranch(name, gitStatus.current);
  }

  public async switchBranch(params: IGitSwitchBranchParams): Promise<void> {
    const { checkoutBranch } = params;

    await this.gitTools.checkout(checkoutBranch);
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
    await this.gitTools.push('origin', branch, { '--set-upstream': null });
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
