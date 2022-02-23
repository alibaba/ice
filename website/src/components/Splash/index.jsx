import React from 'react';
import Button from '../Button';
import styles from './splash.module.css';
import splash from '../../../static/img/splash.png';

function Splash() {
  return (
    <header>
      <div className={styles.splash}>
        <div className={styles['title-container']}>
          <h1 className={styles.title}>飞冰（ICE） 3.0</h1>
          <p className={styles.subtitle}>
            基于 React 的应用研发框架
          </p>
          <div className={styles.githubStars}>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=alibaba&repo=ice&type=star&count=true&size=large"
              frameBorder="0"
              scrolling="0"
              width="170"
              height="30"
              title="GitHub"
            ></iframe>
          </div>
          <div className={styles.buttons}>
            <Button url={'/docs/guide/start'}>快速开始</Button>
          </div>
        </div>
        <div className={styles['img-container']}>
          <img className={styles['splash-img']} src={splash} />
        </div>
      </div>
    </header>
  );
}

export default Splash;
