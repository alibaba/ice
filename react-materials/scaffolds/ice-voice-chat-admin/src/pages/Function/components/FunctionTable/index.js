import React, { Component } from 'react';
import { Input, Table } from '@alifd/next';

export default class FunctionTable extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div style={styles.head}>
          <div style={styles.info}>
            <h2 style={styles.title}>本项目共包含 {data.length} 个函数</h2>
            <p style={styles.intro}>
              函数是定义对话回复逻辑的一种方式。成功上传的函数后，在项目发布时开始生效。
            </p>
          </div>
          <Input
            style={{ width: '300px' }}
            placeholder="请输入函数名称或者函数描述"
          />
        </div>
        <Table hasBorder={false} dataSource={data}>
          <Table.Column title="函数名" dataIndex="name" />
          <Table.Column title="描述" dataIndex="desc" />
          <Table.Column title="语言类型" dataIndex="language" />
          <Table.Column title="关联技能" dataIndex="skill" />
          <Table.Column title="发布状态" dataIndex="status" />
        </Table>
      </div>
    );
  }
}

const styles = {
  head: {
    fontWeight: '400',
    color: '#333333',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    lineHeight: '30px',
    fontSize: '20px',
    margin: '0',
    fontWeight: '400',
  },
  intro: {
    lineHeight: '21px',
    fontSize: '14px',
    margin: '0',
    color: '#888888',
  },
};
