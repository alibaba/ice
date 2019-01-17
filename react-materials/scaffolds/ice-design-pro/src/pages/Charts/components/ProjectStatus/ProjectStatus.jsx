import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Timeline } from '@icedesign/base';
import LineChart from './LineChart';

const { Row, Col } = Grid;
const { Item: TimelineItem } = Timeline;

export default class ProjectStatus extends Component {
  static displayName = 'ProjectStatus';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTimeline = () => {
    return (
      <Timeline>
        <TimelineItem
          title="市场调研"
          content={<div>【标题】一段简单的说明当前项目的进度和状态</div>}
          time="2016-06-10 10:30:00"
          state="process"
        />
        <TimelineItem
          title="产品评审"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:30:00"
        />
        <TimelineItem
          title="项目启动"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:03:00"
        />
        <TimelineItem
          title="营销推广"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:03:00"
        />
        <TimelineItem
          title="完成目标"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:03:00"
        />
      </Timeline>
    );
  };

  render() {
    return (
      <div>
        <Row wrap gutter={20}>
          <Col xxs="24" l="12" style={styles.item}>
            <IceContainer title="完成进度">
              <LineChart />
              <div style={styles.projectStatus}>
                <p style={styles.meta}>当前状态</p>
                <h2 style={styles.count}>76,533</h2>
              </div>
            </IceContainer>
          </Col>
          <Col xxs="24" l="12" style={styles.item}>
            <IceContainer title="完成状态" style={styles.container}>
              {this.renderTimeline()}
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '480px',
    overflowY: 'scroll',
  },
  projectStatus: {
    marginTop: '30px',
    paddingTop: '10px',
    borderTop: '1px solid #f5f5f5',
  },
  meta: {
    margin: '10px 0 0',
    fontSize: '12px',
    color: '#666',
  },
  count: {
    margin: '0',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#45a1ff',
  },
};
