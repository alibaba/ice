

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './OperationTable.scss';

import { Table, Pagination, Button, Icon } from '@icedesign/base';

import IceCard from '@icedesign/card';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import EditorInfoDialog from './EditorInfoDialog';

// 详细用法请参见 http://ice.alibaba-inc.com/modules/ice-data-binder
@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/operation-table-list.json',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
  updateTableData: {
    url: '/mock/update-table-item.json',
  },
})
export default class OperationTable extends Component {
  static displayName = 'OperationTable';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {}

  componentDidMount() {
    this.fetchData({
      page: 1,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}

  fetchData = ({ page }) => {
    this.props.updateBindingData('tableData', {
      data: {
        page,
      },
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div
        style={styles.todo0}
      >
        <div>
          <IceImg src={record.cover} width={48} height={48} />
        </div>
        <span
          style={styles.todo1}
        >
          {record.title}
        </span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    EditorInfoDialog.show({
      value: record,
      onOk: (value) => {
        console.log('value', value);
        // todo send to api
        this.props.updateBindingData(
          'updateTableData',
          {
            params: {
              // 复杂数据结构需要 JSON stringify
              newItem: JSON.stringify(value),
            },
          },
          () => {
            // 更新完成之后，可以重新刷新列表接口
            this.props.updateBindingData('tableData', {
              data: {
                page: 1,
              },
            });
            EditorInfoDialog.hide();
          }
        );
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div className="operation-table-operation" style={styles.operationTableOperation}>
        <span
          onClick={this.editItem.bind(this, record)}
          title="编辑"
          className="operation-table-operation-item"
          style={styles.operationTableOperationItem}
        >
          <Icon size="xs" type="edit" />
        </span>
        <span title="删除" className="operation-table-operation-item" style={styles.operationTableOperationItem}>
          <Icon size="xs" type="close" />
        </span>
        <span title="收藏" className="operation-table-operation-item" style={styles.operationTableOperationItem}>
          <Icon size="xs" type="favorites-filling" />
        </span>
      </div>
    );
  };

  renderStatus = (value, index, record) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="operation-table" style={styles.operationTable}>
        <IceCard style={styles.todo2}>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="问题描述"
              cell={this.renderTitle}
              width={320}
            />
            <Table.Column title="问题分类" dataIndex="type" width={85} />
            <Table.Column
              title="发布时间"
              dataIndex="publishTime"
              width={150}
            />
            <Table.Column
              title="状态"
              dataIndex="publishStatus"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
          <div
            style={styles.todo3}
          >
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

const styles = { operationTableOperation: { 'a {MarginRight': '12px', textDecoration: 'none' }, operationTableOperationItem: { display: 'inline-block', width: '24px', height: '24px', borderRadius: '999px', color: '#929292', background: '#f2f2f2', textAlign: 'center', cursor: 'pointer', lineHeight: '24px', marginRight: '6px', transition: 'all ease 0' }, operationTable: {}, todo0: { display: 'flex', flexDirection: 'row' }, todo1: { marginLeft: '10px', lineHeight: '20px' }, todo2: { padding: '10px 10px 20px 10px' }, todo3: { textAlign: 'right', paddingTop: '26px' } };
