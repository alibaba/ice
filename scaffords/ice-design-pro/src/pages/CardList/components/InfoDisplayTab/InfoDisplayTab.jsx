import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab, Button, Grid } from '@icedesign/base';
import IceEllipsis from '@icedesign/ellipsis';
import axios from 'axios';
import './InfoDisplayTab.scss';

const { Row, Col } = Grid;
const { TabPane } = Tab;

export default class InfoDisplayTab extends Component {
  static displayName = 'InfoDisplayTab';

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
      .get('/mock/info-display-tab.json')
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
        <div key={index} className="column-card" style={styles.columnCard}>
          <Row>
            <Col
              className="column-card-title titleStyle"
              style={styles.columnCardTitleTitleStyle}
            >
              {item.title}
            </Col>
          </Row>
          <Row style={styles.todo0}>
            <Col>
              <div className="column-card-desc" style={styles.columnCardDesc}>
                <IceEllipsis lineLimit={6} text={item.desc} />
              </div>
            </Col>
          </Row>
          <Row style={styles.todo1}>
            <Col>
              <Button
                type="primary"
                component="a"
                href="http://www.taobao.com"
                target="_blank"
                size="large"
              >
                申请频道
              </Button>
            </Col>
          </Row>
        </div>
      );
    });
  };

  render() {
    const { tabData } = this.state;
    return (
      <div className="info-display-tab" style={styles.infoDisplayTab}>
        <IceContainer>
          <Tab type="bar" onChange={this.callback}>
            <TabPane tab="全部频道" key="1">
              {tabData.all ? this.renderContent(tabData.all) : '暂无数据'}
            </TabPane>
            <TabPane tab="可申请频道" key="2">
              {tabData.apply ? this.renderContent(tabData.apply) : '暂无数据'}
            </TabPane>
            <TabPane tab="已获得频道" key="3">
              {tabData.existing
                ? this.renderContent(tabData.existing)
                : '暂无数据'}
            </TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  columnCard: {
    float: 'left',
    width: '284px',
    overflow: 'hidden',
    boxShadow: '0px 0px 2px 0px rgba(0',
  },
  columnCardDesc: {
    height: '144px',
    overflow: 'hidden',
    lineHeight: '24px',
    fontSize: '14px',
    color: '#666',
    margin: '5px auto 0 auto',
  },
  infoDisplayTab: {},
  todo0: { marginTop: '20px' },
  todo1: { textAlign: 'center', marginTop: '15px' },
};
