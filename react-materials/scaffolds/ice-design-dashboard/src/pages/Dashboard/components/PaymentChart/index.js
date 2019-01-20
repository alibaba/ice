import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerCard from '../../../../components/ContainerCard';

export default class PaymentChart extends Component {
  render() {
    const data = [
      {
        name: '支付宝',
        'Jan.': 18.9,
        'Feb.': 28.8,
        'Mar.': 39.3,
        'Apr.': 81.4,
        'May.': 47,
        'Jun.': 20.3,
        'Jul.': 24,
        'Aug.': 35.6,
      },
      {
        name: '银行卡',
        'Jan.': 12.4,
        'Feb.': 23.2,
        'Mar.': 34.5,
        'Apr.': 99.7,
        'May.': 52.6,
        'Jun.': 35.5,
        'Jul.': 37.4,
        'Aug.': 42.4,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.'],
      key: '月份',
      value: '支付笔数',
    });

    return (
      <ContainerCard
        title="支付笔数"
        cardStyle={{ margin: '0' }}
        contentStyle={{ padding: '0' }}
      >
        <Chart height={300} data={dv} forceFit padding={[20, 10, 50, 10]}>
          <Legend />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="interval"
            position="月份*支付笔数"
            color="name"
            adjust={[
              {
                type: 'dodge',
                marginRatio: 1 / 32,
              },
            ]}
          />
        </Chart>
      </ContainerCard>
    );
  }
}
