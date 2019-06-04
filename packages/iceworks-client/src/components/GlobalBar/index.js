import React, { useState } from 'react';
import { Message } from '@alifd/next';
import stores from '@stores';
import Icon from '@components/Icon';
import XtermTerminal from '@components/XtermTerminal';
import styles from './index.module.scss';

const GlobalBar = () => {
  const project = stores.useStore('project');
  const [terminalVisible, setTerminalVisible] = useState(false);
  const projectPath = project.dataSource.path;

  function handleTerminal() {
    setTerminalVisible(!terminalVisible);
  }

  async function handleFolder() {
    if (projectPath) {
      await project.openFolder(projectPath);
    } else {
      Message.show({
        type: 'error',
        align: 'tr tr',
        title: '提示',
        content: '打开文件夹失败',
      });
    }
  }

  async function handleEditor() {
    if (projectPath) {
      await project.openEditor(projectPath);
    } else {
      Message.show({
        type: 'error',
        align: 'tr tr',
        title: '提示',
        content: '打开编辑器失败',
      });
    }
  }

  return (
    <div className={styles.container}>
      {terminalVisible ? (
        <div className={styles.globalTerminal}>
          <XtermTerminal id="globalTerminal" name={project.dataSource.name} />
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
          <div className={styles.item} onClick={handleFolder}>
            <Icon type="folderopen" className={styles.icon} />
            文件夹
          </div>
          <div className={styles.item} onClick={handleEditor}>
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
