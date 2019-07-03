import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button } from '@alifd/next';
import Icon from '@components/Icon';
import TaskButton from '@components/TaskButton';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import styles from './index.module.scss';

const TaskItem = ({ title, desc, icon, path, intl, history, isWorking, onStart, onStop }) => {
  function handleClick() {
    history.push(path);
  }

  return (
    <Panel header={
      <PanelHead
        title={intl.formatMessage({ id: 'iceworks.project.panel.task.title' })}
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
            <FormattedMessage id="iceworks.task.setting" />
          </Button>
        </div>
      </div>
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
  intl: PropTypes.object.isRequired,
  isWorking: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};

export default injectIntl(withRouter(TaskItem));
