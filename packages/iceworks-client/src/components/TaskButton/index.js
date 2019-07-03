import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import Icon from '@components/Icon';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const TaskButton = ({ isWorking, onStart, onStop }) => {
  if (!isWorking) {
    return (
      <Button
        type="primary"
        className={styles.taskButton}
        onClick={onStart}
      >
        <Icon type="start" className={styles.icon} />
        <FormattedMessage id="iceworks.task.start" />
      </Button>
    );
  }

  return (
    <Button type="primary" className={styles.taskButton} onClick={onStop}>
      <Icon type="stop" className={styles.icon} />
      <FormattedMessage id="iceworks.task.stop" />
    </Button>
  );
};

TaskButton.defaultProps = {
  isWorking: false,
  onStart: () => {},
  onStop: () => {},
};

TaskButton.propTypes = {
  isWorking: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
};


export default TaskButton;
