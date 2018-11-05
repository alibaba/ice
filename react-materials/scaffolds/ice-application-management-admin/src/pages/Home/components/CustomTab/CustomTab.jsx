import React, { Component } from 'react';
import { Grid, Tab } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import CustomTable from '../CustomTable';
import './CustomTab.scss';

const { Row, Col } = Grid;
const TabPane = Tab.TabPane;

const navs = [
  {
    number: '20',
    time: '即可交付',
  },
  {
    number: '1000',
    time: '7天交付',
  },
  {
    number: '5000',
    time: '30天交付',
  },
];

const dataSource = (() => {
  return Array.from({ length: 8 }).map((item, index) => {
    return {
      name: '淘宝',
      version: '0.0.1',
      download: `234,${index}38`,
      unit: '- -',
      amount: `982,${index}`,
    };
  });
})();

const columns = [
  {
    title: '应用名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '应用版本',
    key: 'version',
    dataIndex: 'version',
  },
  {
    title: '下载次数',
    key: 'download',
    dataIndex: 'download',
  },
  {
    title: '可借用单元',
    key: 'unit',
    dataIndex: 'unit',
  },
  {
    title: '可借用数量',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: '操作',
    key: 'oper',
    dataIndex: 'oper',
    cell: () => <div style={styles.operButton}>借</div>,
  },
];

const tabs = [
  {
    tab: '去借用',
    key: '1',
    content: <CustomTable columns={columns} dataSource={dataSource} />,
  },
  { tab: '去转移', key: '2', content: '暂无数据' },
  { tab: '去追加', key: '3', content: '暂无数据' },
];

export default class CustomTab extends Component {
  static displayName = 'CustomTab';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <Row wrap gutter="20">
          {navs.map((nav, index) => {
            const active = index === 0 ? styles.navItemActive : {};
            return (
              <Col l="8" key={index}>
                <div style={{ ...styles.navItem, ...active }}>
                  <span style={styles.levelNumber}>{nav.number}台</span>
                  <span style={styles.levelSuffix}>以内</span>
                  <span style={styles.levelTime}>{nav.time}</span>
                </div>
              </Col>
            );
          })}
        </Row>
        <Tab
          size="small"
          type="capsule"
          className="custom-tab"
          style={{ oadding: 0 }}
        >
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} tab={item.tab}>
                {item.content}
              </TabPane>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  navItem: {
    height: '60px',
    lineHeight: '60px',
    borderRadius: '4px',
    border: '1px solid #d2d4d7',
    textAlign: 'center',
    color: '#546970',
    fontWeight: '600',
    cursor: 'pointer',
  },
  navItemActive: {
    background: '#09f',
    color: '#fff',
  },
  levelNumber: {
    fontSize: '20px',
  },
  levelSuffix: {
    fontSize: '14px',
  },
  levelTime: {
    fontSize: '20px',
    paddingLeft: '20px',
  },
  operButton: {
    background: '#a683eb',
    width: '32px',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    borderRadius: '50px',
    color: '#fff',
  },
};
