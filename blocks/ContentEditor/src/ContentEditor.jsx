import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';

import RichEditor from './RichEditor';
import './ContentEditor.scss';

export default class ContentEditor extends Component {
  static displayName = 'ContentEditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content-editor">
        <IceCard>
          <RichEditor />
        </IceCard>
      </div>
    );
  }
}

const styles = {};
