import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';

import Summary from '../Summary';

const ScrollOverPack = ScrollAnim.OverPack;
const { Row, Col } = Grid;

const MOCK_DATA = [
  require('./images/TB1P0HTA7yWBuNjy0FpXXassXXa-400-120.png'),
  require('./images/TB13_PSAYGYBuNjy0FoXXciBFXa-400-120.png'),
  require('./images/TB13yHEBN9YBuNjy0FfXXXIsVXa-400-120.png'),
  require('./images/TB15IrEBHGYBuNjy0FoXXciBFXa-400-120.png'),
  require('./images/TB1P0HTA7yWBuNjy0FpXXassXXa-400-120.png'),
  require('./images/TB13_PSAYGYBuNjy0FoXXciBFXa-400-120.png'),
  require('./images/TB13yHEBN9YBuNjy0FfXXXIsVXa-400-120.png'),
  require('./images/TB15IrEBHGYBuNjy0FoXXciBFXa-400-120.png'),
];

export default class Sponsorship extends Component {
  static displayName = 'Sponsorship';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <ScrollOverPack>
            <QueueAnim delay={200} duration={1500} type="bottom">
              <Row key="row">
                <Col l="8">
                  <Summary num={4} title="Sponsorship" subTitle="赞助商" />
                </Col>
                <Col l="16">
                  <Row wrap>
                    {MOCK_DATA.map((src, index) => {
                      return (
                        <Col l="8" key={index}>
                          <a href="#" style={styles.itemLink}>
                            <img src={src} alt="" style={styles.itemLogo} />
                          </a>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </QueueAnim>
          </ScrollOverPack>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#000',
    height: '100vh',
  },
  content: {
    position: 'relative',
    width: '1200px',
    margin: '0 auto',
    paddingTop: '180px',
  },
  itemLink: {
    display: 'block',
    marginBottom: '50px',
  },
  itemLogo: {
    maxWidth: '180px',
  },
};
