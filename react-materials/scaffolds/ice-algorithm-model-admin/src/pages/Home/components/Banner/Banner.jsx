import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Banner extends Component {
  static displayName = 'Banner';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.caption}>机器学习算法模型服务平台</div>
          <div style={styles.caption}>
            支持 TensorFlow、PMML 模型的一键部署线上服务
          </div>
          <div style={styles.caption}>快捷、简约、稳定</div>
          <Link style={styles.quickStart} to="/model/performance">
            马上使用
          </Link>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundImage: 'url(https://aiengine.alibaba.com/static/img/ai_img.jpg)',
    height: '500px',
    backgroundSize: 'cover',
    position: 'relative',
  },
  content: {
    width: '500px',
    position: 'absolute',
    left: '60%',
    top: '30%',
  },
  caption: {
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: '400',
    color: '#666',
  },
  quickStart: {
    display: 'inline-block',
    fontSize: '20px',
    padding: '15px 20px',
    background: '#6ac8f3',
    color: '#fff',
    borderRadius: '4px',
    textDecoration: 'none',
  },
};
