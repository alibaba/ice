import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Chart, Geom, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';
import './ChartFunnel.scss';

export default class ChartFunnel extends Component {
  static displayName = 'ChartFunnel';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const { Text } = Guide;
    let data = [
      { action: '浏览网站', pv: 50000 },
      { action: '放入购物车', pv: 35000 },
      { action: '生成订单', pv: 25000 },
      { action: '支付订单', pv: 15000 },
      { action: '完成交易', pv: 8000 },
    ];

    const dv = new DataView().source(data);
    dv.transform({
      type: 'percent',
      field: 'pv',
      dimension: 'action',
      as: 'percent',
    });
    data = dv.rows;

    const cols = {
      percent: {
        nice: false,
      },
    };

    return (
      <div className="chart-funnel">
        <IceCard>
          <h4 style={styles.title}>漏斗图</h4>
          <Chart
            height={400}
            data={data}
            scale={cols}
            padding={[20, 120, 95]}
            forceFit
          >
            <Tooltip
              showTitle={false}
              itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>浏览人数：{pv}</span><br/><span style=&quot;padding-left: 16px&quot;>占比：{percent}</span><br/></li>"
            />
            <Coord type="rect" transpose scale={[1, -1]} />
            <Legend />
            {data.map((obj, index) => {
              return (
                <Guide key={index}>
                  <Text
                    top
                    position={{
                      action: obj.action,
                      percent: 'median',
                    }}
                    content={`${parseInt(obj.percent * 100, 10)}%`}
                    style={{
                      fill: '#fff',
                      fontSize: '12',
                      textAlign: 'center',
                      shadowBlur: 2,
                      shadowColor: 'rgba(0, 0, 0, .45)',
                    }}
                  />
                </Guide>
              );
            })}
            <Geom
              type="intervalSymmetric"
              position="action*percent"
              shape="funnel"
              color={[
                'action',
                ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
              ]}
              tooltip={[
                'action*pv*percent',
                (action, pv, percent) => {
                  return {
                    name: action,
                    percent: `${parseInt(percent * 100, 10)}%`,
                    pv,
                  };
                },
              ]}
            >
              <Label
                content={[
                  'action*pv',
                  (action, pv) => {
                    return `${action} ${pv}`;
                  },
                ]}
                offset={35}
                labeLine={{
                  lineWidth: 1,
                  stroke: 'rgba(0, 0, 0, 0.15)',
                }}
              />
            </Geom>
          </Chart>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0 0 40px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
};
