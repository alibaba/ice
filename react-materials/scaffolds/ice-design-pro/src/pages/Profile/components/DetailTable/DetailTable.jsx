import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { FormattedMessage } from 'react-intl';

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="detail-table">
        <IceContainer title="任务详情">
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                <FormattedMessage id="app.profile.table.task.label" />：
              </div>
              <div style={styles.detailBody}>
                <FormattedMessage id="app.profile.table.task.value" />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                <FormattedMessage id="app.profile.table.amount.label" />：
              </div>
              <div style={styles.detailBody}>
                ¥ <FormattedMessage id="app.profile.table.amount.value" />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                <FormattedMessage id="app.profile.table.deliverytime.label" />
                ：
              </div>
              <div style={styles.detailBody}>
                <FormattedMessage id="app.profile.table.deliverytime.value" />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                <FormattedMessage id="app.profile.table.contact.label" />：
              </div>
              <div style={styles.detailBody}>
                <FormattedMessage id="app.profile.table.contact.value" />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                <FormattedMessage id="app.profile.table.status.label" />：
              </div>
              <div style={styles.detailBody}>
                <FormattedMessage id="app.profile.table.status.value" />
              </div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>
                <FormattedMessage id="app.profile.table.address.label" />：
              </div>
              <div style={styles.detailBody}>
                <FormattedMessage id="app.profile.table.address.value" />
              </div>
            </li>
          </ul>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
};
