import React from 'react';
import { Button } from '@alifd/next';
import Card from '@components/Card';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import styles from './index.module.scss';

const Dev = () => {
  const { on, toggleModal } = useModal();
  return (
    <Card title="启动服务" subTitle="用于开发环境" className={styles.devCard}>
      <div className={styles.btnGroup}>
        {/* Left Button Group */}
        <div className={styles.leftBtnGroup}>
          <Button type="primary" className={styles.btn}>
            <Icon type="start" className={styles.icon} />
            运行
          </Button>
          <Button type="secondary" className={styles.btn} onClick={toggleModal}>
            <Icon type="settings" className={styles.icon} />
            设置
          </Button>
        </div>

        {/* Right Button Group */}
        <div className={styles.rightBtnGroup}>
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
      <div className={styles.content}>MainContent</div>

      {/* Modal */}
      <Modal visible={on} onCancel={toggleModal}>
        Modal Content
      </Modal>
    </Card>
  );
};

export default Dev;
