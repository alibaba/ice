import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../../../../components/ContainerTitle';
import LineChart from '../LineChart';

const data = [
  {
    date: '2018-09-01',
    acc: 84,
  },
  {
    date: '2018-09-02',
    acc: 14,
  },
  {
    date: '2018-09-03',
    acc: 17,
  },
  {
    date: '2018-09-04',
    acc: 56,
  },
  {
    date: '2018-09-05',
    acc: 30,
  },
  {
    date: '2018-09-06',
    acc: 63,
  },
  {
    date: '2018-09-07',
    acc: 24,
  },
  {
    date: '2018-09-08',
    acc: 20,
  },
  {
    date: '2018-09-09',
    acc: 18,
  },
  {
    date: '2018-09-10',
    acc: 15,
  },
  {
    date: '2018-09-11',
    acc: 20,
  },
  {
    date: '2018-09-12',
    acc: 22,
  },
  {
    date: '2018-09-13',
    acc: 23,
  },
  {
    date: '2018-09-14',
    acc: 24,
  },
];

const cols = {
  acc: {
    alias: '提交次数',
  },
};

export default class Commits extends Component {
  static displayName = 'Commits';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ContainerTitle title="最近30天 Commits" />
        <IceContainer style={styles.container}>
          <LineChart cols={cols} data={data} axisName="name" />
        </IceContainer>
      </div>
    );
  }
}

const styles = {};
