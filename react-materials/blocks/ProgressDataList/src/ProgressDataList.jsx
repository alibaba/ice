import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Progress, Grid } from '@alifd/next';
import { enquireScreen } from 'enquire-js';

const { Row, Col } = Grid;

export default class ProgressDataList extends Component {
  static displayName = 'ProgressDataList';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    return (
      <IceContainer>
        <Row wrap>
          <Col xxs="24" s="12" l="6" style={styles.dataItem}>
            <div style={styles.dataTitle}>总收入</div>
            <div style={styles.dataIntro}>所有项目收入</div>
            <div style={styles.dataValue}>￥10M</div>
            <div style={styles.dataProgress}>
              <Progress percent={30} />
            </div>
            <div style={styles.dataExtra}>
              <div>
                <a style={styles.settingsLink} href="#">
                  设置
                </a>
              </div>
              <div>30%</div>
            </div>
            {!this.state.isMobile && <div style={styles.verticalLine} />}
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.dataItem}>
            <div style={styles.dataTitle}>今年新用户</div>
            <div style={styles.dataIntro}>今年新注册用户</div>
            <div style={styles.dataValue}>2000</div>
            <div style={styles.dataProgress}>
              <Progress percent={80} />
            </div>
            <div style={styles.dataExtra}>
              <div>
                <a style={styles.settingsLink} href="#">
                  设置
                </a>
              </div>
              <div>80%</div>
            </div>
            {!this.state.isMobile && <div style={styles.verticalLine} />}
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.dataItem}>
            <div style={styles.dataTitle}>本月新订单</div>
            <div style={styles.dataIntro}>本月新增订单数</div>
            <div style={styles.dataValue}>579</div>
            <div style={styles.dataProgress}>
              <Progress percent={60} />
            </div>
            <div style={styles.dataExtra}>
              <div>
                <a style={styles.settingsLink} href="#">
                  设置
                </a>
              </div>
              <div>60%</div>
            </div>
            {!this.state.isMobile && <div style={styles.verticalLine} />}
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.dataItem}>
            <div style={styles.dataTitle}>用户反馈待处理</div>
            <div style={styles.dataIntro}>用户反馈待处理的数量</div>
            <div style={styles.dataValue}>10</div>
            <div style={styles.dataProgress}>
              <Progress percent={10} />
            </div>
            <div style={styles.dataExtra}>
              <div>
                <a style={styles.settingsLink} href="#">
                  设置
                </a>
              </div>
              <div>10%</div>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  dataItem: {
    margin: '10px 0',
    padding: '0 30px',
    position: 'relative',
  },
  dataTitle: {
    fontWeight: 'bold',
  },
  dataIntro: {
    marginTop: 10,
    color: '#999',
  },
  dataValue: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    right: 30,
    color: '#3080fe',
  },
  dataProgress: {
    marginTop: 20,
  },
  dataExtra: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    color: '#999',
  },
  settingsLink: {
    color: '#999',
  },
  verticalLine: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    right: 0,
    width: 0,
    borderLeft: '1px solid #eee',
  },
};
