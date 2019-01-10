/* eslint no-nested-ternary:0 */
import React, { Component } from 'react';
import { Icon, Grid } from '@alifd/next';
import Img from '@icedesign/img';

const { Row, Col } = Grid;

const data = [
  {
    isV: true,
    picUrl: require('./images/avatar.jpg'),
    nick: '靓靓胖大仙',
    tag: ['5月活跃服务方'],
    fansCount: '180302',
    priceList: [
      {
        fee: '500.00',
        subject: '短视频制作可投稿',
        cateName: '宝贝主图视频制作',
      },
      {
        fee: '500.00',
        subject: '短视频制作可投稿',
        cateName: '宝贝主图视频制作',
      },
    ],
    titleArray: [
      {
        name: '合作任务数',
        value: '6011',
      },
      {
        name: '任务完成率',
        value: '96%',
      },
      {
        name: '服务评分',
        value: '4.9',
      },
      {
        name: '垂直领域',
        value: '美搭',
      },
      {
        name: '制作方',
        value: '淘女郎',
      },
    ],
  },
];

export default class UserProfileCard extends Component {
  static displayName = 'UserProfileCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.anchorCardContent}>
        {data.map((item, idx) => {
          return (
            <Row wrap style={styles.anchorCard} key={idx}>
              <Col l="4">
                <a href="#" style={styles.anchorProfileInfo} target="_blank">
                  <div style={styles.maskLayer} />
                  <Img
                    width={160}
                    height={160}
                    src={item.picUrl}
                    type="cover"
                    style={styles.anchorAvatar}
                  />
                  <div style={styles.anchorInfoBody}>
                    <h3 style={styles.anchorName}>
                      {item.nick}
                      {item.isV && (
                        <img
                          src={require('./images/vflag.png')}
                          style={styles.anchorVflag}
                          alt=""
                        />
                      )}
                    </h3>
                    <div style={styles.anchorFans}>
                      <span style={styles.fansText}>粉丝</span>
                      <span style={styles.fansCount}>
                        {item.fansCount > 10000
                          ? `${Math.ceil(item.fansCount / 100) / 100}万`
                          : item.fansCount
                          ? item.fansCount
                          : 0}
                      </span>
                    </div>
                  </div>
                </a>
              </Col>

              <Col l="4">
                <ul style={styles.anchorBaseInfo}>
                  {item.titleArray &&
                    item.titleArray.length &&
                    item.titleArray.map((info, index) => {
                      return (
                        <li key={index} style={styles.infoItemBody}>
                          <span style={styles.infoItemLabel}>
                            {info.name}:{' '}
                          </span>
                          {info.logo && (
                            <img
                              src={info.logo}
                              alt=""
                              style={{
                                width: '18px',
                                height: '18px',
                                margin: '0 5px',
                                borderRadius: '12px',
                              }}
                            />
                          )}
                          <span style={styles.infoItemValue}>{info.value}</span>
                        </li>
                      );
                    })}

                  <div style={styles.infoItemTags}>
                    {item.tag &&
                      item.tag.map((tag, id) => {
                        return (
                          <span style={styles.infoItemTag} key={id}>
                            {tag.substr(0, 11)}
                          </span>
                        );
                      })}
                  </div>
                </ul>
              </Col>

              <Col l="15">
                <ul style={styles.anchorLiveInfo}>
                  {item.priceList.map((live, id) => {
                    return (
                      <li
                        style={styles.liveInfoItem}
                        key={id}
                        data-spm={`${this.props.cateType}-${item.userId}-${
                          live.skuId
                        }`}
                      >
                        <a
                          to={live.url}
                          style={styles.liveInfoItemLink}
                          target="_blank"
                        >
                          <span style={styles.infoItemType}>
                            宝贝主图视频制作
                          </span>
                          <span style={styles.infoItemLine} />
                          <span style={styles.infoItemTitle}>
                            {live.subject}
                          </span>
                          <span style={styles.infoItemPrice}>{live.fee}</span>
                          <Icon
                            type="arrow-right"
                            size="xs"
                            style={styles.customArrorRightIcon}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

const styles = {
  anchorCard: {
    marginTop: '20px',
    background: '#fff',
    overflow: 'hidden',
    height: '216px',
    borderRadius: '4px',
    display: 'flex',
    mibWidth: '1080px',
  },

  anchorProfileInfo: {
    display: 'block',
    height: '216px',
    marginRight: '24px',
    position: 'relative',
    color: '#333',
  },

  maskLayer: {
    backgroundImage: `url(${require('./images/mask.png')})`,
    backgroundSize: 'cover',
    position: 'absolute',
    width: '100%',
    bottom: '45px',
    height: '170px',
  },

  anchorAvatar: {
    display: 'block',
  },

  anchorInfoBody: {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
  },

  anchorName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 5px',
    fontSize: '18px',
    lineHeight: '22px',
  },

  anchorVflag: {
    width: '14px',
    height: '14px',
    marginLeft: '5px',
  },

  anchorFans: {
    marginBottom: '8px',
  },

  fansText: {
    color: '#999',
  },

  fansCount: {
    marginLeft: '5px',
    fontSize: '16px',
  },

  anchorLocation: {
    color: '#999',
    marginBottom: '8px',
  },

  anchorBaseInfo: {
    marginRight: '20px',
    padding: '20px 0',
  },

  infoItemBody: {
    display: 'flex',
    margin: '11px 0',
  },

  infoItemTags: {
    marginTop: '12px',
  },

  infoItemTag: {
    background: '#fdeaee',
    color: '#ff2c54',
    padding: '4px 8px',
    borderRadius: '10px',
    margin: '0 4px 4px 0',
    display: 'inline-block',
    fontSize: '12px',
  },

  infoItemLabel: {
    color: '#999',
    fontSize: '12px',
    marginRight: '2px',
    minWidth: '54px',
  },

  infoItemValue: {
    color: '#333',
    fontSize: '12px',
  },

  anchorLiveInfo: {
    margin: '20px 0',
  },

  liveInfoItem: {
    position: 'relative',
    background: '#f5f5f5',
    marginBottom: '10px',
    padding: '13px 20px',
    lineHeight: '26px',
    borderRadius: '4px',
    overflow: 'hidden',
  },

  liveInfoItemLink: {
    color: '#333',
  },

  customArrorRightIcon: {
    position: 'absolute',
    right: '10px',
    color: '#999',
  },

  infoItemType: {
    float: 'left',
    maxWidth: '120px',
    paddingRight: '20px',
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#666',
  },

  infoItemLine: {
    float: 'left',
    position: 'relative',
    top: '6px',
    width: '1px',
    height: '12px',
    background: '#999',
  },

  infoItemTitle: {
    float: 'left',
    maxWidth: '240px',
    padding: '0 20px',
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  infoItemPrice: {
    float: 'right',
    width: '100px',
    textAlign: 'right',
    color: '#fe5c38',
    fontSize: '20px',
    marginRight: '10px',
  },
};
