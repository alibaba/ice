import React, { Component } from 'react';
import { Button, Table, Pagination } from '@icedesign/base';

const mockData = [
  {
    number: '沪执77号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执78号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执79号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执80号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执81号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执82号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执83号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }, {
    number: '沪执84号',
    reason: '拆迁',
    date: '2018-10-10',
    holder: '农商银行',
    department: '执行局'
  }
];

export default class DismantlingTable extends Component {
  static displayName = 'DismantlingTable';

  constructor(props) {
    super(props);
    this.state = {
      rowSelection: {
        onChange: this.onTableChange.bind(this),
        onSelect: function(selected, record, records) {
          console.log("onSelect", selected, record, records);
        },
        onSelectAll: function(selected, records) {
          console.log("onSelectAll", selected, records);
        },
        selectedRowKeys: [],
        mode: 'single'
      },
      current: 2
    };
  }

  onTableChange = (ids, records) => {
    let { rowSelection } = this.state;
    rowSelection.selectedRowKeys = ids;
    console.log("onChange", ids, records);
    this.setState({ rowSelection });
  };

  onPageChange = (current) => {
    this.setState({
      current
    });
  };

  render() {

    return (
      <div style={styles.container}>
        <div>
          <Button size="small" style={styles.button}>
            编辑
          </Button>
          <Button size="small" style={styles.button}>
            补正
          </Button>
          <Button size="small" style={styles.button}>
            材料退回
          </Button>
          <Button size="small" style={styles.button}>
            申请人主动撤回
          </Button>
          <Button size="small" style={styles.button}>
            立案前化解
          </Button>
          <Button size="small" style={styles.button}>
            发送办理
          </Button>
          <Button size="small" style={styles.button}>
            删除
          </Button>
        </div>
        <Table
          dataSource={mockData}
          rowSelection={this.state.rowSelection}
          primaryKey="number"
          style={styles.table}
        >
          <Table.Column align="center" title="案号" dataIndex="number" />
          <Table.Column align="center" title="案由" dataIndex="reason" />
          <Table.Column align="center" title="立案日期" dataIndex="date" />
          <Table.Column align="center" title="立案人" dataIndex="holder" />
          <Table.Column align="center" title="承办部门" dataIndex="department" />
        </Table>
        <div style={styles.pagination}>
          <Pagination
            current={this.state.current}
            onChange={this.onPageChange}
            size="small"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '0 20px',
    letterSpacing: '2px'
  },
  button: {
    background: 'linear-gradient(90deg, #006fff 25%, #fff 150%)',
    color: 'white',
    margin: '0 8px',
    padding: '0 16px',
    letterSpacing: '2px'
  },
  table: {
    margin: '20px 0'
  },
  pagination: {
    textAlign: 'center',
    marginBottom: '200px'
  }
};
