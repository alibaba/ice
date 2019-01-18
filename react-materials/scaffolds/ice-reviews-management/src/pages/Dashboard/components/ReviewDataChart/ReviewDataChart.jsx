import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import DataSet from '@antv/data-set';

const data = [
  {
    name: '已完成',
    一月: 118,
    二月: 128,
    三月: 139,
    四月: 181,
    五月: 147,
    六月: 120,
    七月: 124,
    八月: 135,
  },
  {
    name: '已邀请',
    一月: 212,
    二月: 223,
    三月: 234,
    四月: 299,
    五月: 252,
    六月: 235,
    七月: 237,
    八月: 242,
  },
  {
    name: '已回绝',
    一月: 12,
    二月: 13,
    三月: 24,
    四月: 129,
    五月: 122,
    六月: 225,
    七月: 117,
    八月: 22,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月'],
  key: '月份',
  value: '数量',
});

export default class ReviewDataChart extends Component {
  static displayName = 'ReviewDataChart';

  render() {
    return (
      <IceContainer title="数据图表">
        <div style={styles.coreDataTitle}>近一月</div>
        <div style={styles.coreDataWrapper}>
          <div style={styles.coreData}>
            <div style={styles.coreDataCount}>135</div>
            <div style={styles.coreDataDesc}>
              <span
                style={{ ...styles.indicator, backgroundColor: '#5e83fb' }}
              />
              <span>已完成</span>
            </div>
          </div>
          <div style={styles.coreData}>
            <div style={styles.coreDataCount}>242</div>
            <div style={styles.coreDataDesc}>
              <span
                style={{ ...styles.indicator, backgroundColor: '#ee706d' }}
              />
              <span>已邀请</span>
            </div>
          </div>
          <div style={styles.coreData}>
            <div style={styles.coreDataCount}>22</div>
            <div style={styles.coreDataDesc}>
              <span
                style={{ ...styles.indicator, backgroundColor: '#58ca9a' }}
              />
              <span>已回绝</span>
            </div>
          </div>
        </div>
        <div style={styles.coreDataChartWrapper}>
          <Chart padding={[40, 40, 40, 40]} height={300} data={dv} forceFit>
            <Axis name="月份" />
            <Axis name="数量" />
            <Tooltip crosshairs={{ type: 'y' }} />
            <Geom
              type="interval"
              position="月份*数量"
              color={['name', ['#5e83fb', '#ee706d', '#58ca9a']]}
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
            />
          </Chart>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  coreDataTitle: {
    color: '#666',
    fontSize: 12,
  },
  coreDataWrapper: {
    marginTop: 10,
    display: 'flex',
  },
  coreData: {
    marginRight: 50,
  },
  coreDataCount: {
    fontSize: 30,
  },
  coreDataDesc: {
    display: 'flex',
    alignItems: 'center',
  },
  indicator: {
    display: 'inline-block',
    marginRight: 5,
    height: '3px',
    width: '15px',
  },
};
