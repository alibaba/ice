import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import storage from '../utils/storage';
import { isIntranet } from '../utils/internal';
import styles from './Root.module.css';

const NO_REDIRECT_KEY = 'no-redirect-internal';
const STORAGE_VALID_TIME = 7 * (24 * 60 * 60 * 1000);

// Bypass SSR environment.
if (typeof window !== 'undefined') {
  isIntranet().then(() => {
    // Add QA tag entry for internal users.
    const script = document.createElement('script');
    script.src = 'https://links.alibaba-inc.com/widgetInit/5f717ef787f98104f34edc18';
    script.async = true;
    document.body.appendChild(script);
  });
}

// Default implementation, that you can customize
function Root({ children }) {
  const [noticeVisible, setNoticeVisible] = useState(false);

  useEffect(() => {
    if (
      // In case of redirect for internal site.
      !/alibaba-inc\.com/.test(window.location.href) &&
      // If ignored by user, then skip.
      storage.get(NO_REDIRECT_KEY) !== 'TRUE'
    ) {
      isIntranet()
        .then(() => {
          setNoticeVisible(true);
        });
    }
  }, []);

  return (
    <>
      {children}
      {noticeVisible && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p className={styles.content}>检测到您是内网用户，建议前往内部官网 <a href="https://ice3.alibaba-inc.com">https://ice3.alibaba-inc.com</a> 以获取更多信息？</p>
            <div className={styles.action}>
              <div
                className={clsx(styles.btn, styles.primaryBtn)}
                onClick={() => {
                  location.href = 'https://ice3.alibaba-inc.com';
                }}
              >
                去内部官网（推荐）
              </div>
              <div
                className={clsx(styles.btn)}
                onClick={() => {
                  setNoticeVisible(false);
                  storage.set(NO_REDIRECT_KEY, 'TRUE', String(STORAGE_VALID_TIME));
                }}
              >
                七天内不再提示
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Root;
