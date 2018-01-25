'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './RichEditor.scss';

export default class RichEditor extends Component {
  static displayName = 'RichEditor';

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
      <div className="rich-editor">
        <IceCard>
          hello rich-editor
        </IceCard>
      </div>
    );
  }
}

const styles = {

}
