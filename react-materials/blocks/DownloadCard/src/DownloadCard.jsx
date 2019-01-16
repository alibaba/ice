import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Icon, Grid } from '@alifd/next';
import data from './data';
import './DownloadCard.scss';

const { Row, Col } = Grid;
const { Item } = Tab;

export default class DownloadCard extends Component {
  static displayName = 'DownloadCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabData: data,
    };
  }

  renderContent = (items) => {
    return items.map((item, index) => {
      return (
        <Col key={index}>
          <div key={index} style={styles.columnCardItem}>
            <div style={styles.cardBody}>
              <div style={styles.avatarWrapper}>
                <img style={styles.img} src={item.img} alt="头像" />
              </div>
              <p style={styles.title}>{item.title}</p>
              <p style={styles.desc}>{item.desc}</p>
            </div>

            <div style={styles.downloadButtons}>
              <Button
                href={item.androidSDK}
                download
                style={styles.leftButton}
                type="primary"
              >
                <Icon type="download" /> Android SDK
              </Button>
              <Button
                href={item.iosSDK}
                download
                style={styles.rightButton}
                type="primary"
              >
                <Icon type="download" /> IOS SDK
              </Button>
            </div>

            <div style={styles.cardBottom}>
              <a href={item.version} style={styles.bottomText}>
                版本记录
              </a>
              <a href={item.docs} style={styles.bottomText}>
                集成文档
              </a>
              <a href={item.guide} style={styles.bottomText}>
                使用指南
              </a>
              <a href={item.faq} style={styles.bottomText}>
                FAQ
              </a>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div className="download-card" style={styles.downloadCard}>
        <IceContainer>
          <Tab contentStyle={{ padding: '20px 5px' }}>
            <Tab.Item title="客户端SDK" key="1">
              <Row gutter="20" wrap>
                {tabData.clientSDK
                  ? this.renderContent(tabData.clientSDK)
                  : '暂无数据'}
              </Row>
            </Tab.Item>
            <Tab.Item title="服务端SDK" key="2">
              <Row gutter="20" wrap>
                {tabData.serverSDK
                  ? this.renderContent(tabData.serverSDK)
                  : '暂无数据'}
              </Row>
            </Tab.Item>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  columnCardItem: {
    marginBottom: 20,
    position: 'relative',
    float: 'left',
    width: '100%',
    minWidth: '284px',
    // height: '280px',
    padding: '0px',
    overflow: 'hidden',
    boxShadow:
      '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  },
  cardBody: {
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #dedede',
  },
  avatarWrapper: {
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    margin: '0 auto',
  },
  title: {
    fontSize: '20px',
    margin: '10px',
  },
  desc: {
    fontSize: '15px',
    color: '#999',
  },
  downloadButtons: {
    margin: '15px 0',
    textAlign: 'center',
  },
  rightButton: {
    width: '114px',
    fontSize: '13px',
    marginLeft: '10px',
  },
  leftButton: {
    width: '114px',
    fontSize: '13px',
  },
  cardBottom: {
    padding: '10px 10px',
    background: '#f6f7f9',
  },
  bottomText: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#666',
    textDecoration: 'none',
  },
  img: {
    width: '100%',
  },
};
