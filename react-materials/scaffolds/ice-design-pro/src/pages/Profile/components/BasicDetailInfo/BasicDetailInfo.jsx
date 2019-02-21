import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';

const { Row, Col } = Grid;

@injectIntl
export default class BasicDetailInfo extends Component {
  static displayName = 'BasicDetailInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    // 渲染详情信息的数据
    const dataSource = {
      title: formatMessage({ id: 'app.profile.basic.task.value' }),
      shopName: formatMessage({ id: 'app.profile.basic.shop.value' }),
      amount: formatMessage({ id: 'app.profile.basic.amount.value' }),
      bounty: formatMessage({ id: 'app.profile.basic.reward.value' }),
      orderTime: formatMessage({ id: 'app.profile.basic.ordertime.value' }),
      deliveryTime: formatMessage({
        id: 'app.profile.basic.deliverytime.value',
      }),
      phone: formatMessage({ id: 'app.profile.basic.contact.value' }),
      address: formatMessage({ id: 'app.profile.basic.address.value' }),
      status: formatMessage({ id: 'app.profile.basic.status.value' }),
      remark: formatMessage({ id: 'app.profile.basic.note.value' }),
      pics: [
        require('./images/img4.jpg'),
        require('./images/img3.jpg'),
        require('./images/img2.jpg'),
        require('./images/img1.jpg'),
      ],
    };

    return (
      <IceContainer>
        <h2 style={styles.basicDetailTitle}>
          <FormattedMessage id="app.profile.basic.title" />
        </h2>

        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>
            <FormattedMessage id="app.profile.basic.sub.title1" />
          </h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.task.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.title}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.shop.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.shopName}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.amount.label" />：
              </span>
              <span style={styles.infoItemValue}>¥ {dataSource.amount}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.reward.label" />：
              </span>
              <span style={styles.infoItemValue}>¥ {dataSource.bounty}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.ordertime.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.orderTime}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.deliverytime.label" />
                ：
              </span>
              <span style={styles.infoItemValue}>
                {dataSource.deliveryTime}
              </span>
            </Col>
          </Row>
        </div>
        <div style={styles.infoColumn}>
          <h5 style={styles.infoColumnTitle}>
            <FormattedMessage id="app.profile.basic.sub.title2" />
          </h5>
          <Row wrap style={styles.infoItems}>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.contact.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.phone}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.address.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.address}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.status.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.status}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.infoItemLabel}>
                <FormattedMessage id="app.profile.basic.note.label" />：
              </span>
              <span style={styles.infoItemValue}>{dataSource.remark}</span>
            </Col>
            <Col xxs="24" l="12" style={styles.infoItem}>
              <span style={styles.attachLabel}>
                <FormattedMessage id="app.profile.basic.attachment.label" />：
              </span>
              <span>
                {dataSource.pics &&
                  dataSource.pics.length &&
                  dataSource.pics.map((pic, index) => {
                    return (
                      <img
                        key={index}
                        src={pic}
                        style={styles.attachPics}
                        alt="图片"
                      />
                    );
                  })}
              </span>
            </Col>
          </Row>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  basicDetailTitle: {
    margin: '10px 0',
    fontSize: '16px',
    color: '#333',
  },
  infoColumn: {
    marginLeft: '16px',
  },
  infoColumnTitle: {
    margin: '20px 0',
    height: '22px',
    lineHeight: '22px',
    paddingLeft: '10px',
    borderLeft: '4px solid #2077ff',
  },
  infoItems: {
    padding: 0,
    marginLeft: '25px',
  },
  infoItem: {
    marginBottom: '18px',
    listStyle: 'none',
    fontSize: '14px',
  },
  infoItemLabel: {
    minWidth: '70px',
    color: '#999',
  },
  infoItemValue: {
    color: '#333',
  },
  attachLabel: {
    minWidth: '70px',
    color: '#999',
    float: 'left',
  },
  attachPics: {
    width: '80px',
    height: '80px',
    border: '1px solid #eee',
    marginRight: '10px',
  },
};
