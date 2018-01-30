import React, { Component } from 'react';
import { Button, Search } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import SingleItem from './SingleItem';
import './FilterList.scss';

const dataSource = [
  {
    title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
    extra: '预计佣金 ¥10',
    price: '¥89',
    image:
      '//img.alicdn.com/bao/uploaded/i3/120976213/TB2O4nSnblmpuFjSZFlXXbdQXXa_!!120976213.jpg_240x240.jpg',
  },
  {
    title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
    extra: '预计佣金 ¥10',
    price: '¥89',
    image:
      '//img.alicdn.com/bao/uploaded/i4/120976213/TB2GiVsdS0mpuFjSZPiXXbssVXa_!!120976213.jpg_240x240.jpg',
  },
  {
    title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
    extra: '预计佣金 ¥10',
    price: '¥89',
    image:
      '//img.alicdn.com/bao/uploaded/i3/120976213/TB2bxHGtpXXXXXVXXXXXXXXXXXX_!!120976213.jpg_240x240.jpg',
  },
  {
    title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
    extra: '预计佣金 ¥10',
    price: '¥89',
    image:
      '//img.alicdn.com/bao/uploaded/i4/120976213/TB2bEcHnXXXXXbgXXXXXXXXXXXX_!!120976213.jpg_100x100.jpg',
  },
  {
    title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
    extra: '预计佣金 ¥10',
    price: '¥89',
    image:
      '//img.alicdn.com/bao/uploaded/i2/TB11DjAIFXXXXaTXFXXXXXXXXXX_!!0-item_pic.jpg_100x100.jpg',
  },
];

export default class FilterList extends Component {
  static displayName = 'FilterList';

  renderItem = (item, index) => {
    return <SingleItem {...item} key={index} />;
  };

  renderItemRow = () => {
    return <div style={styles.itemRow}>{dataSource.map(this.renderItem)}</div>;
  };

  render() {
    return (
      <div className="filter-list">
        <IceContainer style={{ ...styles.filterListHeaderWrapper }}>
          <div style={styles.searchWrapper}>
            <Search
              placeholder="标题"
              inputWidth={120}
              searchText=""
              style={styles.searchInput}
            />
            <Button type="primary">搜索</Button>
          </div>

          <div style={styles.filterCategories}>
            <div className="select-item" style={styles.selectItem}>
              我的商品
            </div>
            <div className="select-item" style={styles.selectItem}>
              我的图片
            </div>
            <div className="select-item" style={styles.selectItem}>
              我的视频
            </div>
          </div>

          <div style={styles.filterCategoryChildren}>
            <Button className="select-btn" style={styles.selectBtn}>
              全部商品
            </Button>
            <Button className="select-btn" style={styles.selectBtn}>
              未分类
            </Button>
            <Button className="select-btn" style={styles.selectBtn}>
              已失效
            </Button>
            <Button className="select-btn" style={styles.selectBtn}>
              有好货专用
            </Button>
            <Button className="select-btn" style={styles.selectBtn}>
              必买清单
            </Button>
            <span />
          </div>
        </IceContainer>

        <IceContainer style={{ ...styles.searchResultWrapper }}>
          {this.renderItemRow()}
          {this.renderItemRow()}
          {this.renderItemRow()}
          {this.renderItemRow()}
          {this.renderItemRow()}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  filterList: {},
  selectItem: {
    padding: '0 16px',
    borderRight: '1px solid #ddd',
    cursor: 'pointer',
  },
  selectBtn: {
    marginRight: '10px',
  },
  itemRow: {
    margin: '0 10px 10px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterListHeaderWrapper: {
    flexDirection: 'column',
    position: 'relative',
  },
  searchWrapper: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    display: 'flex',
    flexDirection: 'row',
  },
  searchInput: {
    marginRight: '15px',
  },
  filterCategories: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '25px',
  },
  filterCategoryChildren: {},
  searchResultWrapper: {
    flexDirection: 'column',
  },
};
