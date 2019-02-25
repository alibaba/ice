import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Tab } from '@alifd/next';
import { injectIntl } from 'react-intl';
import SeriesLine from './SeriesLine';
import BasicLine from './BasicLine';

@injectIntl
export default class TabChart extends Component {
  static displayName = 'TabChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (key) => {
    console.log('change', key);
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className="tab-chart" style={styles.container}>
        <IceContainer style={styles.card}>
          <Tab onChange={this.handleChange}>
            <Tab.Item
              key="1"
              title={formatMessage({ id: 'app.dashboard.trend.income' })}
            >
              <SeriesLine />
            </Tab.Item>
            <Tab.Item
              key="2"
              title={formatMessage({ id: 'app.dashboard.trend.trans' })}
            >
              <BasicLine />
            </Tab.Item>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: '20px',
  },
  card: {
    padding: '0 20px',
  },
};
