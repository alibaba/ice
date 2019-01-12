import React, { Component } from 'react';
import { Grid, Progress, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class ReviewDetailInfo extends Component {
  static displayName = 'ReviewDetailInfo';

  render() {
    return (
      <Row wrap gutter="20">
        <Col s="8" xxs="24">
          <IceContainer style={styles.container} title="好评比率">
            <div style={styles.reviewRatingWrapper}>
              <div style={styles.reviewRating}>
                <span style={styles.reviewRatingIcon}>
                  <span style={styles.reviewRatingScore}>630</span>
                  <Icon
                    size="xxl"
                    style={styles.reviewRatingIconPositive}
                    type="smile"
                  />
                  <span style={styles.reviewRatingRatePositive}>67%</span>
                </span>
              </div>
              <div style={styles.reviewRatingDesc}>好评</div>
            </div>
            <div style={styles.reviewRatingDivideLine} />
            <div style={styles.reviewRatingWrapper}>
              <div style={styles.reviewRating}>
                <span style={styles.reviewRatingIcon}>
                  <span style={styles.reviewRatingScore}>310</span>
                  <Icon
                    size="xxl"
                    style={styles.reviewRatingIconNegative}
                    type="cry"
                  />
                  <span style={styles.reviewRatingRateNegative}>33%</span>
                </span>
              </div>
              <div style={styles.reviewRatingDesc}>差评</div>
            </div>
          </IceContainer>
        </Col>
        <Col s="8" xxs="24">
          <IceContainer style={styles.container} title="邀评目标">
            <div style={styles.reviewTargetProgressWrapper}>
              <Progress
                style={styles.reviewTargetProgress}
                percent={50}
                size="large"
                shape="circle"
                textRender={() => <span>392 份</span>}
              />
            </div>
            <div style={styles.reviewRatingGoalDesc}>
              <p>已经完成一半目标，加油！</p>
            </div>
          </IceContainer>
        </Col>
        <Col s="8" xxs="24">
          <IceContainer style={styles.container} title="邀评排行">
            <div style={styles.reviewLeaderboard}>
              <div style={styles.reviewLeaderboardItem}>
                <span style={styles.reviewLeaderboardItemAvatar}>
                  <img
                    style={styles.reviewLeaderboardItemAvatarImg}
                    width="40"
                    height="40"
                    src={require('./images/TB1j159r21TBuNjy0FjXXajyXXa-499-498.png_80x80.jpg')}
                    alt=""
                  />
                </span>
                <span style={styles.reviewLeaderboardItemName}>李总</span>
                <span style={styles.reviewLeaderboardItemCount}>912 份</span>
              </div>
              <div style={styles.reviewLeaderboardItem}>
                <span style={styles.reviewLeaderboardItemAvatar}>
                  <img
                    style={styles.reviewLeaderboardItemAvatarImg}
                    width="40"
                    height="40"
                    src={require('./images/TB1Daimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg')}
                    alt=""
                  />
                </span>
                <span style={styles.reviewLeaderboardItemName}>王总</span>
                <span style={styles.reviewLeaderboardItemCount}>675 份</span>
              </div>
              <div style={styles.reviewLeaderboardItem}>
                <span style={styles.reviewLeaderboardItemAvatar}>
                  <img
                    style={styles.reviewLeaderboardItemAvatarImg}
                    width="40"
                    height="40"
                    src={require('./images/TB1FGimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg')}
                    alt=""
                  />
                </span>
                <span style={styles.reviewLeaderboardItemName}>赵总</span>
                <span style={styles.reviewLeaderboardItemCount}>588 份</span>
              </div>
              <div style={styles.reviewLeaderboardItem}>
                <span style={styles.reviewLeaderboardItemAvatar}>
                  <img
                    style={styles.reviewLeaderboardItemAvatarImg}
                    width="40"
                    height="40"
                    src={require('./images/TB1AdOerVOWBuNjy0FiXXXFxVXa-499-498.png_80x80.jpg')}
                    alt=""
                  />
                </span>
                <span style={styles.reviewLeaderboardItemName}>马总</span>
                <span style={styles.reviewLeaderboardItemCount}>462 份</span>
              </div>
              <div style={styles.reviewLeaderboardItem}>
                <span style={styles.reviewLeaderboardItemAvatar}>
                  <img
                    style={styles.reviewLeaderboardItemAvatarImg}
                    width="40"
                    height="40"
                    src={require('./images/TB1FWimr1SSBuNjy0FlXXbBpVXa-499-498.png_80x80.jpg')}
                    alt=""
                  />
                </span>
                <span style={styles.reviewLeaderboardItemName}>雷总</span>
                <span style={styles.reviewLeaderboardItemCount}>376 份</span>
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
    height: 316,
  },
  reviewRatingWrapper: {
    padding: '20px 0',
  },
  reviewRatingDesc: {
    color: '#999',
    textAlign: 'center',
  },
  reviewRating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewRatingScore: {
    fontSize: 36,
    position: 'absolute',
    right: 'calc(100% + 20px)',
  },
  reviewRatingIcon: {
    position: 'relative',
    margin: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewRatingRatePositive: {
    fontSize: 26,
    color: '#2ecc71',
    position: 'absolute',
    left: 'calc(100% + 20px)',
  },
  reviewRatingRateNegative: {
    fontSize: 26,
    color: '#e74c3c',
    position: 'absolute',
    left: 'calc(100% + 20px)',
  },
  reviewRatingIconPositive: {
    color: '#2ecc71',
  },
  reviewRatingIconNegative: {
    color: '#e74c3c',
  },
  reviewRatingDivideLine: {
    borderTop: '1px solid #eee',
    width: 100,
    margin: '0 auto',
  },
  reviewTargetProgressWrapper: {
    padding: '30px 0 20px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  reviewRatingGoalDesc: {
    textAlign: 'center',
  },
  reviewLeaderboardItem: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  },
  reviewLeaderboardItemAvatar: {
    marginRight: 15,
  },
  reviewLeaderboardItemAvatarImg: {
    borderRadius: '50%',
    display: 'block',
  },
  reviewLeaderboardItemName: {
    flex: 1,
  },
};
