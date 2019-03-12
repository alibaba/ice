/* eslint global-require: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import { injectIntl } from 'react-intl';
import DataSet from '@antv/data-set';

@injectIntl
export default class PieChart extends Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '事例一',
        count: 40,
      },
      {
        item: '事例二',
        count: 21,
      },
      {
        item: '事例三',
        count: 17,
      },
      {
        item: '事例四',
        count: 13,
      },
      {
        item: '事例五',
        count: 9,
      },
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${val * 100}%`;
          return val;
        },
      },
    };
    const {
      intl: { formatMessage },
    } = this.props;

    return (
      <IceContainer
        title={formatMessage({ id: 'app.dashboard.project.pie.title' })}
      >
        <Chart height={180} data={dv} scale={cols} padding={[2]} forceFit>
          <Coord type="theta" radius={1} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              'item*percent',
              (item, percent) => {
                percent = `${percent * 100}%`;
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              offset={-40}
              textStyle={{
                rotate: 0,
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
              }}
            />
          </Geom>
        </Chart>
      </IceContainer>
    );
  }
}
