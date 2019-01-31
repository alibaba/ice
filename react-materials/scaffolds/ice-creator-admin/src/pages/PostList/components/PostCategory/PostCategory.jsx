import React, { Component } from 'react';
import { Tab, Button } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';

function random(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
}

function mockCentent() {
  return Array.from({ length: 2 + Math.round(Math.random() * 5) }).map(() => {
    return {
      title: ['穿搭日记', '流行指南', '美发心得', '场景搭配'][random(0, 3)],
      cover:
        'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
      url: '#',
      detail: [
        {
          label: '文章描述',
          desc:
            '分享日常的真人穿搭或专业的教程，对时尚有自己的理解，能够给消费者提供时尚搭配心得',
        },
        {
          label: '创作指导',
          desc: '<a href="#">好的长文章应该怎么写？</a>',
        },
      ],
    };
  });
}

@withRouter
export default class PostCategory extends Component {
  handleNewPost = () => {
    this.props.history.push('/post/new');
  };

  render() {
    const tabs = [
      {
        title: '帖子',
        icon: require('./images/post.png'),
        key: 'home',
        content: mockCentent(),
      },
      {
        title: '短视频',
        icon: require('./images/video.png'),
        key: 'doc',
        content: mockCentent(),
      },
      {
        title: '搭配',
        icon: require('./images/collect.png'),
        key: 'collect',
        content: mockCentent(),
      },
      {
        title: '单品',
        icon: require('./images/item.png'),
        key: 'item',
        content: mockCentent(),
      },
      {
        title: '问答',
        icon: require('./images/ask.png'),
        key: 'ask',
        content: mockCentent(),
      },
      {
        title: '转发',
        icon: require('./images/fiy.png'),
        key: 'fiy',
        content: mockCentent(),
      },
    ];

    return (
      <div>
        <div className={styles.titleWrapper}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
              paddingRight: 20,
            }}
          >
            作品列表
          </span>
          <span style={{ fontSize: 12, color: '#999' }}>
            内容质量与粉丝效果好的作品可以得到更多频道曝光?
          </span>
        </div>
        <Tab
          navStyle={{ backgroundColor: '#fff' }}
          contentStyle={{
            backgroundColor: '#fff',
            marginTop: '20px',
            borderRadius: '6px',
          }}
        >
          {tabs.map((tab) => {
            return (
              <Tab.Item
                tabStyle={{ height: 60, padding: '0 15px' }}
                key={tab.key}
                title={
                  <div className={styles.navItemWraper}>
                    <img
                      alt={tab.title}
                      src={tab.icon}
                      style={{ width: 30, marginRight: 8 }}
                    />
                    {tab.title}
                  </div>
                }
              >
                <div className={styles.postCategoryList}>
                  {tab.content.map((item, index) => {
                    return (
                      <div key={index} className={styles.postCategoryItem}>
                        <div className={styles.coverWrapper}>
                          <img
                            alt={item.title}
                            style={{ width: 140, display: 'block' }}
                            src={item.cover}
                          />
                        </div>
                        <div className={styles.blockDetail}>
                          <h3 className={styles.blockTitle}>{item.title}</h3>

                          {item.detail.map((desc, detailIndex) => {
                            return (
                              <div key={detailIndex} className={styles.blockItem}>
                                <label className={styles.blockLable}>
                                  {desc.label}
                                </label>
                                <div
                                  className={styles.blockDesc}
                                  dangerouslySetInnerHTML={{
                                    __html: desc.desc,
                                  }}
                                />
                              </div>
                            );
                          })}
                          <Button
                            className={styles.blockBtn}
                            onClick={this.handleNewPost}
                          >
                            立即创作
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Tab.Item>
            );
          })}
        </Tab>
      </div>
    );
  }
}
