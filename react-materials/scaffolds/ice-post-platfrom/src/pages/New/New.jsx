import React, { Component } from 'react';
import PostCategory from './components/PostCategory';

export default class New extends Component {
  static displayName = 'New';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="new-page">
        <PostCategory />
      </div>
    );
  }
}
