import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  hyThirdPartyWrapper: {
    background: '#fff',
    minWidth: '1280px',
  },
  hyThirdParty: {
    paddingTop: '47px',
    paddingBottom: '40px',
    textAlign: 'center',
    width: '1200px',
    margin: '0 auto',
  },
  hyThirdPartyTitle: {
    position: 'relative',
    fontFamily: 'Microsoft YaHei',
    fontSize: '26px',
    lineHeight: '40px',
    color: '#999',
    fontWeight: '400',
    verticalAlign: 'middle',
    marginBottom: '40px',
  },
  thirdPartyMore: {
    position: 'absolute',
    right: '0',
    top: '12px',
    color: '#108ee9',
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: '400',
    textDecoration: 'none',
  },
  thirdPartyDetails: {
    position: 'relative',
    height: '400px',
    margin: '0',
    padding: '0',
  },
  thirdPartyDetail: {
    // "opacity": "0",
    pointerEvents: 'none',
    zIndex: '0',
    fontSize: '0',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    display: 'block',
    WebkitTransition: 'opacity .3s linear',
    transition: 'opacity .3s linear',
  },
  thirdPartyDetailItem: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '270px',
    height: '400px',
    borderRadius: '2px 2px 0 0',
    margin: '0 20px',
    border: '1px solid #eaeaea',
    boxSizing: 'border-box',
    WebkitTransition: '-webkit-transform .2s linear',
    transition: 'transform .2s linear,\n-webkit-transform .2s linear',
  },
  thirdPartyDetailItemFirst: {
    marginLeft: '0',
  },
  thirdPartyDetailItemLast: {
    marginRight: '0',
  },
  thirdPartyDetailImg: {
    width: '270px',
    height: '180px',
    borderRadius: '2px 2px 0 0',
    position: 'relative',
    left: '-1px',
    border: '0',
  },
  thirdPartyName: {
    marginTop: '20px',
    fontSize: '20px',
    lineHeight: '28px',
    color: '#333',
    fontWeight: '600',
  },
  thirdPartySold: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '20px',
  },
  thirdPartySoldNumber: {
    color: '#108ee9',
    fontWeight: '500',
  },
  thirdPartyDesc: {
    margin: '14px 15px 0',
    color: '#333',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '20px',
    height: '60px',
  },
  thirdPartyLink: {
    marginTop: '15px',
    display: 'inline-block',
    padding: '5px 37px',
    fontSize: '14px',
    color: '#108ee9',
    border: '1px solid #108ee9',
    borderRadius: '4px',
    WebkitTransition: 'all .2s linear',
    transition: 'all .2s linear',
  },
};

export default class CardItems extends Component {
  static displayName = 'CardItems';

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="hy-third-party-wrapper"
        style={styles.hyThirdPartyWrapper}
      >
        <div className="hy-third-party" style={styles.hyThirdParty}>
          <h3 className="hy-third-party-title" style={styles.hyThirdPartyTitle}>
            第三方服务推荐
            <a
              className="third-party-more"
              style={styles.thirdPartyMore}
              target="_blank"
              href="https://app.alipay.com/commodity/v2/ant/merchandise/searchMerchandise.htm?categoryId=102793"
            >
              查看更多服务
            </a>
          </h3>

          <div className="third-party-details" style={styles.thirdPartyDetails}>
            <div
              className="third-party-detail selected"
              style={styles.thirdPartyDetail}
            >
              <div
                className="third-party-detail-item"
                style={{
                  ...styles.thirdPartyDetailItem,
                  ...styles.thirdPartyDetailItemFirst,
                }}
              >
                <img
                  className="third-party-detail-img"
                  style={styles.thirdPartyDetailImg}
                  src="https://gw.alipayobjects.com/zos/rmsportal/geocpIkIixaGovHECTdw.svg"
                />
                <h5 className="third-party-name" style={styles.thirdPartyName}>
                  付呗物业
                </h5>
                <p className="third-party-sold" style={styles.thirdPartySold}>
                  已售：<span
                    className="third-party-sold-number"
                    style={styles.thirdPartySoldNumber}
                  >
                    474
                  </span>
                </p>
                <p className="third-party-desc" style={styles.thirdPartyDesc}>
                  解决社区物业缴费中遇到的难题，实现物业线上缴费，公告触达，服务线上申请，财务分析，提供独立的互联网+社区平台
                </p>
                <a
                  className="third-party-link"
                  style={styles.thirdPartyLink}
                  target="_blank"
                  href="https://app.alipay.com/commodity/v2/ant/merchandise/merchandiseDetail.htm?merchandiseId=I1060400001000002795"
                >
                  免费接入
                </a>
              </div>

