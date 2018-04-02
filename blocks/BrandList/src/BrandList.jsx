import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './BrandList.scss';

export default class BrandList extends Component {
  static displayName = 'BrandList';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="brand-list">
        <IceContainer>
          hello brand-list
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
