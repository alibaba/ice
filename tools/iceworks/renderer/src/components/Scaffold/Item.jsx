import { Button } from '@icedesign/base';
import electron from 'electron';
import React, { Component } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import handleViewport from 'react-in-viewport';
import services from '../../services';
import dialog from '../../components/dialog';

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
    const { data, createProject } = this.props;
    const isAlibaba = services.settings.get('isAlibaba');
    if (
      isAlibaba &&
      data.devDependencies &&
      !data.devDependencies.hasOwnProperty('ice-scripts')
    ) {
      dialog.confirm(
        {
          title: '提示',
          content: (
            <div>
              当前模板使用的构建工具非 ice-scripts ，接入 DEF
              发布流程需要单独自行处理，请慎重使用
            </div>
          ),
        },
        () => {
          createProject(data);
        }
      );
    } else {
      createProject(data);
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