              <div
                className="third-party-detail-item"
                style={styles.thirdPartyDetailItem}
              >
                <img
                  className="third-party-detail-img"
                  style={styles.thirdPartyDetailImg}
                  src="https://gw.alipayobjects.com/zos/rmsportal/kMXuMYkLTCSkTnzoiRxs.png"
                />
                <h5 className="third-party-name" style={styles.thirdPartyName}>
                  邻易联
                </h5>
                <p className="third-party-sold" style={styles.thirdPartySold}>
                  已售：<span
                    className="third-party-sold-number"
                    style={styles.thirdPartySoldNumber}
                  >
                    206
                  </span>
                </p>
                <p className="third-party-desc" style={styles.thirdPartyDesc}>
                  为物业公司提供智慧管理平台，帮助物业提升缴费率，有效解决物业“成本高、服务难改善、盈利渠道少”等难题
                </p>
                <a
                  className="third-party-link"
                  style={styles.thirdPartyLink}
                  target="_blank"
                  href="https://app.alipay.com/commodity/v2/ant/merchandise/merchandiseDetail.htm?merchandiseId=I1060400001000002792"
                >
                  免费接入
                </a>
              </div>

              <div
                className="third-party-detail-item"
                style={styles.thirdPartyDetailItem}
              >
                <img
                  className="third-party-detail-img"
                  style={styles.thirdPartyDetailImg}
                  src="https://gw.alipayobjects.com/zos/rmsportal/TpqeamkGvHuXSWKsLOth.png"
                />
                <h5 className="third-party-name" style={styles.thirdPartyName}>
                  云筑社区综合管理平台
                </h5>
                <p className="third-party-sold" style={styles.thirdPartySold}>
                  已售：<span
                    className="third-party-sold-number"
                    style={styles.thirdPartySoldNumber}
                  >
                    287
                  </span>
                </p>
                <p className="third-party-desc" style={styles.thirdPartyDesc}>
                  基于互联网、物联网、大数据、云计算的物业管理平台，轻松接入，免安装维护
                </p>
                <a
                  className="third-party-link"
                  style={styles.thirdPartyLink}
                  target="_blank"
                  href="https://app.alipay.com/commodity/v2/ant/merchandise/merchandiseDetail.htm?merchandiseId=I1060400001000004676"
                >
                  免费接入
                </a>
              </div>

              <div
                className="third-party-detail-item"
                style={{
                  ...styles.thirdPartyDetailItem,
                  ...styles.thirdPartyDetailItemLast,
                }}
              >
                <img
                  className="third-party-detail-img"
                  style={styles.thirdPartyDetailImg}
                  src="https://gw.alipayobjects.com/zos/rmsportal/ykkPpNnSjuqpqBhxjTir.png"
                />
                <h5 className="third-party-name" style={styles.thirdPartyName}>
                  橙子生活
                </h5>
                <p className="third-party-sold" style={styles.thirdPartySold}>
                  已售：<span
                    className="third-party-sold-number"
                    style={styles.thirdPartySoldNumber}
                  >
                    5
                  </span>
                </p>
                <p className="third-party-desc" style={styles.thirdPartyDesc}>
                  助力物业转型升级，轻松实现线上缴费，公告触达，报修响应。解决物业收费难、服务感知度低、收入来源单一等难题
                </p>
                <a
                  className="third-party-link"
                  style={styles.thirdPartyLink}
                  target="_blank"
                  href="https://app.alipay.com/commodity/v2/ant/merchandise/merchandiseDetail.htm?merchandiseId=I1060400001000019237"
                >
                  免费接入
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
