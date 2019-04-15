import { hot } from 'react-hot-loader';
import React, { Component } from 'react';

import CreatePage from './CreatPage';
import PageBlockPicker from '../../components/PageBlockPicker';
import ProjectPanel from './ProjectPanel';
import ProjectSwitch from './ProjectSwitch';

import './index.scss';

class Home extends Component {
  render() {
    return (
      <div className="project-home">
        <ProjectPanel />
        <ProjectSwitch />
        <CreatePage />
        <PageBlockPicker />
      </div>
    );
  }
}

export default hot(module)(Home);
