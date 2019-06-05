import React, { useState, useEffect } from 'react';
import { Icon as NextIcon } from '@alifd/next';
import Icon from '@components/Icon';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import socket from '@src/socket';
import styles from './index.module.scss';

// TODO
const OpenProjectModal = ({ on, onCancel, onOk }) => {
  const [path, setPath] = useState('');
  const [work, setWork] = useState({});

  useEffect(() => {
    (async () => {
      setWork(await socket.emit('project.index.workDirectory'));
    })();
  }, []);

  const { workDirectory, directories = [] } = work;

  return (
    <Modal
      title="打开项目"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk(path)}
    >
      <div className={styles.wrap}>
        <div className={styles.bar}>
          <NextIcon type="arrow-left" size="xs" className={styles.icon} />
          <div className={styles.text}>{workDirectory}</div>
        </div>
        <div className={styles.list}>
          {directories.map((directory) => {
            return (
              <div className={styles.item} key={directory}>
                <Icon type="folderopen" size="large" />
                <span>{directory}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

OpenProjectModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default OpenProjectModal;
