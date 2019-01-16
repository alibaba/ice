/* eslint no-plusplus: 0 */
import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend, Guide } from 'bizcharts';

const { Line, RegionFilter, DataMarker } = Guide;
const data = [];

function findMax() {
  let maxValue = 0;
  let maxObj = null;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.value > maxValue /* && d.type === 'today' */) {
      maxValue = d.value;
      maxObj = d;
    }
  }
  return maxObj;
}

const scale = {
  time: {
    alias: '时间',
    type: 'time',
    mask: 'MM:ss',
    nice: false,
  },
  value: {
    alias: '占用率',
    min: 0,
    max: 120,
  },
  type: {
    type: 'cat',
  },
};

class RegionFilterRealtime extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const now = new Date();
      const time = now.getTime();
      const value1 = parseInt(30 + Math.random() * 50, 10);
      const direction = Math.random() > 0.5 ? 1 : -1;
      const value2 = parseInt(value1 + Math.random() * 20 * direction, 10);
      const newData = this.state.data.map(rec => rec);

      if (newData.length >= 200) {
        newData.shift();
        newData.shift();
      }
      newData.push({
        time,
        value: value2,
        type: '昨天',
      });
      newData.push({
        time,
        value: value1,
        type: '今天',
      });

      if (newData.length > 20) {
        newData.shift();
        newData.shift();
      }
      this.setState({
        data: newData,
      });
    }, 1000);
  }

  render() {
    return (
      <Chart
        height={360}
        padding={[40]}
        data={this.state.data}
        scale={scale}
        forceFit
      >
        <Axis />
        <Axis name="predict" visible={false} />
        <Legend name="attachLast" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom
          type="line"
          position="time*value"
          shape="smooth"
          color={['type', ['#cccccc', '#2593fc']]}
          size={2}
          animate={{
            update: {
              duration: 0,
            },
          }}
        />
        <Guide>
          <Line
            top
            start={['min', 60]}
            end={['max', 60]}
            lineStyle={{
              stroke: '#F5222D',
              lineWidth: 2,
            }}
            text={{
              content: '预警线',
              position: 'start',
              offsetX: 20,
              offsetY: -5,
              style: {
                fontSize: 14,
                fill: '#F5222D',
                opacity: 0.5,
              },
            }}
          />
          <RegionFilter
            top
            start={['min', 60]}
            end={['max', 100]}
            color="#F5222D"
            apply={['line']}
          />
          <DataMarker
            top
            content="当前最大峰值"
            position={() => {
              const obj = findMax();
              if (obj) {
                return [obj.time, obj.value];
              }
              return [0, 0];
            }}
            style={{
              text: {
                fontSize: 13,
              },
              point: {
                stroke: '#606060',
              },
            }}
            lineLength={50}
          />
        </Guide>
      </Chart>
    );
  }
}

export default RegionFilterRealtime;
