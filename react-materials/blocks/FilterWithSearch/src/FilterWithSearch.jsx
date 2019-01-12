import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Search, Grid } from '@alifd/next';
import './FilterWithSearch.scss';

const { Row, Col } = Grid;

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
        <IceContainer
          className="filter-with-search-container"
          style={styles.filterWithSearchContainer}
        >
          <Row wrap justify="space-between" style={styles.row}>
            <Col xxs={24} s={8} style={styles.filterContainer}>
              <span
                className="filter-item selected"
                style={styles.filterItem}
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
            </Col>
            <Col xxs={24} s={16} style={styles.searchWrapper}>
              <Search
                inputWidth={250}
                shape="simple"
                searchText=""
                size="large"
                placeholder="请输入要搜索的关键词或商品链接"
                onSearch={this.handleSearch}
                style={{ display: 'inline-block' }}
              />
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  row: {
    alignItems: 'center',
  },
  filterContainer: {
    lineHeight: '32px',
  },
  filterItem: {
    height: '20px',
    padding: '0 20px',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
    borderRight: '1px solid #D8D8D8',
  },
  searchWrapper: {
    textAlign: 'right',
    margin: '10px 0',
  },
};
