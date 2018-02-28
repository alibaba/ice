import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceContainer from '@icedesign/container';
import './<%= className %>.scss';

export default class <%= className %> extends Component {
  static displayName = '<%= className %>';

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
      <div className="<%= npmName %>">
        <IceContainer>
          hello <%= npmName %>
        </IceContainer>
      </div>
    );
  }
}

const styles = {

}
