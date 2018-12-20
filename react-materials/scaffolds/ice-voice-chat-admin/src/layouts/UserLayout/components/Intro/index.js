import React from 'react';

const LoginIntro = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.title}>智能语音对话平台</div>
        <p style={styles.description}>触达更多优质用户，轻松创建语音技能</p>
        <p style={styles.description}>抢占优质首发技能，抢注优质技能调用名称</p>
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
