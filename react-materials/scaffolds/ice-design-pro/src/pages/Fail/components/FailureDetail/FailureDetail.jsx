import React, { PureComponent } from 'react';
import { Button, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class FailureDetail extends PureComponent {
  handleChange = () => {
    Message.success('可以根据实际需求自定义返回修改');
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.head}>
          <img
            style={styles.img}
            src={require('./images/TB1LUMhhY_I8KJjy1XaXXbsxpXa-156-156.png')}
            alt=""
          />
          <h3 style={styles.title}>提交失败</h3>
        </div>
        <p style={styles.summary}>提供信息不符合要求，请重新提交</p>
        <p style={styles.descrpiton}>
          如果有更多细节需要展示，可以补充在这里，一些相关的介绍和描述
        </p>
        <Button type="primary" onClick={this.handleChange}>
          返回修改
        </Button>
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
    width: '58px',
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
    margin: '10px 0 80px',
    fontSize: '14px',
    color: '#666',
  },
};
