import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Table, Pagination, Progress, Button } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';

import './ComplexProgressTable.scss';
import EditDialog from './EditDialog';

// 详细用法请参见 http://ice.alibaba-inc.com/modules/ice-data-binder
@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/complex-progress-table.json',
    params: {
      page: 1
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1
    }
  },
  updateRow: {
    url: '/your-update-api.json'
  }
})
export default class ComplexProgressTable extends Component {
  static displayName = 'ComplexProgressTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 缓存 table 的请求参数
    this.queryCache = {};
    this.state = {};
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {}

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      data: this.queryCache
    });
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  renderTitle = (value, index, record) => {
    return (
      <div>
        <div style={styles.title}>{record.title}</div>
        <div style={styles.subTitle}>创建时间 {record.createTime}</div>
      </div>
    );
  };

  editItem = (index, record) => {
    EditDialog.show({
      onClose: () => {
        EditDialog.hide();
      },
      onCancel: () => {
        EditDialog.hide();
      },
      onOk: (value) => {
        // 获取修改后的数据，更新表格
        // todo 更新接口，并重新刷新数据
        // this.props.updateBindingData('updateRow', {
        //   method: 'post',
        //   data: value
        // }, () => {
        //   this.fetchData();
        // });
        console.log('value', value);
        EditDialog.hide();
      },
      value: record
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div style={styles.operations}>
        <Button
          style={styles.operationButton}
          onClick={() => this.editItem(index, record)}
          shape="text"
        >
          编辑
        </Button>
        <Button style={styles.operationButton} shape="text">
          删除
        </Button>
      </div>
    );
  };

  renderProgress = (value) => {
    return <Progress percent={value} />;
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="complex-progress-table">
        <IceCard style={styles.tableCard}>
          <Table
            dataSource={tableData.list}
            isLoading={
              tableData.__loading
            } /* eslint no-underscore-dangle: "off" */
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="问题描述"
              cell={this.renderTitle}
              width={320}
            />
            <Table.Column
              title="完成进度"
              dataIndex="progress"
              width={230}
              cell={this.renderProgress}
            />
            <Table.Column
              title="优先级"
              dataIndex="priority"
              width={60}
              style={styles.priority}
            />
            <Table.Column
              title="操作"
              width={100}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  tableCard: { padding: '10px' },
  title: {},
  subTitle: { marginTop: '4px', fontSize: '12px', color: '#999999' },
  operationButton: { marginRight: '10px' },
  priority: { width: '70px', textAlign: 'center' },
  complexProgressTable: {},
  operations: { lineHeight: '28px' },
  pagination: { textAlign: 'right', paddingTop: '26px' }
};
