import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import './LatestNews.scss';

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
      <div className="latest-news" style={styles.container}>
        <Row wrap gutter="20">
          <Col xxs="24" s="12" l="12">
            <IceContainer style={styles.cardContainer}>
              <h3 style={styles.cardTitle}>
                最新文章
                <a className="link" href="#" style={styles.more}>
                  更多
                </a>
              </h3>
              <div style={styles.items}>
                {dataSource.articles.map((item, index) => {
                  return (
                    <a
                      className="link"
                      key={index}
                      href="#"
                      style={styles.item}
                    >
                      <div style={styles.itemTitle}>{item.title}</div>
                      <div style={styles.itemTime}>{item.time}</div>
                    </a>
                  );
                })}
              </div>
            </IceContainer>
          </Col>
          <Col xxs="24" s="12" l="12">
            <IceContainer style={styles.cardContainer}>
              <h3 style={styles.cardTitle}>
                最新评论
                <a className="link" href="#" style={styles.more}>
                  更多
                </a>
              </h3>
              <div style={styles.items}>
                {dataSource.comments.map((item, index) => {
                  return (
                    <a
                      className="link"
                      key={index}
                      href="#"
                      style={styles.item}
                    >
                      <div style={styles.itemComment}>
                        <div style={styles.commentTitle}>{item.title}</div>
                        <div style={styles.commentTime}>{item.time}</div>
                      </div>
                      <div style={styles.commentNum}>{item.num}</div>
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

const styles = {
  cardContainer: {
    height: '286px',
    overflowY: 'auto',
  },
  cardTitle: {
    position: 'relative',
    margin: '0 0 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  more: {
    position: 'absolute',
    right: 0,
    fontSize: '12px',
    color: '#666',
  },
  item: {
    position: 'relative',
    display: 'block',
  },
  itemTime: {
    position: 'absolute',
    right: 0,
    top: 6,
    fontSize: '12px',
  },
  itemTitle: {
    height: '34px',
    lineHeight: '34px',
    fontSize: '13px',
  },
  itemComment: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  commentTitle: {
    height: '28px',
    lineHeight: '28px',
    fontSize: '13px',
  },
  commentTime: {
    fontSize: '12px',
  },
  commentNum: {
    position: 'absolute',
    right: 0,
    top: 6,
    width: '24px',
    height: '24px',
    lineHeight: '24px',
    fontSize: '12px',
    textAlign: 'center',
    borderRadius: '50px',
    background: '#FF2851',
    color: '#fff',
  },
};
