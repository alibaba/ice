import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';

import MOCK_DATA from './data';

const { Row, Col } = Grid;
const ScrollOverPack = ScrollAnim.OverPack;

export default class Tickets extends Component {
  static displayName = 'Tickets';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <ScrollOverPack always={false}>
          <QueueAnim type="bottom" delay={100} duration={1000}>
            <div style={styles.content} key="content">
              <div style={styles.mainTitle}>TICKETS</div>
              <div style={styles.mainDesc}>参会门票一览</div>
              <div style={styles.tipsList}>
                <p style={styles.tipsText}>
                  团队折扣：单笔购买任意票种累计5张及以上，总价
                  <span style={styles.tipsNum}>9</span>
                  折；10张及以上，总价
                  <span style={styles.tipsNum}>8</span>折
                </p>
                <p style={styles.tipsText}>
                  售票截止日期：
                  <span style={styles.tipsNum}> 9.14</span>
                </p>
                <p style={styles.tipsText}>* 各类门票限量发售，售完即止</p>
                <p style={styles.tipsText}>
                  门票相关权益速览：【两场主论坛】聆听数字化未来新起点、【
                  <a href="#" style={styles.tipsLink}>
                    <b> ATEC大会</b>
                  </a>
                  】见证科技金融普惠价值、【
                  <a href="#" style={styles.tipsLink}>
                    <b>百余场峰会及分论坛</b>
                  </a>
                  】洞见行业与技术新火花、【体验式展览】置身数字科技人文的和谐未来、【
                  <a href="#" style={styles.tipsLink}>
                    <b>虾米音乐节</b>
                  </a>
                  】享受艺术与技术交融的感官盛宴
                </p>
              </div>
              <Row wrap gutter={20}>
                {MOCK_DATA.map((item, index) => {
                  const saleStyle = item.issale ? styles.isSale : styles.unSale;
                  return (
                    <Col l="6" key={index}>
                      <div style={styles.itemBox}>
                        <div style={styles.itemTitle}>{item.title}</div>
                        <div style={styles.itemTime}>
                          {item.time}
                          DAYS
                        </div>
                        <ul style={styles.itemTextList}>
                          {item.desc.map((value, key) => {
                            return (
                              <li key={key} style={styles.textList}>
                                {value}
                              </li>
                            );
                          })}
                        </ul>
                        <ul style={styles.itemPriceList}>
                          <li style={styles.priceList}>
                            <div style={styles.priceText}>
                              ￥ <span style={styles.price}>{item.price}</span>{' '}
                              /张
                            </div>
                          </li>
                        </ul>
                        <div style={styles.btnWrap}>
                          <a
                            href="#"
                            style={{ ...styles.buyLink, ...saleStyle }}
                          >
                            已售罄
                          </a>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </QueueAnim>
        </ScrollOverPack>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100vh',
    padding: '50px 0',
    background: '#000',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  mainTitle: {
    fontSize: '60px',
    color: '#fff',
    letterSpacing: '0.77px',
    lineHeight: '72px',
    margin: '0',
    fontWeight: '700',
  },
  mainDesc: {
    fontSize: '24px',
    lineHeight: '30px',
    color: '#fff',
    marginTop: '8px',
    fontWeight: '700',
  },
  tipsList: {
    background: '#191a1e',
    width: '100%',
    padding: '2px 24px 14px',
    margin: '70px 0 20px',
    overflow: 'hidden',
  },
  tipsText: {
    float: 'left',
    margin: '0',
    fontSize: '14px',
    color: 'hsla(0,0%,100%,.7)',
    lineHeight: '28px',
    marginRight: '30px',
    paddingTop: '12px',
  },
  tipsNum: {
    fontSize: '24px',
    lineHeight: '24px',
    color: '#236cff',
    padding: '0 6px',
  },
  tipsLink: {
    color: 'hsla(0, 0%, 100%, .7)',
  },
  itemBox: {
    padding: '32px 24px',
    background: '#191a1e',
  },
  itemTitle: {
    fontSize: '18px',
    color: '#fff',
    lineHeight: '30px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  itemTime: {
    fontSize: '26px',
    color: '#fff',
    lineHeight: '32px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '6px',
    marginBottom: '17px',
    letterSpacing: '0.72px',
    fontWeight: '600',
  },
  itemTextList: {
    paddingTop: '16px',
    borderTop: '2px solid #fff',
    height: '118px',
    overflow: 'hidden',
  },
  textList: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
  },
  itemPriceList: {
    marginTop: '24px',
  },
  priceList: {
    marginBottom: '8px',
    overflow: 'hidden',
  },
  priceText: {
    float: 'left',
    width: '60%',
    fontSize: '12px',
    color: '#fff',
    lineHeight: '26px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  price: {
    fontSize: '26px',
    letterSpacing: '0.14px',
    paddingLeft: '2px',
  },
  btnWrap: {
    marginTop: '8px',
    display: 'block',
    width: '100%',
  },
  buyLink: {
    display: 'block',
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#fff',
    transition: 'all .3s',
    textDecoration: 'none',
  },
  unSale: {
    background: '#a1a1a1',
  },
  isSale: {
    background: '#236cff',
  },
};
