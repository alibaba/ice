

import React, { Component } from 'react';
import { Button, Search } from '@icedesign/base';
import IceCard from '@icedesign/container';
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
  {
    title: '衬衫女雪纺上衣2017大纺上衣2017大纺上衣2017大',
    extra: '预计佣金 ¥10',
    price: '¥89',
    image:
      '//img.alicdn.com/bao/uploaded/i4/TB1GiPSinJ_SKJjSZPiYXH3LpXa_M2.SS2_100x100.jpg',
  },
];

export default class FilterList extends Component {
  static displayName = 'FilterList';

  renderItem = (item) => {
    return <SingleItem {...item} />;
  };
  renderItemRow = () => {
    return <div style={styles.todo0}>{dataSource.map(this.renderItem)}</div>;
  };

  render() {
    const cardStyle = {
      display: 'flex',
      margin: '20px',
    };

    return (
      <div className="filter-list">
        <IceCard style={{ ...styles.filterListHeaderWrapper, ...cardStyle }}>
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
        </IceCard>

        <IceCard style={{ ...styles.searchResultWrapper, ...cardStyle }} className="">
          {this.renderItemRow()}
          {this.renderItemRow()}
          {this.renderItemRow()}
          {this.renderItemRow()}
          {this.renderItemRow()}
        </IceCard>
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
  selectBtn: { marginRight: '10px' },
  todo0: {
    margin: '0 10px 10px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterListHeaderWrapper: { padding: '20px', flexDirection: 'column', position: 'relative' },
  searchWrapper: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    display: 'flex',
    flexDirection: 'row',
  },
  searchInput: { marginRight: '15px' },
  filterCategories: { display: 'flex', flexDirection: 'row', marginBottom: '25px' },
  filterCategoryChildren: {},
  searchResultWrapper: { flexDirection: 'column', padding: '20px 0' },
};
