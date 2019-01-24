import React, { PureComponent } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Step, Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';

@withRouter
export default class SuccessDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ['填写信息', '申请审核', '开通账号', '完成'], // 步骤条信息
      current: 1, // 当前步骤
      type: 'dot', // 步骤的类型，可选值: 'circle', 'arrow', 'dot'
    };
  }

  handleBackClick = () => {
    this.props.history.push('/');
  };

  handleLinkClick = () => {
    Message.success('可以根据实际需求自定义查看更多');
  };

  render() {
    const { value, current, type } = this.state;
    return (
      <IceContainer style={styles.container}>
        <div style={styles.head}>
          <img
            src={require('./images/TB1ya6gh0zJ8KJjSspkXXbF7VXa-156-156.png')}
            style={styles.img}
            alt=""
          />
          <h3 style={styles.title}>提交成功</h3>
        </div>
        <p style={styles.summary}>本文字区域可以展示简单的说明</p>
        <p style={styles.descrpiton}>
          如果有跟多细节需要展示，可以补充在下面这里，一些相关的介绍和描述
        </p>
        <Step current={current} shape={type} style={styles.step}>
          {value.map((item, index) => {
            return <Step.Item key={index} title={item} />;
          })}
        </Step>
        <div style={styles.buttons}>
          <Button
            type="normal"
            onClick={this.handleBackClick}
            style={{ marginRight: '6px' }}
          >
            返回首页
          </Button>
          <Button type="primary" onClick={this.handleLinkClick}>
            查看更多
          </Button>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '80px 40px',
    textAlign: 'center',
  },
  img: {
    Width: '58px',
    height: '58px',
  },
  title: {
    margin: '20px 0',
    fontSize: '22px',
    fontWeight: 'normal',
  },
  summary: {
    margin: '0',
    fontSize: '14px',
    color: '#666',
  },
  descrpiton: {
    margin: '10px 0 0',
    fontSize: '14px',
    color: '#666',
  },
  step: {
    margin: '80px 0',
  },
};
