import React, { Component } from 'react';
import { Search, Tab, Tag, DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';

const TabPane = Tab.TabPane;

// mock data
const tagList = [
  {
    key: 'all',
    name: '全部商品',
  },
  {
    key: 'unclassified',
    name: '未分类',
  },
  {
    key: 'invalid',
    name: '已失效',
  },
  {
    key: 'haohuo',
    name: '有好货专用',
  },
  {
    key: 'bimai',
    name: '必买清单',
  },
];

export default class CompositeFilter extends Component {
  static displayName = 'CompositeFilter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  onTabChange = (key) => {
    console.log(`select tab is: ${key}`);
  };

  onTagChange = (key, selected) => {
    console.log(`Tag: ${key} is ${selected ? 'selected' : 'unselected'}`);
  };

  onDateChange = (value) => {
    console.log(value);
  };

  onSearch = (value) => {
    console.log(value);
  };

  renderTabBarExtraContent = () => {
    return (
      <div style={styles.extraFilter}>
        <DatePicker
          locale={{ datePlaceholder: '发布日期' }}
          onChange={this.onDateChange}
        />
        <Search
          placeholder="搜索"
          searchText=""
          inputWidth={150}
          onSearch={this.onSearch}
          style={styles.search}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="composite-filter">
        <IceContainer style={styles.filterCard}>
          <Tab
            type="text"
            onChange={this.onTabChange}
            contentStyle={{ display: 'none' }}
            tabBarExtraContent={
              !this.state.isMobile ? this.renderTabBarExtraContent() : null
            }
          >
            <TabPane tab="全部" key="all" />
            <TabPane tab="图文" key="pic" />
            <TabPane tab="单品" key="item" />
            <TabPane tab="店铺上新" key="new" />
            <TabPane tab="短视频" key="video" />
          </Tab>

          <div style={styles.tagList}>
            {tagList.map((tag, index) => {
              return (
                <Tag
                  shape="selectable"
                  type="normal"
                  key={index}
                  onChange={this.onTagChange.bind(this, tag.key)}
                >
                  {tag.name}
                </Tag>
              );
            })}
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterCard: {
    position: 'relative',
    padding: 10,
  },
  tagList: {
    marginTop: '10px',
  },
  extraFilter: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'row',
  },
  search: {
    marginLeft: '12px',
  },
};
