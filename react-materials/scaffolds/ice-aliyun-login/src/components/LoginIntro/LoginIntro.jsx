import React from 'react';

const LoginIntro = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.title}>2018杭州云栖大会火热售票中</div>
        <p style={styles.description}>
          160余场前沿技术、产品和行业峰会和分论坛
        </p>
        <p style={styles.description}>
          上千位分享嘉宾、数万名创新创业者汇聚一堂
        </p>
        <p style={styles.description}>一起解构数字世界，碰撞科技创新思想</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    width: '350px',
    color: '#fff',
  },
  title: {
    marginBottom: '20px',
    fontWeight: '700',
    fontSize: '26px',
    lineHeight: '1.5',
  },
  description: {
    margin: '0',
    fontSize: '14px',
    color: '#fff',
    letterSpacing: '0.45px',
    lineHeight: '30px',
  },
};

export default LoginIntro;
