import React from 'react';
import { Link } from 'react-router-dom';
import { headerMenuConfig, asideMenuConfig } from '@/config/menu';
import styles from './index.module.scss';

export default function BasicLayout ({ children }) {

  return (
    <div className={styles.container}>
      {/* Aside */}
      <div className={styles.aside}>
        {asideMenuConfig && asideMenuConfig.length > 0 ? (
          asideMenuConfig.map((item, idx) => {
            return <NavLink key={idx} {...item} />;
          })
        ) : null}
      </div>

      {/* Main */}
      <div className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            headerMenuConfig.map((item, idx) => {
              return <NavLink key={idx} {...item} />;
            })
          ) : null}
        </div>

        {/* Content */}
        <div className={styles.content}>
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
