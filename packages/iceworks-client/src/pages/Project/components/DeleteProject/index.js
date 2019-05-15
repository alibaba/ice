import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { Checkbox } from '@alifd/next';
import styles from './index.module.scss';

const DeleteProject = ({
  on, onCancel, onOk, project,
}) => {
  const [removeFiles, setState] = useState(false);

  return (
    <Modal
      title="删除项目"
      visible={on}
      onCancel={onCancel}
      onOk={() => onOk({ removeFiles })}
    >
      <div className={styles.wrapper}>
        <p>
          确定移除项目 &quot;{project.name}&quot; ？
        </p>
        <div>
          <Checkbox checked={removeFiles} onChange={(checked) => setState(checked)}>
            同时删除项目文件（可从系统垃圾箱找回）
          </Checkbox>
        </div>
      </div>
    </Modal>
  );
};

DeleteProject.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

export default DeleteProject;
