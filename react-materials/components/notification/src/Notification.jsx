'use strict';

import React from 'react';
import RCNotification from 'rc-notification';
import { Icon } from '@alifd/next';

/**
 * List容器组件
 */
let defaultDuration = 4.5;
let defaultTop = 24;
let defaultBottom = 24;
let defaultPlacement = 'topRight';
let notificationInstance = null;

function getPlacementStyle(placement) {
  let style;
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top: defaultTop,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom: defaultBottom,
      };
      break;
    case 'bottomRight':
      style = {
        right: 0,
        top: 'auto',
        bottom: defaultBottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: defaultTop,
        bottom: 'auto',
      };
  }
  return style;
}

function getNotificationInstance(prefixCls) {
  if (notificationInstance) {
    return notificationInstance;
  }
  notificationInstance = RCNotification.newInstance({
    prefixCls: prefixCls,
    className: `${prefixCls}-${defaultPlacement}`,
    style: getPlacementStyle(defaultPlacement),
  });
  return notificationInstance;
}

function notice(args = {}) {
  const outerPrefixCls = args.prefixCls || 'ice-notification';
  const prefixCls = `${outerPrefixCls}-notice`;

  if (args.placement !== undefined) {
    defaultPlacement = args.placement;
    notificationInstance = null; // delete notificationInstance for new defaultPlacement
  }

  let duration;
  if (args.duration === undefined) {
    duration = defaultDuration;
  } else {
    duration = args.duration;
  }

  let iconType = '';
  switch (args.type) {
    case 'success':
      iconType = 'success';
      break;
    case 'info':
      iconType = 'prompt';
      break;
    case 'error':
      iconType = 'delete-filling';
      break;
    case 'warning':
      iconType = 'warning';
      break;
    default:
      iconType = 'comments';
  }

  let iconNode;
  if (args.icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{args.icon}</span>;
  } else if (args.type) {
    iconNode = (
      <Icon
        className={`${prefixCls}-icon ${prefixCls}-icon-${args.type}`}
        type={iconType}
      />
    );
  }

  const autoMarginTag =
    !args.description && iconNode ? (
      <span className={`${prefixCls}-message-single-line-auto-margin`} />
    ) : null;
  getNotificationInstance(outerPrefixCls).notice({
    content: (
      <div className={iconNode ? `${prefixCls}-with-icon` : ''}>
        {iconNode}
        <div className={`${prefixCls}-message`}>
          {autoMarginTag}
          {args.message}
        </div>
        <div className={`${prefixCls}-description`}>{args.description}</div>
        {args.btn ? (
          <span className={`${prefixCls}-btn`}>{args.btn}</span>
        ) : null}
      </div>
    ),
    duration,
    closable: true,
    onClose: args.onClose,
    key: args.key,
    style: {},
  });
}

const api = {
  open(args) {
    notice(args);
  },
  close(key) {
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
  },
  config(options) {
    const { duration, placement, bottom, top } = options;
    if (placement !== undefined) {
      defaultPlacement = placement;
    }
    if (bottom !== undefined) {
      defaultBottom = bottom;
    }
    if (top !== undefined) {
      defaultTop = top;
    }
    // delete notificationInstance
    if (placement !== undefined || bottom !== undefined || top !== undefined) {
      notificationInstance = null;
    }
    if (duration !== undefined) {
      defaultDuration = duration;
    }
  },
  destroy() {
    if (notificationInstance) {
      notificationInstance.destroy();
      notificationInstance = null;
    }
  },
};

['success', 'info', 'warning', 'error'].forEach((type) => {
  api[type] = (args) =>
    api.open({
      ...args,
      type,
    });
});

export default api; // export 是引用
