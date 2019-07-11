import React from 'react';
import { headerMenuConfig, asideMenuConfig } from '@/config/menu.js';
import styles from './index.module.scss';

export default function BasicLayout ({ children }) {

  return (
    <div style={styles.container}>
      {/* Aside */}
      <div style={styles.aside}>
        {asideMenuConfig && asideMenuConfig.length > 0 ? (
          asideMenuConfig.map((item, idx) => {
            return <NavLink key={idx} {...item} />;
          })
        ) : null}
      </div>

      {/* Main */}
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            headerMenuConfig.map((item, idx) => {
              return <NavLink key={idx} {...item} />;
            })
          ) : null}
        </div>

        {/* Content */}
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}


function NavLink(props) {
  const linkProps = {};
  if (props.newWindow) {
    linkProps.href = props.path;
    linkProps.target = '_blank';
  } else if (props.external) {
    linkProps.href = props.path;
  } else {
    linkProps.to = props.path;
  }

  return <Link {...linkProps}>{props.name}</Link>;
}
