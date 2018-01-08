/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Dialog, Tab, Table } from '@icedesign/base';
import './TabDialog.scss';

const TabPane = Tab.TabPane;

const mockData = [
  {
    title: '十九大后，习近平对中国经济给出8大论断',
    id: '1212',
  },
  {
    title: '中驻美使馆:美《国家安全战略报告》自相矛盾',
    id: '231',
  },
  {
    title: '美发国安战略:坚持"一中政策" 继续对台军售',
    id: '2321',
  },
  {
    title: '又一"港独"组织濒于溃散:召集人潜逃 发言人退伙',
    id: '22331',
  },
];

export default class TabDialog extends Component {
  static displayName = 'TabDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      selectedItems: props.selectedItems || [],
    };
  }

  onItemSelect = (selectedItems) => {
    this.setState({
      selectedItems,
    });
  };

  onTabChange = () => {
    // 清理掉缓存数据
    this.setState({
      selectedItems: [],
    });
  };

  onDialogOk = () => {
    this.props.onOk && this.props.onOk(this.state.selectedItems);
  };

  render() {
    return (
      <Dialog
        className="tab-dialog"
        style={styles.dialog}
        autoFocus={false}
        isFullScreen
        title="选择信息"
        {...this.props}
        onOk={this.onDialogOk}
        visible={this.state.visible}
      >
        <div style={styles.dialogContent}>
          <Tab
            size="small"
            contentStyle={styles.tabContentWrapper}
            onChange={this.onTabChange}
          >
            <TabPane tab="选择文章" key="post">
              <div style={styles.tabContent}>
                <Table
                  dataSource={mockData}
                  rowSelection={{
                    selectedRowKeys: this.state.selectedItems,
                    onChange: this.onItemSelect,
                  }}
                >
                  <Table.Column title="文章标题" dataIndex="title" />
                </Table>
              </div>
            </TabPane>
            <TabPane tab="选择视频" key="video">
              <div style={styles.tabContent}>
                <Table
                  dataSource={mockData}
                  rowSelection={{
                    selectedRowKeys: this.state.selectedItems,
                    onChange: this.onItemSelect,
                  }}
                >
                  <Table.Column title="视频标题" dataIndex="title" />
                </Table>
              </div>
            </TabPane>
          </Tab>
        </div>
      </Dialog>
    );
  }
}

const styles = {
  dialog: {
    width: '640px',
  },
  dialogContent: {},
  tabContentWrapper: {
    padding: '20px 0 20px 0',
  },
  tabContent: {
    display: 'flex',
    minHeight: '100px',
    fontSize: '20px',
  },
};

