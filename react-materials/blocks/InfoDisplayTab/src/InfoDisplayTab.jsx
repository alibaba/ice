import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Grid } from '@alifd/next';
import IceEllipsis from '@icedesign/ellipsis';
import data from './data';

const { Row, Col } = Grid;
const { Item } = Tab;

export default class InfoDisplayTab extends Component {
  static displayName = 'InfoDisplayTab';

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
        <Col xxs="24" s="12" l="8" key={index}>
          <div style={styles.columnCard}>
            <div style={styles.cardTitle}>{item.title}</div>
            <div style={styles.cardDescWrapper}>
              <div style={styles.cardDesc}>
                <IceEllipsis lineLimit={6} text={item.desc} />
              </div>
            </div>
            <div style={styles.cardBtnWrapper}>
              <Button
                type="primary"
                component="a"
                href="http://www.taobao.com"
                target="_blank"
                size="large"
              >
                申请频道
              </Button>
            </div>
          </div>
        </Col>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div className="info-display-tab">
        <IceContainer>
          <Tab onChange={this.callback}>
            <Tab.Item title="全部频道" key="1">
              <Row wrap gutter={20}>
                {tabData.all ? this.renderContent(tabData.all) : '暂无数据'}
              </Row>
            </Tab.Item>
            <Tab.Item title="可申请频道" key="2">
              <Row wrap gutter={20}>
                {tabData.apply ? this.renderContent(tabData.apply) : '暂无数据'}
              </Row>
            </Tab.Item>
            <Tab.Item title="已获得频道" key="3">
              <Row wrap gutter={20}>
                {tabData.existing
                  ? this.renderContent(tabData.existing)
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
  columnCard: {
    overflow: 'hidden',
    boxShadow:
      '0px 0px 2px 0px rgba(0, 0, 0, 0.1),0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    height: '280px',
    marginBottom: '20px',
  },
  cardDescWrapper: {
    marginTop: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '22px',
  },
  cardDesc: {
    padding: '0 20px',
    height: '144px',
    overflow: 'hidden',
    lineHeight: '24px',
    fontSize: '14px',
    color: '#666',
    margin: '5px auto 0 auto',
  },
  cardBtnWrapper: {
    textAlign: 'center',
    marginTop: '15px',
  },
};
