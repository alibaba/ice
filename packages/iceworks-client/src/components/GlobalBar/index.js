import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Balloon } from '@alifd/next';
import { FormattedMessage, injectIntl } from 'react-intl';
import Icon from '@components/Icon';
import XtermTerminal from '@components/XtermTerminal';
import { ThemeContext } from '@components/ThemeProvider';
import socket from '@src/socket';
import useSocket from '@hooks/useSocket';
import useTermTheme from '@hooks/useTermTheme';
import showMessage from '@utils/showMessage';
import { THEMES } from '@src/appConfig';
import goldlog from '@utils/goldlog';
import stores from '@stores';
import styles from './index.module.scss';

const GlobalBar = ({ project, intl }) => {
  const [globalTerminalStore] = stores.useStores(['globalTerminal']);
  const [activeKey, changeActiveKey] = useState('operation');
  const { theme, setTheme } = useContext(ThemeContext);
  const { themeValue, termTheme } = useTermTheme();
  const { dataSource: { show, globalTerminalType } } = globalTerminalStore;
  const projectPath = project.path;

  function handleTerminal() {
    globalTerminalStore.trigger();
  }

  async function handleFolder() {
    try {
      await socket.emit('home.system.openFolder', { path: projectPath });
      goldlog({
        namespace: 'home',
        module: 'system',
        action: 'open-folder',
      });
    } catch (error) {
      showMessage(error);
    }
  }

  async function handleEditor() {
    try {
      await socket.emit('home.system.openEditor', { path: projectPath });
      goldlog({
        namespace: 'home',
        module: 'system',
        action: 'open-editor',
      });
    } catch (error) {
      showMessage(error);
    }
  }

  async function handleTheme() {
    const currentTheme = (theme === THEMES.dark.themePackage)
      ? THEMES.light.themePackage
      : THEMES.dark.themePackage;

    goldlog({
      namespace: 'home',
      module: 'setting',
      action: 'set-theme',
      data: {
        theme: currentTheme,
      },
    });

    try {
      await socket.emit('home.setting.setTheme', { theme: currentTheme });
      // set app theme
      setTheme(currentTheme);
    } catch (error) {
      showMessage(error);
    }
  }

  function onClose() {
    globalTerminalStore.hide();
  }

  useSocket('home.system.open.editor.data', (data) => {
    if (data) {
      showMessage('打开编辑器失败，请先手动启动编辑器，或者将编辑器注册到终端命令行中');
    }
  });

  function termHiddenClassName(key) {
    return activeKey === key ? '' : styles.hidden;
  };

  function tabBarActiveClassName(key) {
    return activeKey === key ? styles.tabActive : '';
  }

  const hiddenClassName = show ? '' : styles.hidden;
  const themeKey = themeValue === 'dark' ? 'light' : 'dark';

  const tabs = [
    {
      title: 'iceworks.global.bar.log.operation',
      key: 'operation',
      id: 'globalOperationLog',
    },
    {
      title: 'iceworks.global.bar.log.process',
      key: 'process',
      id: 'globalProcessLog',
    },
  ];

  useEffect(() => {
    changeActiveKey(globalTerminalType);
  }, [globalTerminalType]);

  return project.name ? (
    <div className={styles.container}>
      <div className={`${styles.globalTerminal} ${hiddenClassName}`}>
        <div className={styles.tabsNavScroll}>
          <ul role="tablist" className={styles.tabsNav}>
            {tabs.map(tab => (
              <li
                key={tab.key}
                role="tab"
                className={`${styles.tab} ${tabBarActiveClassName(tab.key)}`}
                onClick={() => changeActiveKey(tab.key)}
              >
                <div className={styles.tabInner}>
                  {intl.formatMessage({
                    id: tab.title,
                  })}
                </div>
              </li>
            ))}
          </ul>
          <Icon
            type="close"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.terminalWrap}>
          {tabs.map(tab => (
            <div key={tab.key} className={`${styles.terminal} ${termHiddenClassName(tab.key)}`}>
              <XtermTerminal
                id={tab.id}
                options={{ cols: '100', rows: '17', theme: termTheme }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.globalBar}>
        <div className={styles.leftContent}>
          <div className={styles.item}>
            <FormattedMessage id="iceworks.global.bar.project" />：
            <span className={styles.projectName}>{project.name}</span>
          </div>
          <div className={styles.item} onClick={handleTerminal}>
            <Icon type="pc" className={styles.icon} />
            <FormattedMessage id="iceworks.global.bar.log" />
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.item} onClick={handleFolder}>
            <Icon type="folderopen" className={styles.icon} />
            <FormattedMessage id="iceworks.global.bar.folder" />
          </div>
          <div className={styles.item} onClick={handleEditor}>
            <Icon type="code" className={styles.icon} />
            <FormattedMessage id="iceworks.global.bar.editor" />
          </div>
          <div className={styles.item} onClick={handleTheme}>
            <Icon type="zhuti" className={styles.icon} size="small" />
            <FormattedMessage id={`iceworks.global.bar.theme.${themeKey}`} />
          </div>
          <Balloon
            align="tl"
            closable={false}
            trigger={
              <div className={styles.item}>
                <Icon type="face" className={styles.icon} size="small" />
                <FormattedMessage id="iceworks.global.bar.feedback" />
              </div>
            }
            triggerType="click"
          >
            <div className={styles.feedback}>
              <h4 style={{ margin: '0 0 10px' }}>
                <FormattedMessage id="iceworks.global.bar.feedback.title" />
              </h4>
              <div className={styles.links}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://ice.alicdn.com/assets/images/qrcode.png"
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  <FormattedMessage id="iceworks.global.bar.feedback.join" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/alibaba/ice/issues/new"
                  style={{ display: 'block' }}
                >
                  <FormattedMessage id="iceworks.global.bar.feedback.submit" />
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
