import cx from 'classnames';
import React from 'react';

import { shell } from 'electron';

const DevServerUrl = (props) => {
  const classes = cx({
    'project-server-url': true,
  });
  if (!props.url) {
    return null;
  }
  return (
    <span>
      本地服务器:{' '}
      <a
        href={props.url}
        onClick={(event) => {
          event.preventDefault();
          shell.openExternal(event.nativeEvent.target.href);
        }}
        className={classes}
      >
        {props.url}
      </a>
    </span>
  );
};

export default DevServerUrl;
