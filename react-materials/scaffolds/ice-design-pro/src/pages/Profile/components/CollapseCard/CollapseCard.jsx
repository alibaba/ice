import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon, Grid } from '@alifd/next';
import { FormattedMessage } from 'react-intl';

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
              <h3 style={styles.infoTitle}>
                <FormattedMessage id="app.profile.info.title" />
              </h3>
              <p style={styles.infoDesc}>
                <FormattedMessage id="app.profile.info.description" />
              </p>
            </div>
          </div>
          <Row style={{ ...styles.baseInfo, ...collapseStyle }}>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.info.activity.label" />：
              </span>
              <span style={styles.infoItemValue}>
                <FormattedMessage id="app.profile.info.activity.value" />
              </span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.info.shop.label" />：
              </span>
              <span style={styles.infoItemValue}>
                <FormattedMessage id="app.profile.info.shop.value" />
              </span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.info.starttime.label" />：
              </span>
              <span style={styles.infoItemValue}>
                <FormattedMessage id="app.profile.info.starttime.value" />
              </span>
            </Col>
            <Col xxs="24" xs="12" s="12" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.info.endtime.label" />：
              </span>
              <span style={styles.infoItemValue}>
                <FormattedMessage id="app.profile.info.endtime.value" />
              </span>
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
