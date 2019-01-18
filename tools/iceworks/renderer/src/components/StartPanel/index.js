import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button } from '@icedesign/base';

import EmptyTips from '../../components/EmptyTips';
import { Item as ScaffoldItem, ScaffoldHoc } from '../Scaffold';
import CreateProjectDialog from '../CreateProjectDialog';
import history from '../../history';
import Icon from '../Icon';

import './index.scss';

@inject('materials', 'scaffold', 'projects')
@observer
class StartPanel extends Component {
  static displayName = 'StartPanel';

  static propTypes = {
    materials: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    handleSelectedScaffold: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.materials.loadStartRecommendMaterials();
  }

  openExistProject = () => {
    this.props.projects.addFromFinder();
  };

  gotoCreateProject = () => {
    history.push('/scaffolds');
  };

  render() {
    const {
      materials: { startRecommendMaterials },
    } = this.props;
    const { scaffolds = [] } = startRecommendMaterials;

    if (!startRecommendMaterials.loaded) {
      return <EmptyTips size={120}>加载中...</EmptyTips>;
    }

    return (
      <div className="start-panel">
        {scaffolds.length ? (
          <div className="start-recommend-scaffolds">
            {scaffolds.map((material, index) => {
    
              return (
                <ScaffoldItem
                  key={index}
                  createProject={this.props.handleSelectedScaffold}
                  data={material}
                  isOfficialSource={true}
                />
              );
            })}
          </div>
        ) : (
          <img
            src="https://img.alicdn.com/tfs/TB1WNNxjBHH8KJjy0FbXXcqlpXa-780-780.png"
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
        <div className="start-panel-desc">
          {scaffolds.length
            ? '从热门模板开始初始化你的项目'
            : '暂无项目请先打开项目或创建项目'}
        </div>
        <div className="buttons">
          <Button type="primary" onClick={this.openExistProject}>
            <Icon type="folderplus" /> 打开项目
          </Button>
          <Button type="primary" onClick={this.gotoCreateProject}>
            <Icon type="plus" /> {scaffolds.length ? '更多模板' : '创建项目'}
          </Button>
        </div>
        <CreateProjectDialog />
      </div>
    );
  }
}

export default ScaffoldHoc(StartPanel);
