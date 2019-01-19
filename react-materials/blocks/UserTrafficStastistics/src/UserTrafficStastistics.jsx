import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';

const { Row, Col } = Grid;

export default class UserTrafficStastistics extends Component {
  static displayName = 'UserTrafficStastistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTrafficTypes = () => {
    const data = [
      { status: '激活', count: 356 },
      { status: '保持', count: 235 },
      { status: '关闭', count: 245 },
    ];
    let total = 0;
    data.forEach((item) => {
      total += item.count;
    });
    const precentages = {};
    data.forEach((item) => {
      precentages[item.status] = item.count / total;
    });

    const cols = {
      count: {
        min: 0,
      },
    };
    return (
      <IceContainer title="访问用户类型分布">
        <div>
          <Chart
            height={300}
            data={data}
            scale={cols}
            padding={[70, 20, 100, 20]}
            forceFit
          >
            <Coord type="polar" />
            <Axis
              name="count"
              label={null}
              tickLine={null}
              line={{
                stroke: '#E9E9E9',
                lineDash: [3, 3],
              }}
            />
            <Axis
              name="status"
              grid={{
                align: 'center',
              }}
              tickLine={null}
              label={{
                Offset: 10,
                textStyle: {
                  textAlign: 'center', // 设置坐标轴 label 的文本对齐方向
                },
              }}
            />
            <Legend
              itemFormatter={(text) => {
                return `${text} (${(precentages[text] * 100).toFixed(2)}%)`;
              }}
              name="status"
              itemWidth={100}
            />
            <Tooltip />
            <Geom
              type="interval"
              position="status*count"
              color="status"
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
            >
              <Label
                content="count"
                offset={-15}
                textStyle={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 11,
                }}
              />
            </Geom>
          </Chart>
        </div>
      </IceContainer>
    );
  };

  renderUserStatistics = () => {
    const data = [
      { type: '日用户量', count: 151, date: '02-21' },
      { type: '周用户量', count: 532, date: '02-21' },
      { type: '月用户量', count: 1834, date: '02-21' },

      { type: '日用户量', count: 251, date: '02-22' },
      { type: '周用户量', count: 732, date: '02-22' },
      { type: '月用户量', count: 2534, date: '02-22' },

      { type: '日用户量', count: 311, date: '02-23' },
      { type: '周用户量', count: 932, date: '02-23' },
      { type: '月用户量', count: 1234, date: '02-23' },

      { type: '日用户量', count: 221, date: '02-24' },
      { type: '周用户量', count: 632, date: '02-24' },
      { type: '月用户量', count: 2534, date: '02-24' },

      { type: '日用户量', count: 121, date: '02-25' },
      { type: '周用户量', count: 532, date: '02-25' },
      { type: '月用户量', count: 2114, date: '02-25' },

      { type: '日用户量', count: 221, date: '02-26' },
      { type: '周用户量', count: 632, date: '02-26' },
      { type: '月用户量', count: 2534, date: '02-26' },

      { type: '日用户量', count: 311, date: '02-27' },
      { type: '周用户量', count: 932, date: '02-27' },
      { type: '月用户量', count: 1234, date: '02-27' },
    ];
    const dv = new DataView()
      .source(data)
      .transform({
        type: 'fill-rows',
        groupBy: ['type'],
        orderBy: ['date'],
      })
      .transform({
        type: 'impute',
        field: 'count',
        method: 'value',
        value: 0,
      });
    const cols = {
      date: {
        tickInterval: 10,
        nice: false,
      },
      count: {
        // nice: false,
        min: -500,
      },
    };
    return (
      <IceContainer title="用户数据分析">
        <div>
          <Chart
            height={300}
            data={dv}
            scale={cols}
            padding={[20, 0, 80, 50]}
            plotBackground={{ stroke: '#ccc' }}
            forceFit
          >
            <Axis name="date" line={null} />
            <Axis
              name="count"
              line={null}
              tickLine={{
                length: 8,
              }}
              subTickCount={10}
              subTickLine={{
                lineWidth: 1, // 子刻度线宽
                stroke: '#ddd', // 子刻度线颜色
                length: 5,
              }}
              grid={null}
            />
            <Legend
              position="bottom"
              useHtml
              g2-legend-marker={{
                borderRadius: 'none',
              }}
              g2-legend-title={{
                fontSize: '12px',
                fontWeight: 500,
                margin: 0,
                color: '#ff8800',
              }}
            />
            <Tooltip shared={false} crosshairs={false} inPlot={false} />
            <Geom
              type="area"
              position="date*count"
              color="type"
              adjust={['stack', 'symmetric']}
              shape="smooth"
              opacity={1}
            />
          </Chart>
        </div>
      </IceContainer>
    );
  };

  renderBrowserStatus = () => {
    const browsers = [
      { type: 'Google Chrome', rate: 0.5 },
      { type: 'Mozila Firefox', rate: 0.1 },
      { type: 'Internet Explorer', rate: 0.3 },
      { type: 'Safari', rate: 0.1 },
    ];

    return (
      <div>
        <IceContainer title="浏览器类型">
          <ul>
            {browsers.map((browser) => {
              return (
                <li style={styles.browserItem} key={browser.type}>
                  <span>{browser.type}</span>
                  <span style={styles.percentage}>
                    {parseInt(browser.rate * 100, 10)}%
                  </span>
                </li>
              );
            })}
          </ul>
        </IceContainer>
        <IceContainer title="用户满意度">
          <div style={styles.satisfaction}>70%</div>
          <Row>
            <Col span={8} style={styles.satisfactionItem}>
              <div style={styles.subtitle}>上个月</div>
              <div>54.1%</div>
            </Col>
            <Col span={8} style={styles.satisfactionItem}>
              <div style={styles.subtitle}>变化</div>
              <div>+15.9%</div>
            </Col>
            <Col span={8} style={styles.satisfactionItem}>
              <div style={styles.subtitle}>趋势</div>
              <div>上升</div>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  };

  render() {
    return (
      <div className="user-traffic-stastistics">
        <Row wrap gutter="20">
          <Col xxs="24" l="7">
            {this.renderTrafficTypes()}
          </Col>
          <Col xxs="24" l="10">
            {this.renderUserStatistics()}
          </Col>
          <Col xxs="24" l="7">
            {this.renderBrowserStatus()}
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  browserItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5px 0',
    // borderBottom: '1px dotted #eee',
  },
  percentage: {
    padding: '2px 5px',
    backgroundColor: '#307bf0',
    color: '#fff',
    borderRadius: '14px',
    fontSize: '12px',
  },
  satisfaction: {
    textAlign: 'center',
    fontSize: '36px',
    color: '#307bf0',
    padding: '0 0 8px',
  },
  satisfactionItem: {
    textAlign: 'center',
    fontWeight: 500,
  },
  subtitle: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '5px',
    fontWeight: 400,
  },
};
