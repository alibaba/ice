import _Icon from '@icedesign/base/lib/icon';
import React from 'react';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';

import { Link } from 'react-router';
import { headerNavs } from './navs';
import Logo from './Logo';

export default (function (_ref) {
  var width = _ref.width;

  return React.createElement(
    Layout.Header,
    null,
    React.createElement(
      'div',
      { className: 'ice-admin-layout-header', style: { width: width } },
      React.createElement(Logo, null),
      React.createElement(
        'div',
        {
          className: 'ice-admin-layout-header-menu',
          style: { display: 'flex' }
        },
        headerNavs && headerNavs.length > 0 ? React.createElement(
          Menu,
          { mode: 'horizontal', selectedKeys: [] },
          headerNavs.map(function (nav, idx) {
            var linkProps = {};
            if (nav.newWindow) {
              linkProps.href = nav.to;
              linkProps.target = '_blank';
            } else if (nav.external) {
              linkProps.href = nav.to;
            } else {
              linkProps.to = nav.to;
            }
            return React.createElement(
              Menu.Item,
              { key: idx },
              React.createElement(
                Link,
                linkProps,
                nav.icon ? React.createElement(_Icon, { type: nav.icon, size: 'xs' }) : null,
                nav.text
              )
            );
          })
        ) : null,
        React.createElement(
          'a',
          {
            className: 'ice-admin-layout-header-userpannel',
            style: {
              marginLeft: 45,
              display: 'flex',
              alignItems: 'center'
            },
            href: 'https://www.taobao.com',
            target: '_blank',
            rel: 'noopener noreferrer'
          },
          React.createElement(IceImg, {
            height: 40,
            width: 40,
            src: 'https://gw.alicdn.com/tfs/TB13ENCnwDD8KJjy0FdXXcjvXXa-192-192.png',
            style: { marginRight: '12px', borderRadius: 8 }
          }),
          React.createElement(
            'span',
            { className: 'ice-admin-layout-header-username' },
            '\u6DD8\u5C0F\u5B9D'
          )
        )
      )
    )
  );
});