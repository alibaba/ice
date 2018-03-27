import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './ProductIntro.scss';

export default class ProductIntro extends Component {
  static displayName = 'ProductIntro';

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
      <div className="product-intro">
        <IceContainer>
          hello product-intro
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
