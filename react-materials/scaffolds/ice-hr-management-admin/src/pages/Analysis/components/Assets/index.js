import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import IceContainer from '@icedesign/container';

class Stacked extends React.Component {
  render() {
    const data = [
      {
        State: 'WY',
        电脑: 25635,
        办公桌: 1890,
        显示器: 9314,
      },
      {
        State: 'DC',
        电脑: 30352,
        办公桌: 20439,
        显示器: 10225,
      },
      {
        State: 'VT',
        电脑: 38253,
        办公桌: 42538,
        显示器: 15757,
      },
      {
        State: 'ND',
        电脑: 51896,
        办公桌: 67358,
        显示器: 18794,
      },
      {
        State: 'AK',
        电脑: 72083,
        办公桌: 85640,
        显示器: 22153,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['电脑', '办公桌', '显示器'],
      // 展开字段集
      key: '年龄段',
      // key字段
      value: '人口数量',
      // value字段
      retains: ['State'], // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <IceContainer title="资产采购">
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Coord transpose />
          <Axis
            name="State"
            label={{
              offset: 12,
            }}
          />
          <Axis name="人口数量" />
          <Tooltip />
          <Geom type="intervalStack" position="State*人口数量" color="年龄段" />
        </Chart>
      </IceContainer>
    );
  }
}

export default Stacked;
