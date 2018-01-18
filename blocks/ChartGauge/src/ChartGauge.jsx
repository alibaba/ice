/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Coord, Guide, Shape } from 'bizcharts';
import './ChartGauge.scss';

export default class ChartGauge extends Component {
  static displayName = 'ChartGauge';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const { Arc, Html, Line } = Guide;
    // 自定义Shape 部分
    Shape.registerShape('point', 'pointer', {
      drawShape(cfg, group) {
        let point = cfg.points[0]; // 获取第一个标记点
        point = this.parsePoint(point);
        const center = this.parsePoint({
          // 获取极坐标系下画布中心点
          x: 0,
          y: 0,
        });
        // 绘制指针
        group.addShape('line', {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: point.x,
            y2: point.y - 20,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: 'round',
          },
        });
        return group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: 12,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: '#fff',
          },
        });
      },
    });

    const data = [{ value: 6 }];
    const cols = {
      value: {
        min: 0,
        max: 9,
        ticks: [2.25, 3.75, 5.25, 6.75],
        nice: false,
      },
    };
    return (
      <div className="chart-gauge">
        <IceContainer>
          <h4 style={styles.title}>仪表图</h4>
          <Chart
            height={400}
            data={data}
            scale={cols}
            padding={[0, 0, 200, 0]}
            forceFit
          >
            <Coord
              type="polar"
              startAngle={-9 / 8 * Math.PI}
              endAngle={1 / 8 * Math.PI}
              radius={0.75}
            />
            <Axis
              name="value"
              zIndex={2}
              label={{
                offset: -20,
                formatter: (val) => {
                  if (val === '2.25') {
                    return '差';
                  } else if (val === '3.75') {
                    return '中';
                  } else if (val === '5.25') {
                    return '良';
                  }

                  return '优';
                },
                textStyle: {
                  fontSize: 24,
                  fill: 'rgba(0, 0, 0, 0.65)',
                  textAlign: 'center',
                },
              }}
            />
            <Guide>
              <Line
                start={[3, 0.905]}
                end={[3.0035, 0.85]}
                lineStyle={{
                  stroke: '#19AFFA', // 线的颜色
                  lineDash: null, // 虚线的设置
                  lineWidth: 3,
                }}
              />
              <Line
                start={[4.5, 0.905]}
                end={[4.5, 0.85]}
                lineStyle={{
                  stroke: '#19AFFA', // 线的颜色
                  lineDash: null, // 虚线的设置
                  lineWidth: 3,
                }}
              />
              <Line
                start={[6, 0.905]}
                end={[6.0035, 0.85]}
                lineStyle={{
                  stroke: '#19AFFA', // 线的颜色
                  lineDash: null, // 虚线的设置
                  lineWidth: 3,
                }}
              />
              <Arc
                zIndex={0}
                start={[0, 0.965]}
                end={[9, 0.965]}
                style={{
                  // 底灰色
                  stroke: '#000',
                  lineWidth: 18,
                  opacity: 0.09,
                }}
              />
              <Arc
                zIndex={1}
                start={[0, 0.965]}
                end={[data[0].value, 0.965]}
                style={{
                  // 底灰色
                  stroke: '#1890FF',
                  lineWidth: 18,
                }}
              />
              <Html
                position={['50%', '95%']}
                html={() => {
                  return `<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);">合格率</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);">${data[0]
                    .value * 10}%</p></div>`;
                }}
              />
            </Guide>
            <Geom
              type="point"
              position="value*1"
              shape="pointer"
              color="#1890FF"
              active={false}
              style={{ stroke: '#fff', lineWidth: 1 }}
            />
          </Chart>
        </IceContainer>
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
