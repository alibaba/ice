import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { join } from '../../utils/path';
import styles from './support.module.css';

export default function Support({ list }) {
  const availablePlatforms = ['webpack', 'vite'];
  const context = useDocusaurusContext();
  return (
    <span className={styles.container}>
      {availablePlatforms.map((supportPlatform) => {
        return (
          <img
            title={supportPlatform}
            className={styles[supportPlatform]}
            key={supportPlatform}
            src={join(context.siteConfig.baseUrl, `/img/svg/${list.includes(supportPlatform) ? supportPlatform : `${supportPlatform}-gray`}.svg`)}
          />
        );
      })}
    </span>
  );
}
