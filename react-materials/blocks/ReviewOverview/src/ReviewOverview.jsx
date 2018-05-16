import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class ReviewOverview extends Component {
  static displayName = 'ReviewOverview';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col span="11">
          <IceContainer title="评价概览">
            <div style={styles.overviewData}>388</div>
            <div style={styles.overviewDataDetail}>
              <div>
                <div>+21.8%</div>
                <div>好评环比增长比例</div>
              </div>
              <div>
                <div>+52</div>
                <div>好评环比增长数量</div>
              </div>
            </div>
            <div style={styles.overviewDataExtraLinks}>
              <div style={styles.overviewDataExtraLinksTitle}>扩展链接</div>
              <div>
                <a href="" target="_blank">
                  微博
                </a>
                <a href="" target="_blank">
                  知乎
                </a>
                <a href="" target="_blank">
                  头条
                </a>
              </div>
            </div>
          </IceContainer>
        </Col>
        <Col span="11">
          <IceContainer title="评分概览">col-4</IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  overviewData: {
    fontSize: 30,
  },
};
