import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import { inject, observer } from 'mobx-react';

import { openInBrowser } from '../../external';
import Icon from '../Icon';
import handleViewport from 'react-in-viewport';

import './index.scss';

function withAlicdnImage(url) {
  if (url && url.indexOf('img.alicdn.com') !== -1) {
    return url + '_250x250.jpg';
  }
  return url;
}

@inject('blocks')
@observer
class Block extends Component {
  static propTypes = {
    handleBlocksAdd: PropTypes.func,
    block: PropTypes.object,
    blocks: PropTypes.object,
    originKeywords: PropTypes.string,
  };

  static defaultProps = {
    handleBlocksAdd: () => {},
  };

  handleClick = () => {
    this.props.handleBlocksAdd(this.props.block);
  };

  createPageOpener = (url) => {
    return () => {
      openInBrowser(url);
    };
  };

  openBlockImgPreview = (event) => {
    event.stopPropagation();
    const { blocks, block } = this.props;
    blocks.openModal(block);
  };

  openBlockOnlinePreview = (event) => {
    event.stopPropagation();
    const { block } = this.props;
    openInBrowser(block.homepage);
  };

  openBlockGithub = (event) => {
    event.stopPropagation();
    const { block } = this.props;
    openInBrowser(block.repository);
  };

  // afterVisibleChange = (visible) => {
  //   console.log('afterVisibleChange:', visible);
  // };

  render() {
    const { block, originKeywords = '', innerRef, enterCount } = this.props;
    let title = block.title;
    let name = block.name;

    if (originKeywords) {
      const keys = originKeywords.split(/\s+/).filter(Boolean);
      const matchRegex = new RegExp(keys.join('|'), 'gi');
      title = title.replace(matchRegex, (str) => {
        return `<span style="color: #ffa000">${str}</span>`;
      });
      name = name.replace(matchRegex, (str) => {
        return `<span style="color: #ffa000">${str}</span>`;
      });
    }

    return (
      <div className="block" onClick={this.handleClick} ref={innerRef}>
        <div className="screenshot">
          {enterCount > 0 && (
            <div
              className="screenshot-img"
              style={{
                backgroundImage: `url(${withAlicdnImage(block.screenshot)})`,
              }}
            />
          )}
        </div>
        {enterCount > 0 && (
          <div className="title-wrapper">
            <div className="title-body">
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {block._isNew && <div className="global-new-tag">new</div>}
            </div>

            <div
              className="class-name"
              dangerouslySetInnerHTML={{ __html: name }}
            />
          </div>
        )}
        {enterCount > 0 && (
          <div className="panel">
            <span className="preview" onClick={this.openBlockImgPreview}>
              <Tooltip
                afterVisibleChange={this.afterVisibleChange}
                placement={'bottom'}
                overlay={'预览效果图'}
              >
                <Icon type="02magnifyingglasspluszoom" />
              </Tooltip>
            </span>
            {block.homepage && (
              <span className="preview" onClick={this.openBlockOnlinePreview}>
                <Tooltip placement={'bottom'} overlay={'在线预览'}>
                  <Icon type="eye" />
                </Tooltip>
              </span>
            )}
            {block.repository && (
              <span className="repo" onClick={this.openBlockGithub}>
                <Tooltip placement={'bottom'} overlay={'查看源码'}>
                  <Icon type="github" />
                </Tooltip>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default handleViewport(Block);
