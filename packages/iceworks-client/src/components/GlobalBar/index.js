import React, { useState } from 'react';
import stores from '@stores';
import Icon from '@components/Icon';
import XtermTerminal from '@components/XtermTerminal';
import styles from './index.module.scss';

const GlobalBar = () => {
  const project = stores.useStore('project');
  const [terminalVisible, setTerminalVisible] = useState(false);

  function handleTerminal() {
    setTerminalVisible(!terminalVisible);
  }

  return (
    <div className={styles.container}>
      {terminalVisible ? (
        <div className={styles.globalTerminal}>
          <XtermTerminal name={project.dataSource.name} id="globalTerminal" />
        </div>
      ) : null}

      <div className={styles.globalBar}>
        <div className={styles.leftContent}>
          <div className={styles.item}>
            当前项目名称：{project.dataSource.name}
          </div>
          <div className={styles.item} onClick={handleTerminal}>
            <Icon type="pc" className={styles.icon} />
            终端
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.item}>
            <Icon type="folderopen" className={styles.icon} />
            文件夹
          </div>
          <div className={styles.item}>
            <Icon type="code" className={styles.icon} />
            编辑器
          </div>
          <div className={styles.item}>
            <Icon type="zhuti" className={styles.icon} size="small" />
            主题
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalBar;
