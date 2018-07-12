import React from 'react';

export default () => {
  return (
    <div style={styles.footer}>
      <div style={styles.links}>
        <a href="#" style={styles.link}>
          帮助
        </a>
        <a href="#" style={styles.link}>
          隐私
        </a>
        <a href="#" style={{ ...styles.link, marginRight: '0' }}>
          条款
        </a>
      </div>
      <div style={styles.copyright}>阿里巴巴集团 © 2018 版权所有</div>
    </div>
  );
};

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: '0',
    right: '0',
    bottom: '20px',
  },
  links: {
    marginBottom: '8px',
  },
  link: {
    fontSize: '13px',
    marginRight: '40px',
    color: 'rgba(0, 0, 0, .45)',
  },
  copyright: {
    fontSize: '13px',
    color: 'rgba(0, 0, 0, .45)',
    lineHeight: 1.5,
    textAlign: 'right',
  },
};
