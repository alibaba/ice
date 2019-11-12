import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function NotFound() {
  return (
    <div className={styles.basicnotfound}>
      <div className={styles.exceptioncontent}>
        <img
          src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png"
          className={styles.imgException}
          alt="not found"
        />
        <div className="prompt">
          <h3 className={styles.title}>
            Sorry, Page not found!
          </h3>
          <p className={styles.description}>
            Please back to
            <Link to="/">home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
