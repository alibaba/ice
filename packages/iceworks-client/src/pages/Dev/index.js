import React from 'react';
import Card from '@components/Card';
import XtermTerminal from '@components/XtermTerminal';
import TerminalBar from '@components/TerminalBar';
import useModal from '@hooks/useModal';
import IceNotification from '@icedesign/notification';
import SettingsModal from './components/SettingsModal';
import devStores from './stores';
import styles from './index.module.scss';

const Dev = () => {
  const dev = devStores.useStore('dev');
  const { on, toggleModal } = useModal();

  const onStart = async () => {
    try {
      await dev.start();
    } catch (error) {
      IceNotification.error({
        message: '启动调试服务失败',
        description: error.message || '请重试。',
      });
    }
  };

  const onStop = async () => {
    try {
      await dev.stop();
    } catch (error) {
      IceNotification.error({
        message: '终止调试服务失败',
        description: error.message || '请重试。',
      });
    }
  };

  const onSetting = async () => {
    await dev.getSettings();
    toggleModal();
  };

  return (
    <Card
      title="启动服务"
      subTitle="用于开发环境"
      contentHeight="100%"
      className={styles.devCard}
    >
      <TerminalBar
        isWorking={dev.dataSource.status === 'working'}
        onStart={onStart}
        onStop={onStop}
        onSetting={onSetting}
      />

      {/* Content */}
      <div className={styles.content}>
        <XtermTerminal
          name="liteApp"
          startEventName="project.dev.start.data"
          stopEventName="project.dev.stop.data"
        />
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
