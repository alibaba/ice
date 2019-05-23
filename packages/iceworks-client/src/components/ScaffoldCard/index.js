/* eslint no-use-before-define:0 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const ScaffoldCard = ({ dataSource, bgColor, onInstall }) => {
  function handleInstall() {
    if (typeof onInstall === 'function') {
      onInstall(dataSource);
    }
  }

  return (
    <div className={styles.scaffold}>
      <div className={styles.body} style={{ background: bgColor }}>
        {dataSource.isNewlyCreated ? (
          <div className={styles.newly}>NEW</div>
        ) : null}
        {dataSource.screenshots.map((url, key) => {
          const screenshotStyle = generateStyle(dataSource.screenshots, key);
          return (
            <img
              alt=""
              src={url}
              style={{ transform: 'scale(0.6)', ...screenshotStyle }}
              className={styles.screenshotImg}
              key={key}
            />
          );
        })}
      </div>

      <div className={styles.info}>
        <div className={styles.title}>{dataSource.title}</div>
        <div className={styles.desc}>
          {dataSource.description || '暂无描述'}
        </div>
      </div>

      <div className={styles.actions}>
        <a
          href={dataSource.homepage}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.button}
        >
          效果预览
        </a>
        <a
          href={dataSource.repository}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.button}
        >
          查看源码
        </a>
        <a className={styles.button} onClick={handleInstall}>使用该模版</a>
      </div>
    </div>
  );
};

ScaffoldCard.defaultProps = {
  bgColor: '#fafafa',
  onInstall: f => f,
};

ScaffoldCard.propTypes = {
  dataSource: PropTypes.object.isRequired,
  bgColor: PropTypes.string,
  onInstall: PropTypes.func,
};

export default ScaffoldCard;

function generateStyle(screenshots, index) {
  const l = screenshots.length;
  const i = index;

  let style = {};
  if (l === 2 && i === 0) {
    style = {
      position: 'absolute',
      bottom: '-20%',
      right: '-10%',
      zIndex: 1,
    };
  }

  if (l === 3) {
    if (i === 0) {
      style = {
        position: 'relative',
        zIndex: 9,
        boxShadow: '0 0 30px #8b8585',
        bottom: `${i * 10}%`,
        right: `${i * 10}%`,
        transform: 'scale(0.6)',
      };
    }

    if (i === 1 || i === 2) {
      style = {
        position: 'absolute',
        bottom: '-5%',
        right: i === 2 ? '-20%' : '20%',
        transform: 'scale(0.5)',
      };
    }
  }

  return style;
}
