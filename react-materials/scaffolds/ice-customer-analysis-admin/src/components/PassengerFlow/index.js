import React, { Component } from 'react';
import { DatePicker, Grid, Icon } from '@icedesign/base';
import ContainerTitle from '../ContainerTitle';

const { Row, Col } = Grid;

export default class PassengerFlow extends Component {
  static displayName = 'PassengerFlow';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, data } = this.props;
    return (
      <div style={styles.container}>
        <ContainerTitle
          title={title}
          extraAfter={
            <DatePicker onChange={(val, str) => console.log(val, str)} />
          }
          style={{ marginBottom: '20px' }}
        />
        <Row wrap gutter="20">
          {data.map((item, index) => {
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
      </div>
    );
  }
}

const styles = {
  container: {
    marginBottom: '20px',
  },
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
