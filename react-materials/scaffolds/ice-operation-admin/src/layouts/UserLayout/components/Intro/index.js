import React from 'react';

const LoginIntro = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.title}>设备管理系统</div>
        <p style={styles.description}>运营与管控一体化的整合式服务平台</p>
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
    fontSize: '38px',
    lineHeight: '1.5',
  },
  description: {
    margin: '0',
    fontSize: '14px',
    color: '#fff',
    letterSpacing: '0.45px',
    lineHeight: '32px',
  },
};

export default LoginIntro;
