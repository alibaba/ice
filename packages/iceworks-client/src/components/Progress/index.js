import React from 'react';
import PropTypes from 'prop-types';
import { Progress as NextProgress } from '@alifd/next';
import styles from './index.module.scss';

const Progress = ({ statusText, show, percent }) => {
  return (
    show ?
      <div className={styles.wrap}>
        {statusText ? <span className={styles.status}>{statusText}</span> : null}
        <div className={styles.progress}>
          <NextProgress
            percent={percent}
          />
        </div>
      </div> :
      null
  );
};

Progress.defaultProps = {
  statusText: '',
  show: false,
  percent: 0,
};

Progress.propTypes = {
  statusText: PropTypes.string,
  show: PropTypes.bool,
  percent: PropTypes.number,
};

export default Progress;
