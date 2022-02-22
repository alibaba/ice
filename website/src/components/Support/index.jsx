import React from 'react';
import styles from './support.module.css';

function Support({ list }) {
  const availablePlatforms = ['webpack', 'vite'];
  return (
    <span className={styles.container}>
      {availablePlatforms.map((supportPlatform) => {
        return (
          <img
            title={supportPlatform}
            className={styles[supportPlatform]}
            key={supportPlatform}
            src={`/img/svg/${list.includes(supportPlatform) ? supportPlatform : `${supportPlatform}-gray`}.svg`}
          />
        );
      })}
    </span>
  );
}

export default Support;
