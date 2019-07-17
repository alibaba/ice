import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button } from '@alifd/next';
import Icon from '@components/Icon';
import TaskButton from '@components/TaskButton';
import Modal from '@components/Modal';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import styles from './index.module.scss';

const TaskItem = ({
  title,
  desc,
  icon,
  path,
  history,
  isWorking,
  onStart,
  onStop,
  installDependencyVisible,
  onInstallDependencyCancel,
  onInstallDependencyOk,
}) => {
  function handleClick() {
    history.push(path);
  }

  return (
    <Panel header={
      <PanelHead
        title={title}
        desc={desc}
      />}
    >
      <div className={styles.taskItem}>
        <div className={styles.taskInfo}>
          <Icon type={icon} />
          <h5 className={styles.title}>{title}</h5>
          <p className={styles.desc}>（{desc}）</p>
        </div>
        <div className={styles.taskAction}>
          <TaskButton
            isWorking={isWorking}
            onStart={onStart}
            onStop={onStop}
          />
          <Button type="normal" onClick={handleClick} className={styles.settingButton}>
            <Icon type="settings" className={styles.settingIcon} />
            <FormattedMessage id="iceworks.project.panel.quick.task.setting" />
          </Button>
        </div>
      </div>
      <Modal
        title={<FormattedMessage id="iceworks.project.install.dependencies.title" />}
        visible={installDependencyVisible}
        onCancel={onInstallDependencyCancel}
        onOk={onInstallDependencyOk}
      >
        <FormattedMessage id="iceworks.project.install.dependencies.content" />
      </Modal>
    </Panel>
  );
};


TaskItem.defaultProps = {
  isWorking: false,
  onStart: () => {},
  onStop: () => {},
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  installDependencyVisible: PropTypes.bool.isRequired,
  onInstallDependencyCancel: PropTypes.func.isRequired,
  onInstallDependencyOk: PropTypes.func.isRequired,
  isWorking: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default withRouter(TaskItem);
