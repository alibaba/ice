import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import ContainerTitle from '../../../../components/ContainerTitle';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const AVATARS = [
  'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
  'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
  'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
  'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
];

// MOCK 数据，实际业务按需进行替换
const getData = (length = 10) => {
  return Array.from({ length }).map(() => {
    return {
      id: random(10000, 100000),
      avatar: AVATARS[random(0, 3)],
      name: ['淘小宝', '淘二宝'][random(0, 1)],
      email: 'admin@example.com',
      joinTime: `20${random(10, 20)}-0${random(1, 9)}-12`,
      address: ['杭州市', '上海市', '北京市'][random(0, 2)],
      role: ['设计师', '运营', '产品', '开发'][random(0, 3)],
    };
  });
};

@withRouter
export default class Employee extends Component {
  state = {
    data: getData(),
  };

  handleRedirect = () => {
    this.props.history.push('/add/employee');
  };

  handleDelete = (index) => {
    Dialog.confirm({
      title: '提示',
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
        <Button
          type="primary"
          onClick={this.handleRedirect}
          style={{ marginRight: '10px' }}
        >
          修改
        </Button>
        <Button
          onClick={() => this.handleDelete(value)}
          type="normal"
          warning
        >
          删除
        </Button>
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <IceContainer style={styles.container}>
        <ContainerTitle
          title="员工列表"
          buttonText="添加员工"
          style={styles.title}
          onClick={this.handleRedirect}
        />
        <Table dataSource={data} hasBorder={false} style={{ padding: '20px' }}>
          <Table.Column dataIndex="id" title="工号" />
          <Table.Column
            dataIndex="name"
            title="姓名"
            cell={this.renderProfile}
          />
          <Table.Column dataIndex="address" title="住址" />
          <Table.Column dataIndex="email" title="邮箱" />
          <Table.Column dataIndex="role" title="职位" />
          <Table.Column dataIndex="joinTime" title="入职时间" />
          <Table.Column dataIndex="id" title="操作" cell={this.renderOper} />
        </Table>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '0',
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
