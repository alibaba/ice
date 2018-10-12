import React, { Component } from 'react';
import RecommentFrom from './components/RecommendForm';

export default class RecommendFrom extends Component {
  static displayName = 'RecommendFrom';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <RecommentFrom />
      </div>
    );
  }
}
