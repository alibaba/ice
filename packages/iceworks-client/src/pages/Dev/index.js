import React, { useEffect } from 'react';
import { Button } from '@alifd/next';
import Card from '@components/Card';
import Icon from '@components/Icon';
import XtermTerminal from '@components/XtermTerminal';
import stores from '@stores';
import useModal from '@hooks/useModal';
import IceNotification from '@icedesign/notification';
import SettingsModal from './components/SettingsModal';
import devStores from './stores';
import styles from './index.module.scss';

const Dev = () => {
  const { on, toggleModal } = useModal();
  const project = stores.useStore('project');
  const dev = devStores.useStore('dev');

  const devStart = async () => {
    try {
      await project.devStart();
    } catch (error) {
      IceNotification.error({
        message: '启动调试服务失败',
        description:
          error.message || '当前项目依赖未安装或依赖缺失，请重装依赖后重试。',
      });
    }
  };

  const devStop = async () => {
    try {
      await project.devStop();
    } catch (error) {
      IceNotification.error({
        message: '终止调试服务失败',
        description: error.message || '请重试。',
      });
    }
  };

  const handleDevSettings = async () => {
    await dev.getDevSettings(project.dataSource.folderPath);
    toggleModal();
  };

  useEffect(() => {
    project.refresh();
  }, []);

  return (
    <Card
      title="启动服务"
      subTitle="用于开发环境"
      contentHeight="100%"
      className={styles.devCard}
    >
      <div className={styles.actionBar}>
        {/* Left Button Group */}
        <div className={styles.leftActionBar}>
          {project.dataSource.devStatus !== 'working' ? (
            <Button
              type="primary"
              className={styles.leftButton}
              onClick={devStart}
            >
              <Icon type="start" className={styles.icon} />
              运行
            </Button>
          ) : (
            <Button
              type="primary"
              className={styles.leftButton}
              onClick={devStop}
            >
              <Icon type="stop" className={styles.icon} />
              停止
            </Button>
          )}
          <Button
            type="secondary"
            className={styles.leftButton}
            onClick={handleDevSettings}
          >
            <Icon type="settings" className={styles.icon} />
            设置
          </Button>
        </div>

        {/* Right Button Group */}
        <div className={styles.rightActionBar}>
          <Button.Group>
            <Button type="primary" className={styles.rightButton}>
              <Icon type="pc" /> 日志
            </Button>
            <Button type="secondary" className={styles.rightButton}>
              <Icon type="projects" /> 仪表盘
            </Button>
            <Button type="secondary" className={styles.rightButton}>
              <Icon type="wrencha" /> 构建分析
            </Button>
          </Button.Group>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <XtermTerminal />
      </div>

      {/*  Settings Modal */}
      <SettingsModal
        on={on}
        data={dev.dataSource.settings}
        toggleModal={toggleModal}
      />
    </Card>
  );
};

export default Dev;
