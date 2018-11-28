import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import Icon from '../Icon';

@inject('customScaffold', 'scaffold')
@observer
export default class ScaffoldTrigger extends Component {
  static displayName = 'ScaffoldTrigger';

  render() {
    return (
      <div
        className="scaffold-item"
        style={{ cursor: 'pointer' }}
        onClick={this.props.onClick}
      >
        <div
          className="scaffold-image"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Icon type="add" style={{ fontSize: 60, color: '#297CFF' }} />
        </div>
        <div className="scaffold-title">新建自定义区块</div>
      </div>
    );
  }
}
