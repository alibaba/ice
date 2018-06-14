/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import { Chart, Geom, Tooltip } from 'bizcharts';
import PropTypes from 'prop-types';

export default class ColumnChart extends Component {
  static displayName = 'ColumnChart';

  static propTypes = {
    type: PropTypes.string,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { color, data } = this.props;
    const cols = {
      sales: { tickInterval: 20 },
    };
    return (
      <Chart height={200} forceFit padding={[2]} data={data} scale={cols}>
        <Geom
          type={this.props.type || 'interval'}
          position="month*sales"
          color={color || '#3fa1ff'}
          shape="smooth"
        />
        <Tooltip crosshairs={{ type: 'y' }} />
      </Chart>
    );
  }
}
