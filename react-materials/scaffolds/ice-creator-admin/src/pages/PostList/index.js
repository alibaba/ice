import React, { Component } from 'react';
import PostCategory from './components/PostCategory';

export default class PostList extends Component {
  static displayName = 'PostList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PostCategory />;
  }
}
