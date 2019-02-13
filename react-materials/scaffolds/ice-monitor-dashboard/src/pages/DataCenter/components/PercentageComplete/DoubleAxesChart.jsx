/* eslint no-plusplus: 0 */
import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

class DoubleAxesChart extends React.Component {
  render() {
    const data = [
      {
        time: '10:10',
        call: 4,
        waiting: 2,
        people: 2,
      },
      {
        time: '10:15',
        call: 2,
        waiting: 6,
        people: 3,
      },
      {
        time: '10:20',
        call: 13,
        waiting: 2,
        people: 5,
      },
      {
        time: '10:25',
        call: 9,
        waiting: 9,
        people: 1,
      },
      {
        time: '10:30',
        call: 5,
        waiting: 2,
        people: 3,
      },
      {
        time: '10:35',
        call: 8,
        waiting: 2,
        people: 1,
      },
      {
        time: '10:40',
        call: 13,
        waiting: 1,
        people: 2,
      },
    ];
    const scale = {
      call: {
        min: 0,
      },
      people: {
        min: 0,
      },
      waiting: {
        min: 0,
      },
    };
    let chartIns = null;
    return (
      <div>
        <Chart
          height={260}
          padding={[40]}
          scale={scale}
          forceFit
          data={data}
          onGetG2Instance={(chart) => {
            chartIns = chart;
          }}
        >
          <Legend
            custom
            allowAllCanceled
            items={[
              {
                value: 'waiting',
                marker: {
                  symbol: 'square',
                  fill: '#3182bd',
                  radius: 5,
                },
              },
              {
                value: 'people',
                marker: {
                  symbol: 'hyphen',
                  stroke: '#ffae6b',
                  radius: 5,
                  lineWidth: 3,
                },
              },
            ]}
            onClick={(ev) => {
              const item = ev.item;
              const value = item.value;
              const checked = ev.checked;
              const geoms = chartIns.getAllGeoms();

              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i];

                if (geom.getYScale().field === value) {
                  if (checked) {
                    geom.show();
                  } else {
                    geom.hide();
                  }
                }
              }
            }}
          />
          <Axis
            name="people"
            grid={null}
            label={{
              textStyle: {
                fill: '#ee706d',
              },
            }}
          />
          <Tooltip />
          <Geom type="interval" position="time*waiting" color="#447eff" />
          <Geom
            type="line"
            position="time*people"
            color="#ee706d"
            size={2}
            shape="smooth"
          />
          <Geom
            type="point"
            position="time*people"
            color="#ee706d"
            size={2}
            shape="circle"
          />
        </Chart>
      </div>
    );
  }
}

export default DoubleAxesChart;
