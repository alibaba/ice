/* eslint object-curly-newline:0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import TaskButton from '@components/TaskButton';
import styles from './index.module.scss';

const TaskBar = ({
  isWorking,
  onStart,
  onStop,
  onInstall,
  onSetting,
  extra,
  enableSetting,
}) => {
  return (
    <div className={styles.taskBar}>
      {/* Left Button Group */}
      <div className={styles.leftTaskBar}>
        <TaskButton
          isWorking={isWorking}
          onStop={onStop}
          onStart={onStart}
        />

        <Button
          type="normal"
          className={styles.leftButton}
          onClick={onInstall}
          disabled={isWorking}
        >
          <Icon type="package" className={styles.icon} />
          <FormattedMessage id="iceworks.task.install" />
        </Button>

        {enableSetting ?
          <Button
            type="secondary"
            className={styles.leftButton}
            onClick={onSetting}
            disabled={isWorking}
          >
            <Icon type="settings" className={styles.icon} />
            <FormattedMessage id="iceworks.task.setting" />
          </Button>
          : null
        }
      </div>

      {/* Right Button Group */}
      {extra}
    </div>
  );
};

TaskBar.defaultProps = {
  isWorking: false,
  onStart: () => {},
  onStop: () => {},
  onSetting: () => {},
  onInstall: () => {},
  extra: null,
  enableSetting: false,
};

TaskBar.propTypes = {
  isWorking: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onSetting: PropTypes.func,
  onInstall: PropTypes.func,
  extra: PropTypes.node,
  enableSetting: PropTypes.bool,
};

export default TaskBar;
