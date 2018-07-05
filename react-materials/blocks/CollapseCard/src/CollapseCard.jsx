import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon, Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class CollapseCard extends Component {
  static displayName = 'CollapseCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
  }

  toggleCollapse = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse,
    });
  };

  render() {
    const { collapse } = this.state;
    const collapseStyle = collapse ? styles.collapse : null;
    return (
      <div className="collapse-card">
        <IceContainer>
          <div style={styles.summaryInfo}>
            <img
              style={styles.itemLogo}
              src={require('./images/TB1EBQ.hZLJ8KJjy0FnXXcFDpXa-300-300.png')}
              alt=""
            />
            <div style={styles.infoIntro}>
              <h3 style={styles.infoTitle}>戴森</h3>
              <p style={styles.infoDesc}>
                作为一家英国创新科技公司,戴森致力于设计和研发能用科技来简化人们生活的产品.戴森官方旗舰店保修长达5年,您可以在戴森官方联络中心购买零件,每周7天提供服务{' '}
              </p>
            </div>
          </div>
          <Row style={{ ...styles.baseInfo, ...collapseStyle }}>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>活动标题：</span>
              <span style={styles.infoItemValue}>戴森周年庆活动</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>店铺名称：</span>
              <span style={styles.infoItemValue}>戴森周年庆活动</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>开始时间：</span>
              <span style={styles.infoItemValue}>2017-10-18 12:20:07</span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>结束时间：</span>
              <span style={styles.infoItemValue}>2017-12-18 12:20:07</span>
            </Col>
          </Row>
          <div className="toggle-btn" style={styles.toggleBtn}>
            <a
              className="toggle-btn"
              style={styles.toggleBtn}
              onClick={this.toggleCollapse}
            >
              <span style={{ marginRight: '5px' }}>
                {collapse ? '更多信息' : '收起'}
              </span>
              <Icon size="xs" type={collapse ? 'arrow-down' : 'arrow-up'} />
            </a>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  collapse: {
    display: 'none',
  },
  summaryInfo: {
    display: 'flex',
    borderBottom: '1px solid #e7e7eb',
  },
  baseInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '20px',
  },
  infoItem: {
    width: '50%',
    marginBottom: '15px',
  },
  infoItemLabel: {
    color: '#999',
  },
  itemLogo: {
    width: '100px',
    height: '100px',
  },
  infoIntro: {
    marginLeft: '20px',
    paddingBottom: '20px',
  },
  infoTitle: {
    fontWeight: 'bold',
  },
  infoDesc: {
    color: '#999',
  },
  toggleBtn: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#999',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};
