import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socket from '@src/socket';
import { Input } from '@alifd/next';
import Icon from '@components/Icon';
import Modal from '@components/Modal';
import showMessage from '@utils/showMessage';
import styles from './index.module.scss';

const SelectWorkFolderModal = ({ on, onCancel, onOk, loading }) => {
  const [workFolder, setWorkFolder] = useState({});
  const {path: workPath, directories = [], disabled = true} = workFolder;

  async function onSetWorkPathBySub(subDirectory) {
    try {
      const result = await socket.emit('home.setting.setWorkFolderBySub', { subDirectory });
      setWorkFolder({
        ...workFolder,
        ...result,
        disabled: true,
      });
    } catch (error) {
      showMessage(error);
    }
  }

  async function onSetWorkPath() {
    try {
      const result = await socket.emit('home.setting.setWorkFolder', { path: workPath });
      setWorkFolder({
        ...workFolder,
        ...result,
        disabled: true,
      });
    } catch (error) {
      showMessage(error);
      setWorkFolder({
        ...await socket.emit('home.setting.workFolder'),
        disabled: true,
      });
    }
  }

  async function onSetParentAsWorkPath() {
    await onSetWorkPathBySub('..');
  }

  function onSetWorkPathCanEdit() {
    setWorkFolder({
      ...workFolder,
      disabled: false,
    });
  }

  function onChangeWorkPath(value) {
    setWorkFolder({
      ...workFolder,
      path: value,
    });
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
      okProps={{loading}}
    >
      <div className={styles.wrap}>
        <div className={styles.bar}>
          <Icon
            type="up-arrow"
            size="small"
            className={styles.up}
            onClick={onSetParentAsWorkPath}
          />
          <Input 
            className={styles.input}
            value={workPath}
            disabled={disabled}
            onPressEnter={onSetWorkPath}
            onChange={onChangeWorkPath}
          />
          <Icon
            type="pencil"
            size="small"
            className={styles.edit}
            onClick={onSetWorkPathCanEdit}
          />
        </div>
        <div className={styles.list}>
          {directories.map((directory) => {
            return (
              <div
                className={styles.item}
                key={directory}
                onClick={async () => {
                  await onSetWorkPathBySub(directory);
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

SelectWorkFolderModal.defaultProps = {
  loading: false,
};

SelectWorkFolderModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default SelectWorkFolderModal;
