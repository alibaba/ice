import React from 'react';
import PropTypes from 'prop-types';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class LineChart extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    fields: PropTypes.array,
    buttons: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    fields: [],
    buttons: [],
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  handleClick = (index, value) => {
    this.setState(
      {
        currentIndex: index,
      },
      () => {
        this.props.onChange(value);
      }
    );
  };

  render() {
    const { data, fields } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data);

    dv.transform({
      type: 'fold',
      fields,
      key: 'city',
      value: 'temperature',
    });

    const cols = {
      month: {
        range: [0, 1],
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.head}>
          {this.props.buttons.map((item, index) => {
            const actived =
              this.state.currentIndex === index ? styles.actived : {};
            return (
              <a
                key={index}
                style={{ ...styles.button, ...actived }}
                onClick={() => this.handleClick(index, item.value)}
              >
                {item.text}
              </a>
            );
          })}
        </div>
        <Chart height={400} padding={[40]} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="month" />
          <Axis
            name="temperature"
            label={{
              formatter: (val) => `${val}`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color="city"
            shape="smooth"
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            shape="circle"
            color="city"
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

const styles = {
  head: {
    marginBottom: '20px',
  },
  button: {
    display: 'inline-block',
    lineHeight: '28px',
    marginRight: '10px',
    padding: '0 15px',
    height: '28px',
    minWidth: '90px',
    borderRadius: '2px',
    fontSize: '12px',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  actived: {
    background: '#676ca8',
    color: '#fff',
  },
};
