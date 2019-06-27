import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Message, Balloon } from '@alifd/next';
import { FormattedMessage, injectIntl } from 'react-intl';
import Icon from '@components/Icon';
import XtermTerminal from '@components/XtermTerminal';
import { ThemeContext } from '@components/ThemeProvider';
import socket from '@src/socket';
import useSocket from '@hooks/useSocket';
import { THEMES } from '@src/appConfig';
import styles from './index.module.scss';

const GlobalBar = ({ project, intl }) => {
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
  }

  useSocket('home.system.open.editor.data', (data) => {
    if (data) {
      Message.show({
        type: 'error',
        align: 'tr tr',
        title: '提示',
        content: '打开编辑器失败',
      });
    }
  });

  const hiddenClassName = terminalVisible ? '' : styles.hidden;

  return project.dataSource.name ? (
    <div className={styles.container}>
      <div className={`${styles.globalTerminal} ${hiddenClassName}`}>
        <XtermTerminal id="globalTerminal" name={intl.formatMessage({ id: 'iceowrks.global.bar.log' })} />
      </div>

      <div className={styles.globalBar}>
        <div className={styles.leftContent}>
          <div className={styles.item}>
            <FormattedMessage id="iceowrks.global.bar.project" />：
            <span className={styles.projectName}>{project.dataSource.name}</span>
          </div>
          <div className={styles.item} onClick={handleTerminal}>
            <Icon type="pc" className={styles.icon} />
            <FormattedMessage id="iceowrks.global.bar.log" />
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.item} onClick={handleFolder}>
            <Icon type="folderopen" className={styles.icon} />
            <FormattedMessage id="iceowrks.global.bar.folder" />
          </div>
          <div className={styles.item} onClick={handleEditor}>
            <Icon type="code" className={styles.icon} />
            <FormattedMessage id="iceowrks.global.bar.editor" />
          </div>
          <div className={styles.item} onClick={handleTheme}>
            <Icon type="zhuti" className={styles.icon} size="small" />
            <FormattedMessage id="iceowrks.global.bar.theme" />
          </div>
          <Balloon
            align="tl"
            closable={false}
            trigger={
              <div className={styles.item}>
                <Icon type="face" className={styles.icon} size="small" />
                <FormattedMessage id="iceowrks.global.bar.feedback" />
              </div>
            }
            triggerType="click"
          >
            <div className={styles.feedback}>
              <h4 style={{ margin: '0 0 10px' }}>
                <FormattedMessage id="iceowrks.global.bar.feedback.title" />
              </h4>
              <div className={styles.links}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://img.alicdn.com/tfs/TB1q_oaQgTqK1RjSZPhXXXfOFXa-993-1280.png"
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  <FormattedMessage id="iceowrks.global.bar.feedback.join" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/alibaba/ice/issues/new"
                  style={{ display: 'block' }}
                >
                  <FormattedMessage id="iceowrks.global.bar.feedback.submit" />
                </a>
              </div>
            </div>
          </Balloon>
        </div>
      </div>
    </div>
  ) : null;
};

GlobalBar.propTypes = {
  project: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(GlobalBar);
