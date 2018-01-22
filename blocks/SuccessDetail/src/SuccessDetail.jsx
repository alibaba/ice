import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Step } from '@icedesign/base';
import './SuccessDetail.scss';

export default class SuccessDetail extends Component {
  static displayName = 'SuccessDetail';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: ['填写信息', '申请审核', '开通账号', '完成'], // 步骤条信息
      current: 1, // 当前步骤
      type: 'dot', // 步骤的类型，可选值: 'circle', 'arrow', 'dot'
    };
  }

  render() {
    const { value, current, type } = this.state;
    return (
      <div className="success-detail" style={styles.successDetail}>
        <IceContainer style={styles.container}>
          <div className="success-detail-head" style={styles.successDetailHead}>
            <img
              src="https://img.alicdn.com/tfs/TB1ya6gh0zJ8KJjSspkXXbF7VXa-156-156.png"
              style={styles.img}
              alt=""
            />
            <h3 className="title" style={styles.title}>
              提交成功
            </h3>
          </div>
          <p className="summary" style={styles.summary}>
            本文字区域可以展示简单的说明
          </p>
          <p className="descrpiton" style={styles.descrpiton}>
            如果有跟多细节需要展示，可以补充在下面这里，一些相关的介绍和描述
          </p>
          <Step current={current} type={type} style={styles.nextStep}>
            {value.map((item, index) => {
              return <Step.Item key={index} title={item} />;
            })}
          </Step>
          <div className="buttons" style={styles.buttons}>
            <Button type="normal" style={styles.btn}>
              返回首页
            </Button>
            <Button type="primary">查看更多</Button>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '80px 40px',
  },
  btn: {
    marginRight: '6px',
  },
  successDetail: {
    textAlign: 'center',
  },
  successDetailHead: {
    position: 'relative',
  },
  img: {
    Width: '40px',
    height: '40px',
  },
  title: {
    margin: '0',
  },
  summary: {
    marginBottom: '40px',
    fontSize: '14px',
    color: '#666',
  },
  nextStep: {
    margin: '80px 0',
  },
};
