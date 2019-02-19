import { ipcRenderer } from 'electron';
import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import scriptsListener from './scripts-listener';

// stores
import blocks from './stores/blocks';
import customScaffold from './stores/custom-scaffold';
import extensions from './stores/extensions';
import installer from './stores/installer';
import newpage from './stores/newpage';
import pageBlockPicker from './stores/page-block-picker';
import projects from './stores/projects';
import scaffold from './stores/scaffold';
import materials from './stores/materials';
import switcher from './stores/switcher';
import customBlocks from './stores/custom-blocks';
import settingsMaterials from './stores/settings-materials';
import user from './stores/user';
import progress from './stores/progress';
import blockGroups from './stores/block-groups';
import git from './stores/git';

import services from './services';
const { settings } = services;

// pages
import history from './history';
import Layout from './Layout';
const {
  PageHome,
  PageScaffolds,
  PageBlocks,
  PageExtensions,
  PageSettings,
} = require('./router');

// spc
require('./spc');
require('./lib/project-shortcut');

// 将 projects 与 scaffold 关联
scaffold.projects = projects;
// ice-scripts 命令行终端监听同步状态
scriptsListener.initialize(projects);

class App extends Component {
  constructor(props) {
    super(props);
    const location = history.location;
    this.state = {
      activePathname: location.pathname,
    };
  }

  componentWillMount = () => {
    // 过滤用户设置的fusion，bizchart物料源。
    const materials = settings.get('materials');
    settings.set('materials', materials.filter(material => {
      if (['Fusion 物料源', 'Bizchart 物料源'].includes(material.name)) {
        return false;
      } 
      return true;
    }));
  }

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      // location is an object like window.location
      // console.log(action, location.pathname, location.state);
      this.changeDisplay(location.pathname);
    });

    // 根据url唤起是传参来定位当前path，定位后重置参数
    const urlEvokeQuery = settings.get('urlEvokeQuery');
    if (urlEvokeQuery && urlEvokeQuery.to) {
      history.push(urlEvokeQuery.to);
      settings.set('urlEvokeQuery', Object.assign(urlEvokeQuery, {to: ''}));
    }

    ipcRenderer.on('router.push', (event, { url, state, title }) => {
      history.push(url);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  changeDisplay = (pathname) => {
    this.setState({
      activePathname: pathname,
    });
  };

  render() {
    return (
      <Provider
        blocks={blocks}
        customScaffold={customScaffold}
        extensions={extensions}
        installer={installer}
        newpage={newpage}
        pageBlockPicker={pageBlockPicker}
        projects={projects}
        scaffold={scaffold}
        materials={materials}
        switcher={switcher}
        customBlocks={customBlocks}
        settingsMaterials={settingsMaterials}
        user={user}
        progress={progress}
        blockGroups={blockGroups}
        git={git}
      >
        <Layout>
          <VisibleWrapper
            visible={
              this.state.activePathname == '/' ||
              this.state.activePathname == '/index.html'
            }
          >
            <PageHome />
          </VisibleWrapper>
          <VisibleWrapper visible={this.state.activePathname == '/scaffolds'}>
            <PageScaffolds />
          </VisibleWrapper>
          <VisibleWrapper visible={this.state.activePathname == '/blocks'}>
            <PageBlocks />
          </VisibleWrapper>
          <VisibleWrapper
            rerender={true}
            visible={this.state.activePathname == '/settings'}
          >
            <PageSettings />
          </VisibleWrapper>

          <VisibleWrapper visible={this.state.activePathname == '/extensions'}>
            <PageExtensions />
          </VisibleWrapper>
        </Layout>
      </Provider>
    );
  }
}

class VisibleWrapper extends Component {
  rendered = false;

  render() {
    const { rerender, visible } = this.props;

    if (rerender && !visible) {
      return null;
    }

    if (!visible && this.rendered == false) {
      return null;
    }

    this.rendered = true;
    return (
      <div
        className="visible-wrapper"
        style={{
          display: visible ? 'flex' : 'none',
          minHeight: '100vh',
          flex: 'auto',
          flexDirection: 'column',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default App;
