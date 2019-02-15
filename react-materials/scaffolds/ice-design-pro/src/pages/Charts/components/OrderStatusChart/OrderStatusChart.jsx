import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import AreaChart from './AreaChart';

const { Row, Col } = Grid;

@injectIntl
export default class OrderStatusChart extends Component {
  static displayName = 'OrderStatusChart';

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

    return (
      <IceContainer
        title={formatMessage({
          id: 'app.chart.general.order.status',
        })}
      >
        <Row wrap>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                5675{' '}
                <Icon
                  size="xs"
                  type="arrow-down-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowDown }}
                />
              </h2>
              <p style={styles.textLabel}>
                <FormattedMessage id="app.chart.general.order.day" />
              </p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                7841{' '}
                <Icon
                  size="xs"
                  type="arrow-up-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowUp }}
                />
              </h2>
              <p style={styles.textLabel}>
                <FormattedMessage id="app.chart.general.order.week" />
              </p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                6521{' '}
                <Icon
                  size="xs"
                  type="arrow-down-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowDown }}
                />
              </h2>
              <p style={styles.textLabel}>
                <FormattedMessage id="app.chart.general.order.month" />
              </p>
            </div>
          </Col>
          <Col xxs="12" s="12" l="6">
            <div style={styles.box}>
              <h2 style={styles.counterNum}>
                8954{' '}
                <Icon
                  size="xs"
                  type="arrow-up-filling"
                  style={{ ...styles.arrowIcon, ...styles.arrowUp }}
                />
              </h2>
              <p style={styles.textLabel}>
                <FormattedMessage id="app.chart.general.order.total" />
              </p>
            </div>
          </Col>
        </Row>
        <AreaChart />
      </IceContainer>
    );
  }
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  textLabel: {
    margin: 0,
    color: '#666',
  },
  counterNum: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    fontSize: '30px',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  arrowIcon: {
    marginLeft: '10px',
  },
  arrowUp: {
    color: '#ec3f16',
  },
  arrowDown: {
    color: 'green',
  },
};
