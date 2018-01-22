import React, { Component } from 'react';
import IceCard from '@icedesign/container';
import axios from 'axios';
import { Tab, Button, Icon } from '@icedesign/base';
import './DownloadCard.scss';

const { TabPane } = Tab;

export default class DownloadCard extends Component {
  static displayName = 'DownloadCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      tabData: {},
    };
  }

  /**
   * 异步获取数据
   */
  getData = () => {
    axios
      .get('/mock/download-card.json')
      .then((response) => {
        this.setState({
          tabData: response.data.data || {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getData();
  }

  renderContent = (data) => {
    return data.map((item, index) => {
      return (
        <div
          key={index}
          className="column-card-item"
          style={styles.columnCardItem}
        >
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
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div style={styles.downloadCard}>
        <IceCard>
          <Tab type="bar">
            <TabPane tab="客户端SDK" key="1">
              {tabData.clientSDK
                ? this.renderContent(tabData.clientSDK)
                : '暂无数据'}
            </TabPane>
            <TabPane tab="服务端SDK" key="2">
              {tabData.serverSDK
                ? this.renderContent(tabData.serverSDK)
                : '暂无数据'}
            </TabPane>
          </Tab>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  columnCardItem: {
    position: 'relative',
    float: 'left',
    width: '284px',
    height: '280px',
    padding: '0px',
    marginRight: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    boxShadow:
      '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff',
  },
  cardBody: {
    textAlign: 'center',
    padding: '20px 0',
    marginBottom: '15px',
    borderBottom: '1px solid #dedede',
  },
  avatarWrapper: {
    width: '50px',
    height: '50px',
    overflow: 'hidden',
    margin: '0 auto',
  },
  title: { fontSize: '20px', margin: '10px' },
  desc: { fontSize: '15px', color: '#999' },
  downloadButtons: { marginBottom: '15px', textAlign: 'center' },
  rightButton: { width: '114px', fontSize: '13px', marginLeft: '10px' },
  leftButton: { width: '114px', fontSize: '13px' },
  cardBottom: {
    padding: '10px 10px',
    background: '#f6f7f9',
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    right: '0px',
  },
  bottomText: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#666',
    textDecoration: 'none',
  },
  downloadCard: {},
  img: { width: '100%' },
};
