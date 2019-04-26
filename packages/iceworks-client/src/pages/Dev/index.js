import React from 'react';
import { Button } from '@alifd/next';
import {
  ICEWORKS_TASK_DEV_OPEN,
  ICEWORKS_TASK_DEV_DATA,
} from 'iceworks-events';
import Card from '@components/Card';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import XtermTerminal from '@components/XtermTerminal';
import useModal from '@hooks/useModal';
import { useSocket } from '@hooks/useSocket';
import styles from './index.module.scss';

const Dev = () => {
  const { on, toggleModal } = useModal();
  const socket = useSocket();

  const dev = () => {
    socket.emit(ICEWORKS_TASK_DEV_OPEN, 'dev');

    socket.on(ICEWORKS_TASK_DEV_DATA, (data) => {
      console.log(ICEWORKS_TASK_DEV_DATA, data);
    });
  };

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
          <Button type="primary" className={styles.btn} onClick={dev}>
            <Icon type="start" className={styles.icon} />
            运行
          </Button>
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
