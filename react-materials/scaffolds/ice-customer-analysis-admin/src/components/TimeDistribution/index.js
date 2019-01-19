import React, { Component } from 'react';
import { DatePicker } from '@alifd/next';
import ContainerTitle from '../ContainerTitle';
import AreaChart from './AreaChart';

export default class TimeDistribution extends Component {
  static displayName = 'TimeDistribution';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <ContainerTitle
          title={this.props.title}
          extraAfter={
            <DatePicker onChange={(val, str) => console.log(val, str)} />
          }
        />
        <AreaChart />
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: '20px',
  },
};
