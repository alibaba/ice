import React, { Component } from 'react';
import { Grid, Rating } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Progress from './Progress';

const { Row, Col } = Grid;

export default class ReviewOverview extends Component {
  static displayName = 'ReviewOverview';

  render() {
    return (
      <Row wrap gutter="20">
        <Col s="12" xxs="24">
          <IceContainer style={styles.container} title="评价概览">
            <div style={styles.overviewData}>
              388 <span style={styles.overviewDataUnit}>分</span>
            </div>
            <div style={styles.overviewDataDetail}>
              <div>
                <div style={styles.overviewDataDetailCount}>+21.8%</div>
                <div style={styles.overviewDataDetailDesc}>
                  好评环比增长比例
                </div>
              </div>
              <div>
                <div style={styles.overviewDataDetailCount}>+10.2%</div>
                <div style={styles.overviewDataDetailDesc}>
                  好评同比增长比例
                </div>
              </div>
              <div>
                <div style={styles.overviewDataDetailCount}>+52</div>
                <div style={styles.overviewDataDetailDesc}>
                  好评环比增长数量
                </div>
              </div>
            </div>
            <div style={styles.overviewDataExtraLinks}>
              <div style={styles.overviewDataExtraLinksTitle}>扩展链接</div>
              <div style={styles.overviewDataExtraLinksWrapper}>
                <a style={styles.overviewDataExtraLink} href="" target="_blank">
                  微博
                </a>
                <a style={styles.overviewDataExtraLink} href="" target="_blank">
                  知乎
                </a>
                <a style={styles.overviewDataExtraLink} href="" target="_blank">
                  头条
                </a>
              </div>
            </div>
          </IceContainer>
        </Col>
        <Col s="12" xxs="24">
          <IceContainer style={styles.container} title="评分概览">
            <div style={styles.overviewRatingWrapper}>
              <span style={styles.overviewRatingCount}>4.5</span>
              <span style={styles.overviewRating}>
                <Rating value={4.5} disabled />
              </span>
            </div>
            <div style={styles.overviewDetail}>
              <div style={styles.overviewDetailItem}>
                <span style={styles.overviewDetailItemText}>5 星</span>
                <span style={styles.overviewDetailItemPercentWrapper}>
                  <Progress
                    style={styles.overviewDetailItemPercent}
                    color="#27ae60"
                    percent={90}
                    extra="480"
                  />
                </span>
              </div>
              <div style={styles.overviewDetailItem}>
                <span style={styles.overviewDetailItemText}>4 星</span>
                <span style={styles.overviewDetailItemPercentWrapper}>
                  <Progress
                    style={styles.overviewDetailItemPercent}
                    color="#2980b9"
                    percent={70}
                    extra="270"
                  />
                </span>
              </div>
              <div style={styles.overviewDetailItem}>
                <span style={styles.overviewDetailItemText}>3 星</span>
                <span style={styles.overviewDetailItemPercentWrapper}>
                  <Progress
                    style={styles.overviewDetailItemPercent}
                    color="#f1c40f"
                    percent={10}
                    extra="40"
                  />
                </span>
              </div>
              <div style={styles.overviewDetailItem}>
                <span style={styles.overviewDetailItemText}>2 星</span>
                <span style={styles.overviewDetailItemPercentWrapper}>
                  <Progress
                    style={styles.overviewDetailItemPercent}
                    color="#e67e22"
                    percent={4}
                    extra="10"
                  />
                </span>
              </div>
              <div style={styles.overviewDetailItem}>
                <span style={styles.overviewDetailItemText}>1 星</span>
                <span style={styles.overviewDetailItemPercentWrapper}>
                  <Progress
                    style={styles.overviewDetailItemPercent}
                    color="#e74c3c"
                    percent={0}
                    extra="0"
                  />
                </span>
              </div>
            </div>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  container: {
    height: 255,
  },
  overviewData: {
    marginTop: 25,
    fontSize: 30,
  },
  overviewDataUnit: {
    fontSize: 18,
  },
  overviewDataDetail: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  overviewDataDetailCount: {
    fontSize: 18,
  },
  overviewDataDetailDesc: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  overviewDataExtraLinks: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: '1px solid #eee',
  },
  overviewDataExtraLinksTitle: {
    fontSize: 12,
    color: '#666',
  },
  overviewDataExtraLinksWrapper: {
    marginTop: 10,
  },
  overviewDataExtraLink: {
    marginRight: 5,
  },
  overviewRatingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  overviewRatingCount: {
    fontSize: 30,
    marginRight: 10,
  },
  overviewDetail: {
    marginTop: 20,
  },
  overviewDetailItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  overviewDetailItemPercentWrapper: {
    flex: 1,
  },
  overviewDetailItemPercent: {
    display: 'inline-block',
  },
  overviewDetailItemText: {
    marginRight: 10,
  },
};
