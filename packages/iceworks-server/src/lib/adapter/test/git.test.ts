import * as simpleGitPromise from 'simple-git/promise';
import * as path from 'path';
import * as util from 'util';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';
import { getProject, storage, tmpPath } from './common';
import Git from '../modules/git';
import { IGitAddAndCommitParams } from '../../../interface';

const { app, assert } = require('midway-mock/bootstrap');
const mkdirpAsync = util.promisify(mkdirp);
const writeFileAsync = util.promisify(fs.writeFile);
const fsExistsAsync = util.promisify(fs.exists);

const mockCommitMsg: IGitAddAndCommitParams = { message: 'feat: add package.json', files: ['package.json'] };

describe('Test adapter git module', () => {
  let ctx: any;

  let git: any;

  let gitTools: any;

  let remoteUrl: string;

  const bareRepoPath = path.join(__dirname, '/tmp.git');

  let gitPromise: any;

  before(async () => {
    const project = await getProject();
    git = new Git({ project, storage });

    gitTools = git.gitTools;

    ctx = app.mockContext({
      i18n: app.i18n,
      logger: app.logger,
    });

    // makes intialized repository bare
    await mkdirpAsync(bareRepoPath);
    gitPromise = simpleGitPromise(bareRepoPath);
    gitPromise.init(true);
    remoteUrl = bareRepoPath;
  });

  it('init git', async () => {
    await git.init({ remoteUrl });

    const remotes = await gitTools.getRemotes(true);
    assert(remotes.length !== 0);
    const originRemote = remotes[0];
    assert(originRemote.refs.push === remoteUrl);
    assert(originRemote.refs.fetch === remoteUrl);
  });

  it('set remote respository', async () => {
    await git.setRemote({ remoteUrl });

    const remotes = await gitTools.getRemotes(true);
    assert(remotes !== 0);
    const originRemote = remotes[0];
    assert(originRemote.refs.push === remoteUrl);
    assert(originRemote.refs.fetch === remoteUrl);
  });

  it('add and commit', async () => {
    await git.addAndCommit(mockCommitMsg);

    const log = await gitTools.log(['master']);
    const gitStatus = await gitTools.status();
    assert(log.latest.message === mockCommitMsg.message);
    assert(!gitStatus['not_added'].some((item: string) => item === mockCommitMsg.files[0]));
  });

  it('get status', async () => {
    const status = await git.getStatus(undefined, ctx);

    assert(status.remoteUrl, remoteUrl);
    assert(status.currentBranch, 'master');
    assert.deepStrictEqual(status.localBranches, ['master']);
  });

  it('push to origin', async () => {
    const params = { branch: 'master' };
    await git.push(params);

    // check if it was pushed to origin master successfully 
    gitPromise = simpleGitPromise(tmpPath);
    const status = await gitPromise.status();
    assert(status.tracking === 'origin/master');
  });

  it('pull from origin', async () => {
    // mock the second user to use the bare repository
    const tmpRepoPath = path.join(__dirname, "/tmpRepo");
    mkdirpAsync(tmpRepoPath);
    gitPromise = simpleGitPromise(tmpRepoPath);
    await gitPromise.init();
    await gitPromise.addRemote('origin', remoteUrl);
    await gitPromise.pull('origin', 'master');

    // add test.js to the remote
    writeFileAsync(path.join(tmpRepoPath, 'test.js'), '');
    await gitPromise.add(['test.js']);
    await gitPromise.commit('feat: add test.js');
    await gitPromise.push('origin', 'master', { '--set-upstream': null });

    const params = { branch: 'master' };
    await git.pull(params);
    const isFileExist = fsExistsAsync(path.join(tmpPath, '/test.js'));
    assert(isFileExist);
  });

  it('get log', async () => {
    const logs = await git.getLog(['master']);

    assert(logs.all.length === 2);
    assert(logs.all[1].message === mockCommitMsg.message);
    assert(logs.total === 2);
  });

  it('checkout local branch', async () => {
    const branch = { name: 'test' };
    await git.checkoutLocalBranch(branch);

    const gitStatus = await gitTools.status();
    assert(gitStatus.current === branch.name);
  });

  it('get all branches', async () => {
    const allBranches = await git.getBranches();
    assert.deepStrictEqual(allBranches, { localBranches: ['master', 'test'], originBranches: ["origin/master"] });
  });

  it('switch branch', async () => {
    const params = { checkoutBranch: 'master' };
    await git.switchBranch(params);

    const gitStatus = await gitTools.status();
    assert(gitStatus.current === params.checkoutBranch);
  });
});
