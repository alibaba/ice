import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Progress } from '@icedesign/base';
import MapChart from './MapChart';

const { Row, Col } = Grid;
const data = [
  {
    pic: 'https://img.alicdn.com/tfs/TB1BnWWbwmTBuNjy1XbXXaMrVXa-263-263.png',
    city: '北京',
    percent: '95',
  },
  {
    pic: 'https://img.alicdn.com/tfs/TB1sFe1brGYBuNjy0FoXXciBFXa-400-400.png',
    city: '上海',
    percent: '70',
  },
  {
    pic: 'https://img.alicdn.com/tfs/TB1MlrfbqmWBuNjy1XaXXXCbXXa-400-400.png',
    city: '广州',
    percent: '40',
  },
  {
    pic: 'https://img.alicdn.com/tfs/TB18Va1brGYBuNjy0FoXXciBFXa-363-363.png',
    city: '杭州',
    percent: '20',
  },
];

export default class VisitorsLocationChart extends Component {
  static displayName = 'VisitorsLocationChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row type="wrap">
        <Col xxs="24" l="24">
          <IceContainer title="活跃地区">
            <Row type="wrap">
              <Col xxs="24" l="8">
                {data.map((item, index) => {
                  return (
                    <Row style={styles.item} key={index}>
                      <Col xxs="6" l="6">
                        <img src={item.pic} style={styles.itemPic} alt="" />
                      </Col>
                      <Col xxs="17" l="17">
                        <p style={styles.itemCity}>{item.city}</p>
                        <Progress percent={item.percent} />
                      </Col>
                    </Row>
                  );
                })}
              </Col>
              <Col xxs="24" l="16">
                <MapChart />
              </Col>
            </Row>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  item: {
    marginBottom: '20px',
  },
  itemPic: {
    width: '100%',
    maxWidth: '80px',
    borderRadius: 50,
  },
  itemCity: {
    margin: '10px 0 0',
  },
  itemBody: {},
};
