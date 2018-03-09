/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Icon } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import EditorInfoDialog from './EditorInfoDialog';

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

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData({
      page: 1,
    });
  }

  fetchData = ({ page }) => {
    this.props.updateBindingData('tableData', {
      data: {
        page,
      },
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleCol}>
        <div>
          <IceImg src={record.cover} width={48} height={48} />
        </div>
        <span style={styles.titleText}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    EditorInfoDialog.show({
      value: record,
      onOk: (value) => {
        // 更新数据
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
      <div className="operation-table-operation" style={styles.operationTable}>
        <span
          onClick={this.editItem.bind(this, record)}
          title="编辑"
          style={styles.operBtn}
        >
          <Icon size="xs" type="edit" />
        </span>
        <span title="删除" style={styles.operBtn}>
          <Icon size="xs" type="close" />
        </span>
        <span title="收藏" style={styles.operBtn}>
          <Icon size="xs" type="favorites-filling" />
        </span>
      </div>
    );
  };

  renderStatus = (value) => {
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
      <div className="operation-table">
        <IceContainer style={styles.cardContainer}>
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
          <div style={styles.paginationContainer}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  cardContainer: {
    padding: '10px 10px 20px 10px',
  },
  titleCol: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleText: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  operBtn: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '999px',
    color: '#929292',
    background: '#f2f2f2',
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: '24px',
    marginRight: '6px',
  },
  paginationContainer: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
