import React, { PureComponent } from 'react';
import { Button, Message } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
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
          <h3 style={styles.title}>
            <FormattedMessage id="app.result.fail.title" />
          </h3>
        </div>
        <p style={styles.summary}>
          <FormattedMessage id="app.result.fail.summary" />
        </p>
        <p style={styles.descrpiton}>
          <FormattedMessage id="app.result.fail.description" />
        </p>
        <Button type="primary" onClick={this.handleChange}>
          <FormattedMessage id="app.result.fail.back" />
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
