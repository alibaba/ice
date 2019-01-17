import React, { Component } from 'react';
import Container from '@icedesign/container';

import StateItem from './StateItem';

export default class AccountStatus extends Component {
  static displayName = 'AccountStatus';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          icon: require('./images/star.png'),
          title: '官方账号',
          desc: '淘宝内部官方账号，请勿申请',
          status: '认证通过',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontSize: 16 }}>我的角色</h2>
          <span style={{ fontSize: 12, color: '#999', paddingLeft: 20 }}>
            角色认证通过后，角色标识及认证信息将显示在账号主页，拥有个性化的玩法，如渠道快速合作等
          </span>
        </div>
        <div style={styles.body}>
          {this.state.dataSource.map((item, index) => {
            return <StateItem data={item} key={index} />;
          })}
        </div>
      </Container>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
  },
};
