import React from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import GitInit from './GitInit';
import stores from '../../stores';
import styles from './index.module.scss';

const GitPanel = () => {
  const gitStore = stores.useStore('git');
  const { dataSource } = gitStore;
  const { isRepository } = dataSource;

  async function onInit(remoteUrl) {
    await gitStore.init(remoteUrl);
    await gitStore.refresh();
  }

  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.git.title" /></h3>}>
      {
        isRepository ?
          <div className={styles.wrap}>
            是一个仓库
          </div> :
          <GitInit onOk={onInit} />
      }
    </Panel>
  );
};

export default GitPanel;
