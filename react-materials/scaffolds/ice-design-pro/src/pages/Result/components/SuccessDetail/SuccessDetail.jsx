import React, { PureComponent } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Step, Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

@withRouter
@injectIntl
class SuccessDetail extends PureComponent {
  handleBackClick = () => {
    this.props.history.push('/');
  };

  handleLinkClick = () => {
    Message.success('可以根据实际需求自定义查看更多');
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    const setpConfig = {
      value: [
        formatMessage({ id: 'app.result.success.step1.title' }),
        formatMessage({ id: 'app.result.success.step2.title' }),
        formatMessage({ id: 'app.result.success.step3.title' }),
        formatMessage({ id: 'app.result.success.step4.title' }),
      ],
      current: 1, // 当前步骤
      type: 'dot', // 步骤的类型，可选值: 'circle', 'arrow', 'dot'
    };
    const { value, current, type } = setpConfig;
    return (
      <IceContainer style={styles.container}>
        <div style={styles.head}>
          <img
            src={require('./images/TB1ya6gh0zJ8KJjSspkXXbF7VXa-156-156.png')}
            style={styles.img}
            alt=""
          />
          <h3 style={styles.title}>
            <FormattedMessage id="app.result.success.title" />
          </h3>
        </div>
        <p style={styles.summary}>
          <FormattedMessage id="app.result.success.summary" />
        </p>
        <p style={styles.descrpiton}>
          <FormattedMessage id="app.result.success.description" />
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
            <FormattedMessage id="app.result.success.back.btn1" />
          </Button>
          <Button type="primary" onClick={this.handleLinkClick}>
            <FormattedMessage id="app.result.success.back.btn2" />
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

export default SuccessDetail;
