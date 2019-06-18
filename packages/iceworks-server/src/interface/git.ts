import { IBaseModule } from './base';

export interface IUnstagedFile {
  type: string;
  file: string;
}

export interface IGitBranchs {
  localBranches: string[];
  originBranches: string[];
}

export interface IGitGetStatus extends IGitBranchs {
  isRepository: string;
  remoteUrl: string;
  currentBranch: string;
  unstageFiles: IUnstagedFile[];
}

export interface IGitSwitchBranchParams {
  originBranch: string;
  checkoutBranch: string;
}

export interface IGitAddAndCommitParams {
  message: string;
  files: string[];
}

export interface IGitGetLog {
  latest: {
    hash: string;
  };
}

export interface IGitModule extends IBaseModule {
  getStatus(): Promise<IGitGetStatus>;
  init(remoteUrl: string): Promise<void>;
  setRemote(remoteUrl: string): Promise<void>;
  checkoutLocalBranch(name: string): Promise<void>;
  switchBranch(params: IGitSwitchBranchParams): Promise<void>;
  getBranches(): Promise<IGitBranchs>;
  pull(branch: string): Promise<void>;
  push(branch: string): Promise<void>;
  addAndCommit(params: IGitAddAndCommitParams): Promise<void>;
  getLog(branches: string[]): Promise<IGitGetLog>;
}
