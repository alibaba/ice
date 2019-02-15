import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Card from '../Card';
import BarChart from './BarChart';

@injectIntl
export default class LatestActivity extends Component {
  static displayName = 'LatestActivity';

  static propTypes = {};

  static defaultProps = {};

  render() {
    const {
      intl: { formatMessage },
    } = this.props;

    const dataSource = Array.from({ length: 10 }).map((item, index) => {
      return {
        name: `${index + 1}. ${formatMessage({
          id: 'app.dashboard.activity.festival',
        })}`,
        num: parseInt(Math.random() * 1000, 10),
      };
    });

    const columns = [
      {
        title: formatMessage({ id: 'app.dashboard.activity.spacename' }),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: formatMessage({ id: 'app.dashboard.activity.number' }),
        dataIndex: 'num',
        key: 'num',
      },
    ];

    return (
      <Card
        title={formatMessage({ id: 'app.dashboard.activity.latest' })}
        subTitle={`${formatMessage({
          id: 'app.dashboard.activity.latestweek',
        })} TOP 10`}
        summary={[
          {
            label: formatMessage({ id: 'app.dashboard.activity.week' }),
            value: '123',
          },
          {
            label: formatMessage({ id: 'app.dashboard.activity.accumulative' }),
            value: '23,239',
          },
        ]}
        link={{
          text: formatMessage({ id: 'app.dashboard.activity.list' }),
          href: '#',
        }}
        dataSource={dataSource}
        columns={columns}
        content={<BarChart />}
      />
    );
  }
}
