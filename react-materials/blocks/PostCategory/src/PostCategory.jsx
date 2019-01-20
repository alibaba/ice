import React, { Component } from 'react';

import { Tab, Button } from '@alifd/next';

function mockCentent() {
  return Array.from({ length: 2 + Math.round(Math.random() * 5) }).map(() => {
    return {
      title: '长文章',
      cover:
        'https://img.alicdn.com/tfs/TB1sbkkXmBYBeNjy0FeXXbnmFXa-280-498.png',
      url: '#',
      detail: [
        {
          label: '模板描述',
          desc: '创作自由度高。'.repeat(2 + Math.round(Math.random() * 5)),
        },
        {
          label: '创作指导',
          desc: '<a href="#">好的长文章应该怎么写？</a>',
        },
      ],
    };
  });
}

export default class PostCategory extends Component {
  static displayName = 'PostCategory';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const tabs = [
      {
        tab: '帖子',
        icon: require('./images/post.png'),
        key: 'home',
        content: mockCentent(),
      },
      {
        tab: '短视频',
        icon: require('./images/video.png'),
        key: 'doc',
        content: mockCentent(),
      },
      {
        tab: '搭配',
        icon: require('./images/collect.png'),
        key: 'collect',
        content: mockCentent(),
      },
      {
        tab: '单品',
        icon: require('./images/item.png'),
        key: 'item',
        content: mockCentent(),
      },
      {
        tab: '问答',
        icon: require('./images/ask.png'),
        key: 'ask',
        content: mockCentent(),
      },
      {
        tab: '转发',
        icon: require('./images/fiy.png'),
        key: 'fiy',
        content: mockCentent(),
      },
    ];

    return (
      <div>
        <div style={styles.titleWrapper}>
          <span style={{ fontSize: 16, color: '#333', paddingRight: 10 }}>
            发布新作品
          </span>
          <span style={{ fontSize: 12, color: '#999' }}>
            内容质量与粉丝效果好的作品可以得到更多频道曝光?
          </span>
        </div>
        <Tab
          navStyle={{ backgroundColor: '#fff' }}
          contentStyle={{ backgroundColor: '#fff', marginTop: 20 }}
        >
          {tabs.map((item) => {
            return (
              <Tab.Item
                tabStyle={{ height: 60, padding: '0 15px' }}
                key={item.key}
                title={
                  <div style={styles.navItemWraper}>
                    <img
                      alt={item.tab}
                      src={item.icon}
                      style={{ width: 30, marginRight: 8 }}
                    />
                    {item.tab}
                  </div>
                }
              >
                <div style={styles.postCategoryList}>
                  {item.content.map((item, index) => {
                    return (
                      <div key={index} style={styles.postCategoryItem}>
                        <div style={styles.coverWrapper}>
                          <img
                            alt={item.title}
                            style={{ width: 140, display: 'block' }}
                            src={item.cover}
                          />
                        </div>
                        <div style={styles.blockDetail}>
                          <h3 style={styles.blockTitle}>{item.title}</h3>

                          {item.detail.map((desc, detailIndex) => {
                            return (
                              <div key={detailIndex} style={styles.blockItem}>
                                <label style={styles.blockLable}>
                                  {desc.label}
                                </label>
                                <div
                                  style={styles.blockDesc}
                                  dangerouslySetInnerHTML={{
                                    __html: desc.desc,
                                  }}
                                />
                              </div>
                            );
                          })}
                          <Button
                            style={styles.blockBtn}
                            type="primary"
                            component="a"
                            href={item.url}
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

const styles = {
  titleWrapper: {
    backgroundColor: '#fff',
    height: 54,
    lineHeight: '54px',
    padding: '0 16px',
  },
  navItemWraper: {
    display: 'flex',
    alignItems: 'center',
    height: 60,
    lineHeight: '60px',
  },
  postCategoryList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postCategoryItem: {
    width: '49%',
    flex: '0 0 49%',
    boxSizing: 'border-box',
    backgroundColor: '#f6f6f6',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  coverWrapper: {
    paddingRight: 14,
  },
  blockDetail: {
    position: 'relative',
  },
  blockTitle: {
    fontSize: 16,
    padding: '6px 0',
  },
  blockItem: {
    display: 'flex',
  },
  blockLable: {
    flex: '0 0 60px',
    fontSize: 12,
    lineHeight: '22px',
  },
  blockDesc: {
    fontSize: 12,
    color: '#999',
    lineHeight: '22px',
  },
  blockBtn: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    borderRadius: '3px',
    background: '#6af',
    color: '#fff',
  },
};
