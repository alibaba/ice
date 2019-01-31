import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label } from 'bizcharts';
import { Grid, DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';

const { Row, Col } = Grid;

export default class UserStatChart extends Component {
  static displayName = 'UserStatChart';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <ContainerTitle
          title={title}
          extraAfter={
            <DatePicker onChange={(val, str) => console.log(val, str)} />
          }
          style={{ marginBottom: '20px' }}
        />
        <Row wrap gutter="20">
          <Col xxs="24" s="15" l="15">
            <IceContainer title="用户增长数量">
              <Chart
                height={350}
                data={userData}
                forceFit
                padding={[40, 40, 40, 40]}
              >
                <Axis name="month" />
                <Axis name="count" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="interval" position="month*count" />
              </Chart>
            </IceContainer>
          </Col>
          <Col xxs="24" s="9" l="9">
            <IceContainer title="年龄">
              <Chart
                height={124}
                data={ageData}
                forceFit
                padding={[0, 0, 0, 0]}
              >
                <Axis name="count" />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom type="interval" position="age*count" />
              </Chart>
            </IceContainer>

            <IceContainer title="男女比例">
              <Chart
                height={124}
                data={sexRatio}
                forceFit
                padding={[0, 60, 0, 0]}
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="right" offsetY={-44} offsetX={-40} />
                <Tooltip showTitle={false} />
                <Geom
                  type="intervalStack"
                  position="percent"
                  color="item"
                  tooltip={[
                    'item*percent',
                    (item, percent) => {
                      percent += '%';
                      return {
                        name: item,
                        value: percent,
                      };
                    },
                  ]}
                  style={{ lineWidth: 1, stroke: '#fff' }}
                >
                  <Label
                    content="percent"
                    offset={-20}
                    textStyle={{
                      rotate: 0,
                      textAlign: 'center',
                      shadowBlur: 2,
                      shadowColor: 'rgba(0, 0, 0, .45)',
                    }}
                  />
                </Geom>
              </Chart>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

const sexRatio = [
  {
    item: '男',
    percent: 57,
  },
  {
    item: '女',
    percent: 30,
  },
  {
    item: '其他',
    percent: 13,
  },
];

const userData = [
  {
    month: '1 月',
    count: 50,
  },
  {
    month: '2 月',
    count: 60,
  },
  {
    month: '3 月',
    count: 120,
  },
  {
    month: '4 月',
    count: 90,
  },
  {
    month: '5 月',
    count: 100,
  },
  {
    month: '6 月',
    count: 300,
  },
  {
    month: '7 月',
    count: 110,
  },
  {
    month: '8 月',
    count: 320,
  },
  {
    month: '9 月',
    count: 260,
  },
  {
    month: '10 月',
    count: 220,
  },
  {
    month: '11 月',
    count: 420,
  },
  {
    month: '12 月',
    count: 320,
  },
];

const ageData = [
  {
    age: '15 岁',
    count: 10,
  },
  {
    age: '16 岁',
    count: 220,
  },
  {
    age: '17 岁',
    count: 200,
  },
  {
    age: '18 岁',
    count: 530,
  },
  {
    age: '19 岁',
    count: 140,
  },
  {
    age: '20 岁',
    count: 1030,
  },
  {
    age: '21 岁',
    count: 130,
  },
];
