import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Message } from '@alifd/next';
import Icon from '@components/Icon';
import XtermTerminal from '@components/XtermTerminal';
import { ThemeContext } from '@components/ThemeProvider';
import socket from '@src/socket';
import { THEMES } from '@src/appConfig';
import styles from './index.module.scss';

const GlobalBar = ({ project }) => {
  const [terminalVisible, setTerminalVisible] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const projectPath = project.dataSource.path;

  function handleTerminal() {
    setTerminalVisible(!terminalVisible);
  }

  async function handleFolder() {
    try {
      await socket.emit('home.system.openFolder', { path: projectPath });
    } catch (error) {
      Message.show({
        type: 'error',
        align: 'tr tr',
        title: '提示',
        content: error.message,
      });
    }
  }

  async function handleEditor() {
    try {
      await socket.emit('home.system.openEditor', { path: projectPath });
    } catch (error) {
      Message.show({
        type: 'error',
        align: 'tr tr',
        title: '提示',
        content: error.message,
      });
    }
  }

  async function handleTheme() {
    const currentTheme = theme === THEMES.dark ? THEMES.light : THEMES.dark;
    await socket.emit('home.setting.setTheme', { theme: currentTheme });
    setTheme(currentTheme);
    // eslint-disable-next-line
    window.__changeTheme__(currentTheme);
  }

  return project.dataSource.name ? (
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
          <div className={styles.item} onClick={handleTheme}>
            <Icon type="zhuti" className={styles.icon} size="small" />
            主题
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

GlobalBar.propTypes = {
  project: PropTypes.object.isRequired,
};

export default GlobalBar;
