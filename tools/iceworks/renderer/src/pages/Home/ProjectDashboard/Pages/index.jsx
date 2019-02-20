/**
 * 获取当前页面项目的所有 page
 */

import { inject, observer } from 'mobx-react';
import { ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import React, { Component } from 'react';
import dayjs from 'dayjs';
import Notification from '@icedesign/notification';
import orderBy from 'lodash.orderby';

import { readdirSync } from '../../../../lib/file-system';
import DashboardCard from '../../../../components/DashboardCard/';
import ExtraButton from '../../../../components/ExtraButton/';
import Icon from '../../../../components/Icon';
import EmptyTips from '../../../../components/EmptyTips';

import dialog from '../../../../components/dialog';

import services from '../../../../services';
const { log, interaction, scaffolder } = services;

import './index.scss';
import { Dialog } from '@icedesign/base';

function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD hh:mm');
}

function recursivePagesSync(dirPath, rootDir) {
  const list = [];
  let stats;
  const files = readdirSync(dirPath);
  files.forEach(function(file) {
    let fullPath = path.join(dirPath, file);
    stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      const { atime, birthtime, ctime, mtime } = stats;
      list.push({
        name: path.relative(rootDir, fullPath),
        fullPath,
        atime: formatDate(atime),
        birthtime: formatDate(birthtime),
        ctime: formatDate(ctime),
        mtime: formatDate(mtime),
      });
    }
  });

  return list;
}

@inject('projects', 'newpage', 'pageBlockPicker')
@observer
class PagesCard extends Component {
  static extensionName = 'pages';

  constructor(props) {
    super(props);

    this.state = {
      pages: [],
    };
  }

  UNSAFE_componentWillMount() {
    this.serachPages();
  }

  componentDidMount() {
    ipcRenderer.on('focus', this.serachPages);
    this.props.projects.on('change', this.serachPages);
    this.props.newpage.on('generate-page-success', this.serachPages);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('focus', this.serachPages);
    this.props.projects.removeListener('change', this.serachPages);
    this.props.newpage.removeListener('generate-page-success', this.serachPages);
  }

  serachPages = () => {
    const { projects } = this.props;
    const { currentProject } = projects;

    if (currentProject && currentProject.fullPath) {
      const pagesDirectory = path.join( currentProject.clientSrcPath, 'pages' );
      const pages = recursivePagesSync(pagesDirectory, pagesDirectory);
      this.setState({ pages: pages });
    } else {
      this.setState({ pages: [] });
    }
  };

  handleCreatePage = () => {
    const { projects } = this.props;
    this.props.newpage.toggle();
  };

  handlePageDelete = (name) => {
    const { projects, newpage } = this.props;
    const { currentProject } = projects;

    Dialog.confirm({
      title: '删除页面',
      content: `确定删除页面 ${name} 吗？`,
      onOk: () => {
          scaffolder.removePage({
          clientSrcPath: currentProject.clientSrcPath,
          pageFolderName: name
        })
        .then(() => {
          log.debug('删除页面成功');
          Notification.success({ message: `删除页面 ${name} 成功` });
          this.serachPages();
        })
        .catch((error) => {
          log.debug('删除页面失败', error);
          dialog.notice({ title: '删除页面失败', error: error });
        });
      }
    });
  };

  handlePageAddBlock(fullPath, name) {
    // todo 增加 block 到指定页面中
    this.props.pageBlockPicker.open({
      blocksPath: fullPath,
      projectPath: this.props.projects.currentProject.fullPath,
      pageName: name,
    });
  }

  renderPageList = () => {
    const { pages } = this.state;
    if (pages && pages.length == 0) {
      return <EmptyTips>暂无页面</EmptyTips>;
    }
    // 按时间倒叙
    const pagesOrderByTime = orderBy(pages, ['birthtime'], ['desc']);

    return pagesOrderByTime.map((page) => {
      if (page.name === 'IceworksPreviewPage') {
        return null;
      }
      return (
        <div className="page-item" key={page.name} data-path={page.fullPath}>
          <div className="name">{page.name}</div>
          <div className="operational">
            <span className="page-creat-time">{page.birthtime}</span>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText="添加区块"
              onClick={this.handlePageAddBlock.bind(
                this,
                page.fullPath,
                page.name
              )}
            >
              <Icon type="block-add" />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText="删除页面"
              onClick={this.handlePageDelete.bind(
                this,
                page.name
              )}
            >
              <Icon type="trash" />
            </ExtraButton>
          </div>
        </div>
      );
    });
  };

  render() {
    const { pages } = this.state;
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>
            页面列表
            <span style={{ paddingLeft: 10, fontSize: 12, color: '#666' }}>
              ({pages.length})
            </span>
          </div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'刷新'}
              onClick={this.serachPages}
            >
              <Icon type="reload" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'新建页面'}
              onClick={this.handleCreatePage}
            >
              <Icon type="plus-o" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>{this.renderPageList()}</DashboardCard.Body>
      </DashboardCard>
    );
  }
}

export default PagesCard;
