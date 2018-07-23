import React, { Component } from 'react';

export default class FooterLinks extends Component {
  static displayName = 'FooterLinks';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-box" style={styles.footerBox}>
        <div className="footer-box-content" style={styles.footerBoxContent}>
          <div className="footer-clearfix" style={styles.footerClearfix} />
          <div className="footer-box-left" style={styles.footerBoxLeft}>
            <ul
              className="footer-box-content-ul"
              style={styles.footerBoxContentUl}
            >
              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    新手入门
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          新手指南
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          热门FAQ
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          合作攻略
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          平台规则
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    服务支持
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          开发文档
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          业务文档
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          物料模板下载
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          蚂蚁开放日
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    客服帮助
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          技术支持中心
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          在线问答
                        </a>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <span>客服：0571-88158090</span>
                      </li>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <span>（9:00-22:00）</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                className="footer-box-content-li"
                style={styles.footerBoxContentLi}
              >
                <div
                  className="footer-box-content-item"
                  style={styles.footerBoxContentItem}
                >
                  <div
                    className="footer-box-content-name"
                    style={styles.footerBoxContentName}
                  >
                    合作洽谈
                  </div>
                  <div className="footer-box-content-subitem">
                    <ul>
                      <li
                        className="footer-box-content-subli"
                        style={styles.footerBoxContentSubli}
                      >
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="#"
                          className="footer-box-content-item-link"
                          style={styles.footerBoxContentItemLink}
                        >
                          点此与我联系
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="footer-clearfix" style={styles.footerClearfix} />
            </ul>
          </div>
          <div className="footer-box-right" style={styles.footerBoxRight}>
            <div
              className="footer-box-right-title"
              style={styles.footerBoxRightTitle}
            >
              关注我们
            </div>
            <div
              style={{
                ...styles.footerBoxRightItem,
                ...styles.footerBoxRightItemOpacity,
              }}
              className="footer-box-right-item footer-box-right-item-opacity"
            >
              关注开放平台生活号
            </div>
            <div
              style={styles.footerBoxRightItem}
              className="footer-box-right-item"
            >
              <img
                style={styles.footerBoxRightItemImg}
                className="footer-box-right-item-img"
                src={require('./images/HNblwDvJYEuHnbIvlhVy.png')}
                alt=""
              />
            </div>
            <div
              style={{
                ...styles.footerBoxRightItem,
                ...styles.footerBoxRightItemOpacity,
              }}
              className="footer-box-right-item footer-box-right-item-opacity"
            >
              打开支付宝扫一扫
            </div>
          </div>
          <div className="footer-clearfix" style={styles.footerClearfix} />
        </div>
      </div>
    );
  }
}

const styles = {
  footerBox: {
    backgroundColor: '#232940',
    WebkitFontSmoothing: 'antialiased',
    fontFamily: 'Tahoma,arial,Hiragino Sans GB,Microsoft Yahei',
    lineHeight: '1.6',
    boxSizing: 'border-box',
    minWidth: '1280px',
  },
  footerBoxContent: {
    width: '1240px',
    margin: '0 auto',
    padding: '50px 0px 30px',
    boxSizing: 'border-box',
  },
  footerClearfix: {
    display: 'block',
    height: 0,
    boxSizing: 'border-box',
    clear: 'both',
  },
  footerBoxLeft: {
    float: 'left',
    width: '1020px',
    boxSizing: 'border-box',
  },
  footerBoxRight: {
    float: 'right',
    width: '220px',
    paddingLeft: '80px',
    borderLeft: '1px solid rgba(151,151,151,0.4)',
    boxSizing: 'border-box',
  },
  footerBoxContentUl: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
  },
  footerBoxContentLi: {
    listStyle: 'none',
    marginLeft: '0',
    boxSizing: 'border-box',
    float: 'left',
    width: '25%',
    paddingRight: '10px',
  },
  footerBoxContentItem: {
    width: '208px',
    boxSizing: 'border-box',
  },
  footerBoxContentName: {
    fontSize: '22px',
    color: '#FFFFFF',
    paddingBottom: '20px',
    boxSizing: 'border-box',
  },
  footerBoxContentSubli: {
    paddingTop: '14px',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    overflow: 'hidden',
    boxSizing: 'border-box',
    listStyle: 'none',
  },
  footerBoxContentItemLink: {
    fontSize: '16px',
    color: '#FFFFFF',
    opacity: '0.6',
    textDecoration: 'none',
  },
  footerBoxRightTitle: {
    paddingBottom: '16px',
    fontSize: '22px',
    color: '#FFFFFF',
    boxSizing: 'border-box',
  },
  footerBoxRightItem: {
    paddingTop: '12px',
    fontSize: '14px',
    color: '#FFFFFF',
    boxSizing: 'border-box',
  },
  footerBoxRightItemOpacity: {
    opacity: 0.6,
  },
  footerBoxRightItemImg: {
    width: '97px',
    height: '97px',
    border: '0',
    boxSizing: 'border-box',
  },
};
