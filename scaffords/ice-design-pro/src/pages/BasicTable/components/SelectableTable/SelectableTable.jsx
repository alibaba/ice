/* eslint no-plusplus: 0 */
import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';

import './SelectableTable.scss';

const getMockData = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      id: 100306660940 + i,
      title: {
        name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      },
      type: 'demo示例',
      template: '参数字典列表',
      status: '已发布',
      publisher: '小马',
      rate: '5',
      time: 2000 + i,
    });
  }
  return result;
};

// 注意：下载数据的功能，强烈推荐通过接口实现数据输出，并下载
// 因为这样可以有下载鉴权和日志记录，包括当前能不能下载，以及谁下载了什么

export default class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
      // 支持针对特殊行进行定制
      getProps: (record) => {
        return {
          disabled: record.id === 100306660941,
        };
      },
    };

    this.state = {
      selectedRowKeys: [],
      dataSource: getMockData(),
    };
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  addMoreItem = () => {
    // todo add some item
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
    // todo delete selectedRowKeys
    console.log('delete keys', selectedRowKeys);
  };

  deleteItem = (record) => {
    // todo remove this record
    const { id } = record;
    console.log('delete item', id);
  };

  renderOperator = (value, index, record) => {
    return (
      <div>
        <a>编辑</a>
        <a
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </a>
      </div>
    );
  };

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.iceCard}>
          <div>
            <Button
              onClick={this.addMoreItem}
              size="small"
              className="batch-btn"
              style={styles.batchBtn}
            >
              <Icon type="add" />增加
            </Button>
            <Button
              onClick={this.deleteSelectedKeys}
              size="small"
              className="batch-btn"
              style={styles.batchBtn}
              disabled={!this.state.selectedRowKeys.length}
            >
              <Icon type="ashbin" />删除
            </Button>
            <Button
              onClick={this.clearSelectedKeys}
              size="small"
              className="batch-btn"
              style={styles.batchBtn}
            >
              <Icon type="close" />清空选中
            </Button>
          </div>
          <div>
            <a href="/" download>
              <Icon size="small" type="download" /> 导出表格数据到 .csv 文件
            </a>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.dataSource}
            isLoading={this.state.isLoading}
            rowSelection={{
              ...this.rowSelection,
              selectedRowKeys: this.state.selectedRowKeys,
            }}
          >
            <Table.Column title="编码" dataIndex="id" lock width={120} />
            <Table.Column title="名称" dataIndex="title.name" width={350} />
            <Table.Column title="类型" dataIndex="type" width={160} />
            <Table.Column title="模板" dataIndex="template" width={160} />
            <Table.Column title="发布状态" dataIndex="status" width={120} />
            <Table.Column title="评分" dataIndex="rate" width={120} />
            <Table.Column title="操作者" dataIndex="publisher" width={120} />
            <Table.Column title="修改时间" dataIndex="time" width={120} />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              width={120}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination onChange={this.change} />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  selectableTable: {
    width: '960px',
  },
  batchBtn: {
    marginRight: '10px',
  },
  iceCard: {
    marginBottom: '20px',
    minHeight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
