'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from '@icedesign/img';
import './BrandDisplay.scss';

const dataSource = [
  {
    title: '飞利浦',
    subject:
      '一场内容营销活动获得超百万的进店点击，定位新广告的达人+积极迎接内容时代的品牌，如何刷新内容营销的定义？',
    headPic:
      'https://img.alicdn.com/tfs/TB1QMwlSXXXXXaUXXXXXXXXXXXX-122-122.png',
    pic: 'https://img.alicdn.com/tfs/TB1n6H_SXXXXXc3XpXXXXXXXXXX-616-348.png',
    url: 'https://v.taobao.com/v/mission/case-detail?userId=38587850'
  },
  {
    title: '万家乐',
    subject:
      '策划『生活改造家』主题全案，联合一线大咖制作图文、直播、短视频全域引流，助力品牌升级和高端人群种草，结合行业活动割草。',
    headPic: 'https://img.alicdn.com/tfs/TB1Z4CLSXXXXXcHXVXXXXXXXXXX-61-61.png',
    pic: 'https://img.alicdn.com/tfs/TB1bHO6SXXXXXaiXFXXXXXXXXXX-308-174.png',
    url: 'https://v.taobao.com/v/mission/case-detail?userId=2738062192'
  },
  {
    title: '职场游乐园',
    subject: '2017年以“职场游乐园”为主题，全方位推动Lee牛仔专家与创新者形象。',
    headPic:
      'https://img.alicdn.com/tfs/TB1kX62SXXXXXXJXVXXXXXXXXXX-122-122.png',
    pic: 'https://img.alicdn.com/tfs/TB17bzrSXXXXXbpaFXXXXXXXXXX-616-348.png',
    url: 'https://v.taobao.com/v/mission/case-detail?userId=2894350953'
  },
  {
    title: '品味百味人生',
    subject:
      '吃货的世界你不懂，看着直播镜头里心仪的零食恨不得舔屏，从种草到剁手分分钟一气呵成。',
    headPic:
      'https://img.alicdn.com/tfs/TB19C_9SXXXXXc1XpXXXXXXXXXX-122-122.png',
    pic: 'https://img.alicdn.com/tfs/TB1IkEjSXXXXXb1XXXXXXXXXXXX-616-348.png',
    url: 'https://v.taobao.com/v/mission/case-detail?userId=2149813109'
  }
];

export default class BrandDisplay extends Component {
  static displayName = 'BrandDisplay';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {};

  render() {
    return (
      <div className="brand-display">
        <div>
          <div style={styles.brandHeader}>
            <h5 style={styles.brandTitle}>品牌展示</h5>
          </div>
          <ul>
            {dataSource.map((item, index) => {
              return (
                <li key={index} className="brand-item" style={styles.brandItem}>
                  <a href={item.url}>
                    <Img width={194} height={175} src={item.pic} type="cover" />
                    <div style={styles.caseContent}>
                      <div style={styles.caseSubject}>
                        <img src={item.headPic} style={styles.subjectImage} />
                        <span style={styles.subjectDesc}>{item.title}</span>
                      </div>
                      <p style={styles.caseDetail}>{item.subject}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  brandHeader: { position: 'relative', textAlign: 'center' },
  brandTitle: { marginBottom: '20px', fontSize: '20px', color: '#333333' },
  brandItem: {
    height: '175px',
    background: '#fff',
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: '30px',
    marginLeft: '15px',
    overflow: 'hidden'
  },
  caseContent: {
    width: '250px',
    display: 'inline-block',
    verticalAlign: 'top'
  },
  caseSubject: { margin: '20px 10px 0', lineHeight: '60px', height: '60px' },
  subjectImage: { width: '60px', height: '60px', borderRadius: '50%' },
  subjectDesc: {
    fontSize: '16px',
    color: '#333333',
    height: '60px',
    verticalAlign: 'top',
    marginLeft: '12px'
  },
  caseDetail: {
    fontSize: '12px',
    color: '#666666',
    padding: '0 16px',
    textAlign: 'left'
  }
};
