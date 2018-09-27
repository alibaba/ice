import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import LineChart from '../LineChart';

const data = [
  {
    date: '2018-09-01',
    acc: 0,
  },
  {
    date: '2018-09-02',
    acc: 20,
  },
  {
    date: '2018-09-03',
    acc: 17,
  },
  {
    date: '2018-09-04',
    acc: 20,
  },
  {
    date: '2018-09-05',
    acc: 21,
  },
  {
    date: '2018-09-06',
    acc: 20,
  },
  {
    date: '2018-09-07',
    acc: 21,
  },
];

const cols = {
  acc: {
    alias: '讨论次数',
  },
};

export default class Commits extends Component {
  static displaydate = 'Commits';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <IceContainer title="本周讨论">
          <LineChart cols={cols} data={data} axisdate="date" />
        </IceContainer>
      </div>
    );
  }
}
