import cx from 'classnames';
import React from 'react';

function progress(percentage) {
  if (percentage == 0 || percentage == 1) {
    return null;
  }
  return Math.floor(percentage * 100) + '%';
}

const DevStatus = (props) => {
  const classes = cx({
    'project-status': true,
    [`project-status-${props.status}`]: true,
  });
  const statusMap = {
    notexist: '项目已不存在',
    normal: '未启动调试服务',
    starting: '调试服务启动中',
    working: '调试服务运行中',
    stop: '调试服务已停止',
  };
  return (
    <span className={classes}>
      {statusMap[props.status]} {progress(props.progress)}
    </span>
  );
};

export default DevStatus;
