/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Icon, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import IceLabel from '@icedesign/label';

import EditorInfoDialog from './EditorInfoDialog';

function mockList() {
  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return Array.from({ length: 10 }).map((i, index) => {
    return {
      id: index + 1,
      cover: random([
        '//img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg',
        '//img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg',
        '//img.alicdn.com/bao/uploaded/i7/TB1QpMvk3n.PuJjSZFkYXI_lpXa_M2.SS2_100x100.jpg',
      ]),
      title: random([
        '于momo2017秋冬新款背带裙复古格子连衣裙清新背心裙a字裙短裙子',
        '日式天然玉米皮草编碗垫锅垫隔热垫茶垫加厚餐垫GD-29',
        '日碗垫锅垫隔热垫茶垫加厚',
      ]),
      url: 'https://item.taobao.com/item.htm?id=558559528377',
      type: random(['清单', '帖子', '搭配']),
      publishTime: '17-04-28 20:29:20',
      publishStatus: random(['已发布', '未发布']),
      pushStatus: '已推送至订阅号',
      operation: {
        edit: true,
      },
    };
  });
}

export default class OperationTable extends Component {
  static displayName = 'OperationTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tableData: {
        total: 100,
        pageSize: 10,
        currentPage: 1,
        list: [],
        __loading: true,
      },
    };
  }

  componentDidMount() {
    this.fetchData({
      page: 1,
    });
  }

  fetchData = ({ page }) => {
    const tableData = this.state.tableData;
    tableData.currentPage = page;
    tableData.__loading = true;

    // 模拟请求 500 毫秒的效果，实际使用中只需要在请求完成后设置值即可
    this.setState({ tableData: tableData }, () => {
      setTimeout(() => {
        tableData.__loading = false;
        tableData.list = mockList();
        this.setState({ tableData: tableData });
      }, 500);
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
        console.log(value);
        Message.success('更新成功');
        EditorInfoDialog.hide();
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
    this.fetchData({ page: currentPage });
  };

  render() {
    const tableData = this.state.tableData;

    return (
      <div className="operation-table">
        <IceContainer style={styles.cardContainer}>
          <Table
            dataSource={tableData.list}
            loading={tableData.__loading}
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
