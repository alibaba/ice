import React, { Component } from 'react';
import { Button, Feedback } from '@icedesign/base';

export default class ServiceHead extends Component {
  static displayName = 'ServiceHead';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    Feedback.toast.success('已展示所有数据');
  };

  render() {
    return (
      <div style={styles.head}>
        <Button
          size="large"
          style={{ marginRight: '10px' }}
          onClick={this.handleClick}
        >
          服务管理
        </Button>
        <Button size="large" type="primary" onClick={this.handleClick}>
          授权管理
        </Button>
      </div>
    );
  }
}

const styles = {
  head: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
