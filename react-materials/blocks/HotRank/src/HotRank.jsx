import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@icedesign/container';

import HotItem from './HotItem';

export default class HotRank extends Component {
  static displayName = 'HotRank';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <h3>粉丝热门挂住点</h3>
        <span>
          每日计算分析近期粉丝行为，从而得出专注领域下粉丝热点综合指数排行
        </span>
        <div style={styles.hotrankList}>
          <HotItem />
          <HotItem />
          <HotItem />
          <HotItem />
        </div>
      </Container>
    );
  }
}

const styles = { hotrankList: {} };
