import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import { Switch } from '@icedesign/base';
import React, { Component } from 'react';

import './index.scss';

@inject('extensions')
@observer
class Extensions extends Component {
  handleExtensionCheckChange = (name, value) => {
    this.props.extensions.switch(name, value);
  };

  render() {
    const { extensions } = this.props;

    return (
      <div className="extensions">
        <div className="extensions-header">
          插件管理
          <span
            style={{
              fontSize: 12,
              color: '#999',
              paddingLeft: 20,
              fontWeight: 300,
            }}
          >
            开启后会在项目面板中展现
          </span>
        </div>
        <div className="extensions-body">
          <div className="extensions-list">
            {extensions.list.map((extension) => {
              return (
                <div key={extension.name} className="extensions-item">
                  <div className="cover">
                    <img className="cover" src={extension.cover} />
                  </div>
                  <div className="info">
                    <div className="info-header">
                      <div className="title">
                        {extension.title}
                        <span className="version">{extension.version}</span>
                        {extension.extra && (
                          <span className="extra">{extension.extra}</span>
                        )}
                      </div>
                    </div>
                    <div className="desc">{extension.description}</div>
                    <div className="info-footer">
                      <div className="author">{extension.author}</div>
                    </div>
                    <div className="extension-settings">
                      <Switch
                        size="small"
                        checked={extensions.checked[extension.name]}
                        onChange={this.handleExtensionCheckChange.bind(
                          this,
                          extension.name
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(Extensions);
