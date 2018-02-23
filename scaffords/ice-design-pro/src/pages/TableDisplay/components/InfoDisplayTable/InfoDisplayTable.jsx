import React, { Component } from 'react';
import { Table } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';

/**
 * 表格接收的数据
 */
const dataSource = () => {
  return [
    {
      label: '姓名',
      value: '张三',
    },
    {
      label: '性别',
      value: '男',
    },
    {
      label: '年龄',
      value: '25',
    },
    {
      label: '籍贯',
      value: '杭州',
    },
    {
      label: '职业',
      value: '程序员',
    },
  ];
};

export default class InfoDisplayTable extends Component {
  static displayName = 'InfoDisplayTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="info-display-table" style={styles.infoDisplayTable}>
        <IceContainer>
          <Table dataSource={dataSource()}>
            <Table.Column title="个人信息" dataIndex="label" />
            <Table.Column title="" dataIndex="value" />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = { infoDisplayTable: {} };
