import { Button } from '@icedesign/base';
import electron from 'electron';
import React, { Component } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import handleViewport from 'react-in-viewport';

const shell = electron.shell;

@observer
class ScaffoldItem extends Component {
  static displayName = 'ScaffoldItem';

  openInBrowser = () => {
    // https://github.com/alibaba/ice/issues/219
    // sometimes data is not trustable
    // make sure home page is a valid URL any time
    const { data = {} } = this.props;

    shell.openExternal(data.homepage);
  };

  createProject = () => {
    if (this.props.createProject) {
      const { data } = this.props;
      this.props.createProject(data);
    }
  };

  render() {
    const { data, mobile, innerRef, enterCount } = this.props;
    const showInviewport = enterCount > 0;
    return (
      <div
        ref={innerRef}
        className={classnames({
          'scaffold-item': true,
          'scaffold-item-mobile': mobile,
          'scaffold-item-pc': !mobile,
        })}
      >
        {showInviewport && (
          <div
            className="scaffold-image"
            style={{
              backgroundImage: `url("${data.screenshot}")`,
            }}
          />
        )}
        {showInviewport && (
          <div className="scaffold-title-wrapper">
            <div className="scaffold-title">{data.title}</div>
            {data._isNew && <div className="global-new-tag">new</div>}
          </div>
        )}
        {showInviewport && (
          <div className="scaffold-flipcard">
            <div className="scaffold-flipcard-body">
              <h2>{data.title}</h2>
              <div>
                <p>{data.description}</p>
              </div>
            </div>
            <div className="scaffold-flipcard-button">
              <Button size="small" onClick={this.createProject} type="primary">
                使用该模板
              </Button>
              &nbsp;&nbsp;
              {data.homepage && (
                <Button size="small" onClick={this.openInBrowser} type="normal">
                  在线预览
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default handleViewport(ScaffoldItem);
