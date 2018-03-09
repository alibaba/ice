import React, { Component } from 'react';
import axios from 'axios';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import IceContainer from '@icedesign/container';

export default class ChartStock extends Component {
  static displayName = 'ChartStock';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get('/mock/chart-stock.json')
      .then((response) => {
        console.log(response);
        this.setState({
          data: response.data && response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // 参考：https://alibaba.github.io/BizCharts/
    const cols = {
      date: {
        type: 'time',
        nice: false,
        mask: 'MM-DD',
        tickCount: 10,
      },
      range: {
        min: 20,
        max: 35,
        nice: false,
        tickInterval: 2,
      },
      mean: {
        min: 20,
        max: 35,
        nice: false,
      },
      stockRange: {
        min: 20,
        max: 35,
        nice: false,
      },
    };

    const dv = new DataView();
    dv.source(this.state.data).transform({
      type: 'map',
      callback: (obj) => {
        obj.stockRange = [obj.start, obj.end, obj.highest, obj.lowest];
        return obj;
      },
    });

    return (
      <div className="chart-stock">
        <IceContainer>
          <h4 style={styles.title}>面积图</h4>
          <Chart
            height={400}
            data={dv}
            scale={cols}
            forceFit
            padding={[10, 20, 40, 40]}
          >
            <Axis name="mean" visible={false} />
            <Legend />
            <Axis name="stockRange" visible={false} />
            <Tooltip
              showTitle={false}
              itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>开盘价：{start}</span><br/><span style=&quot;padding-left: 16px&quot;>收盘价：{end}</span><br/><span style=&quot;padding-left: 16px&quot;>最高价：{max}</span><br/><span style=&quot;padding-left: 16px&quot;>最低价：{min}</span><br/><span style=&quot;padding-left: 16px&quot;>成交量：{volumn}</span><br/></li>"
            />
            <Geom type="area" position="date*range" color="#64b5f6" />
            <Geom
              type="schema"
              position="date*stockRange"
              color={[
                'trend',
                (val) => {
                  if (val === 'up') {
                    return '#f04864';
                  }

                  if (val === 'down') {
                    return '#2fc25b';
                  }
                },
              ]}
              tooltip="start*end*highest*lowest"
              shape="candle"
            />
            <Geom type="line" position="date*mean" color="#FACC14" />
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
