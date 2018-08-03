import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import ReactJson from 'react-json-view';

const JsonConfig = {
  type: 'front end',
  items: [
    { name: 'react', url: 'https://reactjs.org' },
    { name: 'vue', url: 'http://vuejs.org' },
    { name: 'angular', url: 'https://angular.io' },
  ],
};

export default class JsonView extends Component {
  static displayName = 'JsonView';

  static propTypes = {
    JsonConfig: PropTypes.object,
  };

  static defaultProps = {
    JsonConfig,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  onEdit = (e) => {
    this.setState({ src: e.updated_src });
  };

  onDelete = (e) => {
    this.setState({ src: e.updated_src });
  };

  render() {
    const { JsonConfig } = this.props;
    return (
      <IceContainer>
        <ReactJson
          src={JsonConfig}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />
      </IceContainer>
    );
  }
}

const styles = {};
