/* eslint global-require: 0 */
import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

const navigation = [
  {
    img: require('./images/TB1wdncx1SSBuNjy0FlXXbBpVXa-200-200.png'),
    title: '待审核课件',
    color: '#f8623b',
    count: '30',
  },
  {
    img: require('./images/TB11ED_xYGYBuNjy0FoXXciBFXa-200-200.png'),
    title: '待批改作业',
    color: '#37D1AB',
    count: '120',
  },
  {
    img: require('./images/TB1Kvg3x4GYBuNjy0FnXXX5lpXa-200-200.png'),
    title: '待批阅试卷',
    color: '#ffa001',
    count: '160',
  },
  {
    img: require('./images/TB1aAH_xYGYBuNjy0FoXXciBFXa-200-200.png'),
    title: '待评分实训',
    color: '#42C0EA',
    count: '69',
  },
  {
    img: require('./images/TB1BMGtyntYBeNjy1XdXXXXyVXa-200-200.png'),
    title: '已审核课件',
    color: '#5798F2',
    count: '85',
  },
  {
    img: require('./images/TB1IQ2_xYGYBuNjy0FoXXciBFXa-200-200.png'),
    title: '已批改作业',
    color: '#B277C9',
    count: '93',
  },
  {
    img: require('./images/TB1o2c3x4GYBuNjy0FnXXX5lpXa-200-200.png'),
    title: '已批阅试卷',
    color: '#475F93',
    count: '185',
  },
  {
    img: require('./images/TB1wQD_xYGYBuNjy0FoXXciBFXa-200-200.png'),
    title: '已评分实训',
    color: '#EF83C4',
    count: '235',
  },
];

export default class OverviewBoard extends Component {
  static displayName = 'OverviewBoard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        {navigation.map((item, index) => {
          return (
            <Col xxs="12" l="6" key={index}>
              <IceContainer style={{ background: item.color }}>
                <div style={styles.navItem}>
                  <div style={styles.imgWrap}>
                    <img src={item.img} alt="" style={styles.img} />
                  </div>
                  <div style={styles.infoWrap}>
                    <p style={styles.count}>{item.count}</p>
                    <h5 style={styles.title}>{item.title}</h5>
                  </div>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  imgWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '62px',
    height: '62px',
    borderRadius: '50%',
    background: '#fff',
  },
  img: {
    width: '30px',
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
  },
  count: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0',
  },
  title: {
    margin: '2px 0',
  },
};
