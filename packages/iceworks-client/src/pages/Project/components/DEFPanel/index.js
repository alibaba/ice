import React from 'react';
import { Button, Message } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import socket from '@src/socket';
import useSocket from '@hooks/useSocket';
import logger from '@utils/logger';
import stores from '@src/stores';
import Panel from '../Panel';
import projectStores from '../../stores';
import styles from './index.module.scss';

const DEFPanel = () => {
  const gitStore = projectStores.useStore('git');
  const userStore = stores.useStore('user');

  const { dataSource } = gitStore;
  const {
    isRepository,
    currentBranch,
    remoteUrl,
  } = dataSource;
  const { dataSource: user } = userStore;
  const { isLogin, workId } = user || {};

  async function onPush(target) {
    const lastCommit = await socket.emit('project.git.getLog', [currentBranch]);
    if (!lastCommit) {
      Message.show({
        align: 'tr tr',
        type: 'error',
        title: '发布失败',
        content: '请先提交 Git 发布',
      });
      return;
    }

    if (target === 'daily') {
      await gitStore.push();
    }

    await socket.emit('project.def.push', {
      target,
      commitId: lastCommit.latest.hash,
      branch: currentBranch,
      repository: remoteUrl,
      empId: workId,
    });
  }

  useSocket('project.def.push.data', (data) => {
    logger.info('project.def.push.data', data);
  });

  useSocket('project.def.push.exit', (code) => {
    if (code === 0) {
      Message.show({
        align: 'tr tr',
        type: 'success',
        title: '发布成功',
        content: '请查看日志',
      });
    } else {
      Message.error({
        align: 'tr tr',
        type: 'error',
        title: '发布失败',
        content: '请查看日志',
      });
    }
  });

  let mainElement = null;
  if (isLogin) {
    if (isRepository) {
      mainElement = (
        <div className={styles.main}>
          <div className={styles.tips}>
            DEF 发布要求分支名为： prefix/x.y.z，例如：daily/1.0.0
          </div>
          <Button.Group>
            <Button
              size="small"
              type="secondary"
              onClick={async () => {
                await onPush('daily');
              }}
            >
              日常发布
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={async () => {
                await onPush('pro');
              }}
            >
              正式发布
            </Button>
          </Button.Group>
        </div>
      );
    } else {
      mainElement = '该项目不是一个 Git 仓库，请在 Git 面板关联仓库后使用 DEF 发布功能。';
    }
  } else {
    mainElement = '请点击左侧面板进行登录后使用 DEF 发布功能。';
  }

  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.def.title" /></h3>}>
      <div className={styles.wrap}>
        {mainElement}
      </div>
    </Panel>
  );
};

export default DEFPanel;
