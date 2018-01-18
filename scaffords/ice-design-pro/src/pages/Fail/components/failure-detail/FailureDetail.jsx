

import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Button } from '@icedesign/base';
import './FailureDetail.scss';

export default class FailureDetail extends Component {
  static displayName = 'FailureDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps, nextContext) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="failure-detail" style={styles.failureDetail}>
        <IceCard style={styles.card}>
          <div style={styles.successDetailHead}>
            <img
              style={styles.img}
              src="https://img.alicdn.com/tfs/TB1LUMhhY_I8KJjy1XaXXbsxpXa-156-156.png"
            />
            <h3 style={styles.title}>提交失败</h3>
          </div>
          <p style={styles.summary}>提供信息不符合要求，请重新提交</p>
          <p style={styles.descrpiton}>
            如果有更多细节需要展示，可以补充在这里，一些相关的介绍和描述
          </p>
          <a href="/" style={styles.backToLink}>
            返回修改
          </a>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  failureDetail: { textAlign: 'center' },
  img: {
    width: '40px',
    height: '40px',
  },
  successDetailHead: {
    position: 'relative',
  },
  title: { margin: '0', fontWeight: 'bold' },
  summary: {
    marginBottom: '40px',
    fontSize: '14px',
    color: '#666',
  },
  descrpiton: { fontSize: '14px', color: '#666' },
  backToLink: {
    display: 'inline-block',
    marginTop: '80px',
    height: '28px',
    padding: '0 16px',
    fontSize: '14px',
    lineHeight: '26px',
    color: '#fff',
    borderRadius: '50px',
    backgroundColor: '#3080fe',
  },
  card: { padding: '80px 40px' },
};
