import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Timeline } from '@alifd/next';
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
          title="项目完成"
          content={<div>【标题】一段简单的说明当前项目的进度和状态</div>}
          time="2016-06-10 10:30:00"
          state="process"
        />
        <TimelineItem
          title="开发测试"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:30:00"
        />
        <TimelineItem
          title="项目启动"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:03:00"
        />
        <TimelineItem
          title="产品设计"
          content="【标题】一段简单的说明当前项目的进度和状态"
          time="2016-06-10 09:03:00"
        />
        <TimelineItem
          title="分析调研"
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
                <p style={styles.meta}>项目状态</p>
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
