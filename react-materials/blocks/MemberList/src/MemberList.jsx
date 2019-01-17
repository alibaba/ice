import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@alifd/next';
import ContainerTitle from './ContainerTitle';

export default class MemberList extends Component {
  static displayName = 'MemberList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProfile = (value, index, record) => {
    return (
      <div style={styles.profile}>
        <img src={record.avatar} alt="" style={styles.avatar} />
        <span style={styles.name}>{record.name}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div>
        <a style={{ ...styles.link, ...styles.edit }}>修改</a>
        <a style={{ ...styles.link, ...styles.delete }}>删除</a>
      </div>
    );
  };

  render() {
    const dataSource = [
      {
        avatar: require('./images/avatar.jpg'),
        name: '淘小宝',
        email: 'ice-admin@alibaba-inc.com',
        role: 'owner',
      },
      {
        avatar: require('./images/avatar.jpg'),
        name: '宝码',
        email: 'ice-admin@alibaba-inc.com',
        role: 'member',
      },
    ];

    return (
      <IceContainer style={styles.container}>
        <ContainerTitle
          title="项目成员"
          buttonText="添加成员"
          style={styles.title}
        />
        <Table dataSource={dataSource} hasHeader={false} hasBorder={false}>
          <Table.Column dataIndex="name" cell={this.renderProfile} />
          <Table.Column dataIndex="email" />
          <Table.Column dataIndex="role" />
          <Table.Column cell={this.renderOper} />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  title: {
    borderBottom: '0',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '24px',
    height: '24px',
    border: '1px solid #eee',
    background: '#eee',
    borderRadius: '50px',
  },
  name: {
    marginLeft: '15px',
    color: '#314659',
    fontSize: '14px',
  },
  link: {
    cursor: 'pointer',
    color: '#1890ff',
  },
  edit: {
    marginRight: '5px',
  },
};
