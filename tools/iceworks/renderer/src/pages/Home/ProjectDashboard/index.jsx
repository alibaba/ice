import { inject, observer } from 'mobx-react';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import React, { Component } from 'react';
import classnames from 'classnames';

import Assets from './Assets';
import Aliyun from './Aliyun';
import Dependencies from './Dependencies';
import Todo from './Todo';
import Pages from './Pages';
import Layouts from './Layouts';
import Proxies from './Proxies';
import Def from './Def';
import Git from './Git';

const ExtensionMap = {
  [Assets.extensionName]: Assets,
  [Aliyun.extensionName]: Aliyun,
  [Def.extensionName]: Def,
  [Git.extensionName]: Git,
  [Dependencies.extensionName]: Dependencies,
  [Layouts.extensionName]: Layouts,
  [Pages.extensionName]: Pages,
  [Proxies.extensionName]: Proxies,
  [Todo.extensionName]: Todo,
};

import Link from '../../../components/Link';

import './index.scss';

// eslint-disable-next-line babel/new-cap
const DragHandle = SortableHandle(() => (
  <span className="sortable-extension-item-handle" />
));
// eslint-disable-next-line babel/new-cap
const SortableExtensionItem = SortableElement(
  ({ Component, isSorting, props }) => {
    return (
      <div
        className={classnames({
          'sortable-extension-item': true,
          'sortable-extension-item-sorting': isSorting,
        })}
      >
        <DragHandle />
        <Component {...props} />
      </div>
    );
  }
);
// eslint-disable-next-line babel/new-cap
const SortableExtensions = SortableContainer(({ items, isSorting }) => {
  return (
    <div className={'sortable-extensions'}>
      {items.map(({ Component, props }, index) => {
        return (
          <SortableExtensionItem
            key={'sortable-extension-item' + index}
            index={index}
            Component={Component}
            isSorting={isSorting}
            props={props}
          />
        );
      })}
    </div>
  );
});

@inject('projects', 'extensions')
@observer
class ProjectDashboard extends Component {
  constructor(props) {
    super(props);
  }

  onSortStart = () => {
    this.props.extensions.sortStart();
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const { orderByName } = this.props.extensions;
      const newOrderByName = arrayMove(orderByName, oldIndex, newIndex);
      this.props.extensions.orderByName = newOrderByName;
    }
    this.props.extensions.sortEnd();
  };

  render() {
    const { projects, extensions } = this.props;
    const { currentProject } = projects;
    const { orderByName, isSorting } = extensions;

    if (
      !(currentProject && currentProject.exists) ||
      currentProject.isUnavailable
    ) {
      return null;
    }

    if (orderByName.length > 0) {
      const extensionComponents = orderByName.map((name) => {
        return { Component: ExtensionMap[name] };
      }).filter((extension) => {
        return !!extension.Component;
      });
      return (
        <div className={this.props.className}>
          <SortableExtensions
            axis="xy"
            helperClass={'sortable-extension-item-draging'}
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
            items={extensionComponents}
            isSorting={isSorting}
          />
        </div>
      );
    }

    return (
      <div className="project-dashboard-empty">
        未开启任何插件，可前往 <Link to="/extensions">插件</Link> 选择开启
      </div>
    );
  }
}

export default ProjectDashboard;
