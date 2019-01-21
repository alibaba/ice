import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import ContainerCard from '../../../../components/ContainerCard';

export default class TopCategories extends Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '电器类',
        count: 40,
      },
      {
        item: '数码类',
        count: 21,
      },
      {
        item: '服饰类',
        count: 17,
      },
      {
        item: '酒水类',
        count: 13,
      },
      {
        item: '其他',
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
    return (
      <ContainerCard title="销售类目">
        <Chart height={368} data={dv} scale={cols} padding={[40]} forceFit>
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Legend position="bottom" />
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
      </ContainerCard>
    );
  }
}
