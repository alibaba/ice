import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Checkbox } from '@alifd/next';
import styles from './index.module.scss';

const DeleteProjectModal = ({
  on, onCancel, onOk, project,
}) => {
  const initDeleteFiles = false;
  const [deleteFiles, setState] = useState(initDeleteFiles);

  function onClose() {
    onCancel();
    setState(initDeleteFiles);
  }
  return (
    <Modal
      title="删除项目"
      visible={on}
      onCancel={onClose}
      onOk={() => onOk({ deleteFiles })}
    >
      <div className={styles.wrapper}>
        <p>
          确定移除项目 &quot;{project.name}&quot; ？
        </p>
        <div>
          <Checkbox checked={deleteFiles} onChange={(checked) => setState(checked)}>
            同时删除项目文件（可从系统垃圾箱找回）
          </Checkbox>
        </div>
      </div>
    </Modal>
  );
};

DeleteProjectModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

export default DeleteProjectModal;
