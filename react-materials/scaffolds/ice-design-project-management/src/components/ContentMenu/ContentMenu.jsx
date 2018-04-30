import React, { Component } from 'react';
import { Menu, Input, Dropdown, Icon } from '@icedesign/base';
import './ContentMenu.scss';

export default class ContentMenu extends Component {
  static displayName = 'ContentMenu';

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['1', '2', '3'],
    };
  }

  handleOpen = (openKeys) => {
    this.setState({
      openKeys,
    });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>任务</h3>
          <div style={styles.more}>
            <Dropdown
              triggerType="click"
              trigger={<Icon type="add" size="small" style={styles.addIcon} />}
            >
              <Menu>
                <Menu.Item>添加任务</Menu.Item>
                <Menu.Item>添加项目</Menu.Item>
                <Menu.Item>添加成员</Menu.Item>
                <Menu.Item>添加文件</Menu.Item>
              </Menu>
            </Dropdown>
          </div>
        </div>
        <div style={styles.searchArea}>
          <Icon type="search" size="xs" style={styles.searchIcon} />
          <Input
            style={styles.searchInput}
            size="large"
            placeholder="搜索任务"
          />
        </div>
        <Menu
          onOpen={this.handleOpen}
          style={styles.menu}
          className="content-menu"
          openKeys={this.state.openKeys}
        >
          <Menu.SubMenu label="工作台" key="1">
            <Menu.Item key="1">
              我的任务
              <span style={styles.taskCount}>8</span>
            </Menu.Item>
            <Menu.Item key="2">我参与的任务</Menu.Item>
            <Menu.Item key="3">任务日历</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu label="项目" key="2">
            <Menu.Item key="4">示例项目</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu label="统计分析" key="3">
            <Menu.Item key="5">企业任务概况</Menu.Item>
            <Menu.Item key="6">企业任务周报</Menu.Item>
            <Menu.Item key="7">项目进度统计</Menu.Item>
            <Menu.Item key="8">成员进度统计</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fff',
    borderRight: '1px solid #ddd',
  },
  menu: {
    width: '240px',
    boxShadow: 'none',
  },
  header: {
    position: 'relative',
    padding: '0 20px',
  },
  title: {
    margin: '15px 0',
    fontWeight: '500',
  },
  more: {
    position: 'absolute',
    right: '20px',
    top: '0px',
    cursor: 'pointer',
  },
  addIcon: {
    color: '#ddd',
  },
  searchArea: {
    position: 'relative',
    textAlign: 'center',
  },
  searchInput: {
    width: '200px',
    height: '36px',
    lineHeight: '36px',
    borderRadius: '50px',
    background: '#f3f3f3',
    border: '0px',
    paddingLeft: '16px',
  },
  searchIcon: {
    position: 'absolute',
    left: '30px',
    top: '10px',
    color: '#8f8f8f',
  },
  taskCount: {
    background: '#ff5b57',
    color: '#fff',
    position: 'absolute',
    top: '7px',
    right: '16px',
    height: '16px',
    lineHeight: '16px',
    minWidth: '22px',
    textAlign: 'center',
    borderRadius: '14px',
  },
};
