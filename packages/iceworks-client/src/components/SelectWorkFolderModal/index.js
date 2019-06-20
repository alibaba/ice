import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socket from '@src/socket';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import styles from './index.module.scss';

const SelectWorkFolderModal = ({ on, onCancel, onOk }) => {
  const [workFolder, setWorkFolder] = useState({});
  const { path: workPath, directories = [] } = workFolder;

  async function onSetWork(setPath) {
    setWorkFolder(await socket.emit('home.setting.setWorkFolder', { path: setPath }));
  }

  async function onSetParentAsWork() {
    await onSetWork('..');
  }

  useEffect(() => {
    (async () => {
      setWorkFolder(await socket.emit('home.setting.workFolder'));
    })();
  }, []);

  return (
    <Modal
      title="打开项目"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk(workPath)}
    >
      <div className={styles.wrap}>
        <div className={styles.bar}>
          <Icon
            type="arrow-left"
            size="small"
            className={styles.icon}
            onClick={onSetParentAsWork}
          />
          <div className={styles.text}>{workPath}</div>
        </div>
        <div className={styles.list}>
          {directories.map((directory) => {
            return (
              <div
                className={styles.item}
                key={directory}
                onClick={async () => {
                  await onSetWork(directory);
                }}
              >
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

SelectWorkFolderModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default SelectWorkFolderModal;
