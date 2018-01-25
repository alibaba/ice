/* eslint no-mixed-operators: 0 */
/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Label, Shape } from 'bizcharts';
import './ChartBubbleImage.scss';

export default class ChartBubbleImage extends Component {
  static displayName = 'ChartBubbleImage';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    // 自定义 shape, 支持图片形式的气泡
    Shape.registerShape('point', 'image', {
      drawShape(cfg, container) {
        cfg.points = this.parsePoints(cfg.points);
        const coord = this._coord;
        container.addShape('line', {
          attrs: {
            x1: cfg.points[0].x,
            y1: cfg.points[0].y,
            x2: cfg.points[0].x,
            y2: coord.start.y,
            stroke: '#ccc',
            lineWidth: 1,
            lineDash: [4, 2],
          },
        });
        return container.addShape('image', {
          attrs: {
            x: cfg.points[0].x - 12 * cfg.size / 2,
            y: cfg.points[0].y - 12 * cfg.size,
            width: 12 * cfg.size,
            height: 12 * cfg.size,
            img: cfg.shape[1],
          },
        });
      },
    });

    const data = [
      { name: 'Internet Explorer', value: 26 },
      { name: 'Chrome', value: 40 },
      { name: 'Firefox', value: 30 },
      { name: 'Safari', value: 24 },
      { name: 'Opera', value: 15 },
      { name: 'Undetectable', value: 8 },
    ];

    const imageMap = {
      'Internet Explorer':
        'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
      Chrome:
        'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
      Firefox:
        'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
      Safari:
        'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
      Opera:
        'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
      Undetectable:
        'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png',
    };

    const cols = {
      value: {
        nice: false,
        max: 60,
        min: 0,
      },
    };

    return (
      <div className="chart-bubble-image">
        <IceContainer>
          <h4 style={styles.title}>自定义气泡图</h4>
          <Chart
            height={400}
            data={data}
            padding={[20, 20, 90]}
            scale={cols}
            forceFit
          >
            <Axis name="name" />
            <Axis name="value" visible={false} />
            <Tooltip />
            <Geom
              type="point"
              position="name*value"
              color="name"
              shape={[
                'name',
                (name) => {
                  return ['image', imageMap[name]]; // 根据具体的字段指定 shape
                },
              ]}
              size="value"
              style={{
                stroke: '#fff',
                lineWidth: 1,
                fillOpacity: 1,
              }}
            >
              <Label
                content="value"
                offset={-20}
                textStyle={{
                  fontSize: 16, // 文本大小
                }}
              />
            </Geom>
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
