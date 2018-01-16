import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Search } from '@icedesign/base';
import './FilterWithSearch.scss';

export default class FilterWithSearch extends Component {
  static displayName = 'FilterWithSearch';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  selectFilter = (type) => {
    console.log(type);
    // type can be 'all', 'process', 'pending'
    // handler
  };

  handleSearch = () => {
    // handler logical
  };

  render() {
    return (
      <div className="filter-with-search" style={styles.filterWithSearch}>
        <IceCard
          className="filter-with-search-container"
          style={styles.filterWithSearchContainer}
        >
          <div className="filter-container" style={styles.filterContainer}>
            <span
              className="filter-item selected"
              style={styles.filterItemSelected}
              onClick={this.selectFilter.bind(this, 'all')}
            >
              全部
            </span>
            <span
              className="filter-item"
              style={styles.filterItem}
              onClick={this.selectFilter.bind(this, 'process')}
            >
              进行中
            </span>
            <span
              className="filter-item"
              style={styles.filterItem}
              onClick={this.selectFilter.bind(this, 'pending')}
            >
              等待中
            </span>
          </div>
          <Search
            inputWidth={400}
            searchText=""
            size="large"
            placeholder="请输入要搜索的关键词或商品链接"
            onSearch={this.handleSearch}
          />
        </IceCard>
      </div>
    );
  }
}

const styles = {
  filterWithSearchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterContainer: { display: 'flex', alignItems: 'center' },
  filterItem: {
    height: '20px',
    padding: '0 20px',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
    borderRight: '1px solid #D8D8D8',
  },
};
