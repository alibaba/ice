import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class Analysis extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: '总员工数',
        count: 70,
      },
      {
        item: '新增员工',
        count: 20,
      },
      {
        item: '离职员工',
        count: 10,
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
      <IceContainer title="员工状况">
        <Chart height={338} data={dv} scale={cols} padding={[40]} forceFit>
          <Coord type="theta" radius={1} />
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
      </IceContainer>
    );
  }
}
