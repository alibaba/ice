import { getProject, storage } from './common';
import Git from '../modules/git';
import { IGitAddAndCommitParams } from '../../../interface';

const { app, assert } = require('midway-mock/bootstrap');

const remoteUrl = 'https://github.com/luhc228/iceworks-server-test-templete.git';

const mockCommitMsg: IGitAddAndCommitParams = { message: 'feat: add package.json', files: ['package.json'] };

describe('Test adapter git module', () => {
  let ctx: any;

  let git: any;

  let gitTools: any;

  before(async () => {
    const project = await getProject();
    git = new Git({ project, storage });

    gitTools = git.gitTools;

    ctx = app.mockContext({
      i18n: app.i18n,
      logger: app.logger,
    });
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

  it('push to origin', () => {

  });

  it('get log', async () => {
    const logs = await git.getLog(['master']);

    assert(logs.all.length === 1);
    assert(logs.latest.message === mockCommitMsg.message);
    assert(logs.total === 1);
  });

  it('checkout local branch', async () => {
    const branch = { name: 'test' };
    await git.checkoutLocalBranch(branch);

    const gitStatus = await gitTools.status();
    assert(gitStatus.current === branch.name);
  });

  it('get all branches', async () => {
    const allBranches = await git.getBranches();
    assert.deepStrictEqual(allBranches, { localBranches: ['master', 'test'], originBranches: [] });
  });

  it('switch branch', async () => {
    const params = { checkoutBranch: 'master' };
    await git.switchBranch(params);

    const gitStatus = await gitTools.status();
    assert(gitStatus.current === params.checkoutBranch);
  });
});
