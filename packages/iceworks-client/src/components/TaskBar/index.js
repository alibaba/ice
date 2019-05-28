/* eslint object-curly-newline:0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const TaskBar = ({ loading, onStart, onStop, onSetting, extra }) => {
  return (
    <div className={styles.taskBar}>
      {/* Left Button Group */}
      <div className={styles.leftTaskBar}>
        {!loading ? (
          <Button
            type="primary"
            className={styles.leftButton}
            onClick={onStart}
          >
            <Icon type="start" className={styles.icon} />
            <FormattedMessage id="iceworks.task.dev.start" />
          </Button>
        ) : (
          <Button type="primary" className={styles.leftButton} onClick={onStop}>
            <Icon type="stop" className={styles.icon} />
            <FormattedMessage id="iceworks.task.dev.stop" />
          </Button>
        )}
        <Button
          type="secondary"
          className={styles.leftButton}
          onClick={onSetting}
          disabled={loading}
        >
          <Icon type="settings" className={styles.icon} />
          <FormattedMessage id="iceworks.task.dev.setting" />
        </Button>
      </div>

      {/* Right Button Group */}
      {extra}
    </div>
  );
};

TaskBar.defaultProps = {
  loading: false,
  onStart: () => {},
  onStop: () => {},
  onSetting: () => {},
  extra: null,
};

TaskBar.propTypes = {
  loading: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onSetting: PropTypes.func,
  extra: PropTypes.node,
};

export default TaskBar;
