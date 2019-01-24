import React, { Component } from 'react';
import { DatePicker, Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import ContainerTitle from '../ContainerTitle';

const { Row, Col } = Grid;

const mockData = [
  {
    title: '卖品区总客流量',
    value: '233,495',
    ratio: '66%',
    change: 'up',
  },
  {
    title: '卖品区日均客流',
    value: '4,592',
    ratio: '22%',
    change: 'down',
  },
  {
    title: '平均停留时长',
    value: '0.8h',
    ratio: '10%',
    change: 'up',
  },
];

export default class PassengerFlow extends Component {
  render() {
    const { title } = this.props;
    return (
      <IceContainer>
        <ContainerTitle
          title={title}
          extraAfter={
            <DatePicker onChange={(val, str) => console.log(val, str)} />
          }
          style={{ marginBottom: '20px' }}
        />
        <Row wrap gutter="20">
          {mockData.map((item, index) => {
            return (
              <Col l="4" key={index}>
                <div style={styles.item}>
                  <div style={styles.title}>{item.title}</div>
                  <div style={styles.num}>{item.value}</div>
                  <div style={styles.ratio}>
                    <Icon
                      type={`arrow-${item.change}-filling`}
                      size="small"
                      style={{
                        ...styles[`arrow${item.change}Icon`],
                        ...styles.arrowIcon,
                      }}
                    />
                    环比上涨 {item.ratio}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    border: '1px solid #e1e2e3',
    padding: '15px',
  },
  title: {
    color: '#666',
    fontSize: '13px',
    marginBottom: '15px',
  },
  num: {
    color: '#333',
    fontWeight: '600',
    marginBottom: '15px',
  },
  ratio: {
    color: '#666',
    fontSize: '13px',
  },
  arrowIcon: {
    marginRight: '5px',
  },
  arrowupIcon: {
    color: 'red',
  },
  arrowdownIcon: {
    color: 'green',
  },
};
