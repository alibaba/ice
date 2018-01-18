import React, { Component } from 'react';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import './ChartPoint.scss';

export default class ChartPoint extends Component {
  static displayName = 'ChartPoint';

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
      .get('/mock/chart-point.json')
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          data: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="chart-point">
        <IceContainer>
          <h4 style={styles.title}>点图</h4>
          <Chart height={400} data={this.state.data} forceFit>
            <Tooltip
              showTitle={false}
              crosshairs={{ type: 'cross' }}
              itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
            />
            <Axis name="height" />
            <Axis name="weight" />
            <Geom
              type="point"
              position="height*weight"
              opacity={0.65}
              shape="circle"
              size={4}
              tooltip={[
                'gender*height*weight',
                (gender, height, weight) => {
                  return {
                    name: gender,
                    value: `${height}(cm), ${weight}(kg)`,
                  };
                },
              ]}
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
