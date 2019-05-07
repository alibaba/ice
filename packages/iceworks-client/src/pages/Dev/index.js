import React, { useEffect } from 'react';
import { Button } from '@alifd/next';
import Card from '@components/Card';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import XtermTerminal from '@components/XtermTerminal';
import useModal from '@hooks/useModal';
import stores from '@stores';
import IceNotification from '@icedesign/notification';
import styles from './index.module.scss';

const Dev = () => {
  const project = stores.useStore('project');
  const { on, toggleModal } = useModal();

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

  const devSettings = async () => {
    try {
      await project.devSettings();
    } catch (error) {
      IceNotification.error({
        message: '获取配置项失败',
        description: error.message || '请重试。',
      });
    }
  };

  useEffect(() => {
    devSettings();
  }, []);

  console.log(project.dataSource);

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
            <Button type="primary" className={styles.btn} onClick={devStart}>
              <Icon type="start" className={styles.icon} />
              运行
            </Button>
          ) : (
            <Button type="primary" className={styles.btn} onClick={devStop}>
              <Icon type="stop" className={styles.icon} />
              停止
            </Button>
          )}
          <Button type="secondary" className={styles.btn} onClick={toggleModal}>
            <Icon type="settings" className={styles.icon} />
            设置
          </Button>
        </div>

        {/* Right Button Group */}
        <div className={styles.rightActionBar}>
          <Button.Group>
            <Button type="primary">
              <Icon type="pc" /> 日志
            </Button>
            <Button type="secondary">
              <Icon type="projects" /> 仪表盘
            </Button>
            <Button type="secondary">
              <Icon type="wrencha" /> 构建分析
            </Button>
          </Button.Group>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <XtermTerminal />
      </div>

      {/* Modal */}
      <Modal visible={on} onCancel={toggleModal}>
        Modal Content
      </Modal>
    </Card>
  );
};

export default Dev;
