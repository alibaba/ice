import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import cx from 'classnames';

import './LatestNews.scss';
import styles from './index.module.scss';

const { Row, Col } = Grid;

const dataSource = {
  articles: [
    {
      title: '这里是文章的标题1',
      time: '2018-03-31',
    },
    {
      title: '这里是文章的标题2',
      time: '2018-02-02',
    },
    {
      title: '这里是文章的标题3',
      time: '2018-01-22',
    },
    {
      title: '这里是文章的标题4',
      time: '2018-02-02',
    },
    {
      title: '这里是文章的标题5',
      time: '2018-01-22',
    },
    {
      title: '这里是文章的标题6',
      time: '2018-02-02',
    },
  ],
  comments: [
    {
      title: '这里是最新的评论1',
      time: '2018-02-26',
      num: '18',
    },
    {
      title: '这里是最新的评论2',
      time: '2018-01-22',
      num: '22',
    },
    {
      title: '这里是最新的评论3',
      time: '2018-01-18',
      num: '36',
    },
    {
      title: '这里是最新的评论4',
      time: '2018-01-18',
      num: '29',
    },
  ],
};

export default class LatestNews extends Component {
  static displayName = 'LatestNews';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={cx(styles.container, 'latest-news')}>
        <Row wrap gutter="20">
          <Col xxs="24" s="12" l="12">
            <IceContainer className={styles.cardContainer}>
              <h3 className={styles.cardTitle}>
                最新文章
                <a href="#" className={cx(styles.more, 'link')}>
                  更多
                </a>
              </h3>
              <div className={styles.items}>
                {dataSource.articles.map((item, index) => {
                  return (
                    <a key={index} href="#" className={cx(styles.item, 'link')}>
                      <div className={styles.itemTitle}>{item.title}</div>
                      <div className={styles.itemTime}>{item.time}</div>
                    </a>
                  );
                })}
              </div>
            </IceContainer>
          </Col>
          <Col xxs="24" s="12" l="12">
            <IceContainer className={styles.cardContainer}>
              <h3 className={styles.cardTitle}>
                最新评论
                <a href="#" className={cx(styles.more, 'link')}>
                  更多
                </a>
              </h3>
              <div className={styles.items}>
                {dataSource.comments.map((item, index) => {
                  return (
                    <a key={index} href="#" className={cx(styles.item, 'link')}>
                      <div className={styles.itemComment}>
                        <div className={styles.commentTitle}>{item.title}</div>
                        <div className={styles.commentTime}>{item.time}</div>
                      </div>
                      <div className={styles.commentNum}>{item.num}</div>
                    </a>
                  );
                })}
              </div>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
