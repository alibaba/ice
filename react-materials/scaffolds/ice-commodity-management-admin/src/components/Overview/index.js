import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Icon, Balloon } from '@alifd/next';

const { Row, Col } = Grid;

export default class Overview extends Component {
  renderHelp = () => {
    return (
      <Balloon
        trigger={<Icon type="help" size="xs" />}
        align="t"
        alignEdge
        closable={false}
      >
        相关说明
      </Balloon>
    );
  };

  render() {
    const { data = [], title = '', col = 4 } = this.props;
    return (
      <IceContainer title={title}>
        <Row wrap>
          {data.map((item, index) => {
            const hasBorder = (index + 1) % col !== 0 ? styles.border : {};
            return (
              <Col
                l={24 / col}
                key={index}
                style={{ ...styles.item, ...hasBorder }}
              >
                <div style={styles.title}>
                  {item.title} {this.renderHelp()}
                </div>
                <div style={styles.value}>{item.value}</div>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  border: {
    borderRight: '1px solid #F0F0F0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  value: {
    fontSize: '22px',
    color: '#333',
  },
};
