import React from 'react';
import IceNotification from '@icedesign/notification';
import Card from '@components/Card';
import XtermTerminal from '@components/XtermTerminal';
import TerminalBar from '@components/TerminalBar';
import styles from './index.module.scss';
import buildStores from './stores';

const Build = () => {
  const build = buildStores.useStore('build');

  const onStart = async () => {
    try {
      await build.start();
    } catch (error) {
      IceNotification.error({
        message: 'Start the build project failure',
        description: error.message || 'Please try again',
      });
    }
  };

  const onStop = async () => {
    try {
      await build.stop();
    } catch (error) {
      IceNotification.error({
        message: 'Stop building the project failure',
        description: error.message || 'Please try again',
      });
    }
  };

  return (
    <Card
      title="构建项目"
      subTitle="用于生产环境"
      contentHeight="100%"
      className={styles.buildCard}
    >
      <TerminalBar
        isWorking={build.dataSource.status === 'working'}
        onStart={onStart}
        onStop={onStop}
      />

      {/* Content */}
      <div className={styles.content}>
        <XtermTerminal
          name="liteApp"
          startEventName="project.build.start.data"
          stopEventName="project.build.stop.data"
        />
      </div>
    </Card>
  );
};

export default Build;
