import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import ContainerTitle from '../../../../components/ContainerTitle';
import mockData from './data';

@withRouter
export default class MemberList extends Component {
  state = {
    data: mockData,
  };

  handleAdd = () => {
    this.props.history.push('/invite/add');
  };

  handleDelete = (index) => {
    Dialog.confirm({
      content: '确认删除吗',
      onOk: () => {
        const { data } = this.state;

        data.splice(index, index + 1);
        this.setState({
          data,
        });
      },
    });
  };

  renderProfile = (value, index, record) => {
    return (
      <div style={styles.profile}>
        <img src={record.avatar} alt="" style={styles.avatar} />
        <span style={styles.name}>{record.name}</span>
      </div>
    );
  };

  renderOper = (value) => {
    return (
      <div>
        <Link to="/invite/add" style={{ ...styles.link, ...styles.edit }}>
          修改
        </Link>
        <a
          onClick={() => this.handleDelete(value)}
          style={{ ...styles.link, ...styles.delete }}
        >
          删除
        </a>
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <IceContainer style={styles.container}>
        <ContainerTitle
          title="邀请列表"
          buttonText="新增成员"
          style={styles.title}
          onClick={this.handleAdd}
        />
        <Table dataSource={data} hasHeader={false} hasBorder={false}>
          <Table.Column dataIndex="name" cell={this.renderProfile} />
          <Table.Column dataIndex="email" />
          <Table.Column dataIndex="role" />
          <Table.Column dataIndex="id" cell={this.renderOper} />
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
    color: '#666',
    fontSize: '14px',
  },
  link: {
    cursor: 'pointer',
    color: '#447eff',
  },
  edit: {
    marginRight: '5px',
  },
};
