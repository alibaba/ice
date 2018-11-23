import cx from 'classnames';
import React from 'react';

const BuildStatus = (props) => {
  const classes = cx({
    'project-status': true,
    [`project-status-${props.status}`]: true,
  });
  const statusMap = {
    normal: '未构建',
    building: '构建中',
    done: '构建完成',
    failed: '构建失败',
  };

  if (props.status === 'normal') {
    return null;
  }

  return <span className={classes}>{statusMap[props.status]}</span>;
};

export default BuildStatus;
