'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import { Icon } from '@icedesign/base';
import './ArticleList.scss';

const generatorData = () => {
  return Array.from({ length: 5 }).map(() => {
    return {
      title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
      description:
        '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。',
      tags: ['直播', '大促活动', '讲解'],
      like: 123,
      favor: 245,
      comment: 546
    };
  });
};

export default class ArticleList extends Component {
  static displayName = 'ArticleList';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const dataSource = generatorData();
    return (
      <div className="article-list">
        <IceCard style={styles.articleFilterCard}>
          <ul className="article-sort" style={styles.articleSort}>
            <li>
              最新 <Icon type="arrow-down" />
            </li>
            <li>
              最热 <Icon type="arrow-down" />
            </li>
            <li>
              距离截稿日期最近 <Icon type="arrow-down" />
            </li>
            <li>
              距离开始开启最近 <Icon type="arrow-down" />
            </li>
          </ul>
        </IceCard>
        <IceCard>
          {dataSource.map((item, index) => {
            return (
              <div key={index} style={styles.articleItem}>
                <div>
                  <a style={styles.title} href="/">
                    {item.title}
                  </a>
                </div>
                <div>
                  <p style={styles.desc}>{item.description}</p>
                </div>
                <div style={styles.articleItemFooter}>
                  <div style={styles.articleItemTags}>
                    {item.tags.map((tag, idx) => {
                      return (
                        <span
                          key={idx}
                          className="article-item-tag"
                          style={styles.tag}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div
                    className="article-item-meta"
                    style={styles.articleItemMeta}
                  >
                    <span>
                      <Icon type="good" /> {item.like}
                    </span>
                    <span>
                      <Icon type="favorite" /> {item.favor}
                    </span>
                    <span>
                      <Icon type="comments" /> {item.comment}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </IceCard>
      </div>
    );
  }
}

const styles = {
  articleFilterCard: { marginBottom: '10px', minHeight: 'auto' },
  articleSort: {
    margin: '0',
    padding: '0',
    display: 'flex'
  },
  articleItem: {
    marginBottom: '30px',
    paddingBottom: '30px',
    borderBottom: '1px solid #f5f5f5'
  },
  title: { fontSize: '16px', color: '#333', textDecoration: 'none' },
  desc: { lineHeight: '24px', fontSize: '14px', color: '#999' },
  articleItemFooter: { position: 'relative' },
  tag: {
    fontSize: '13px',
    background: '#f5f5f5',
    color: '#999',
    padding: '4px 15px',
    borderRadius: '20px',
    marginRight: '20px'
  },
  articleItemMeta: {
    position: 'absolute',
    right: '0',
    top: '0'
  }
};
