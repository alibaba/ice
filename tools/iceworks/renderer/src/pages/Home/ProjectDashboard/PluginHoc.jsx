import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DashboardCard from '../../../components/DashboardCard';
import EmptyTips from '../../../components/EmptyTips';
import logger from '../../../lib/logger';

const PluginHoc = (WrappedComponent) => {
  @inject('git')
  @observer
  class Plugin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
      };
    }

    componentDidCatch(error) {
      const extension = WrappedComponent.extensionName || WrappedComponent.displayName || WrappedComponent.name;
      error.message = `${extension} error: ${error.message}`;
      logger.error(error);
      this.props.git.loading = false;
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return (
          <DashboardCard>
            <DashboardCard.Header></DashboardCard.Header>
            <DashboardCard.Body>
              <EmptyTips size={120}>
插件
                {WrappedComponent.extensionName}
出错，请在设置中关闭，并建议将此问题反馈给飞冰（ICE）团队，点击菜单项：帮助 => 反馈问题
              </EmptyTips>
            </DashboardCard.Body>
          </DashboardCard>
        );
      }
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  }

  Plugin.displayName = `Hoc(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  Plugin.extensionName = WrappedComponent.extensionName;

  return Plugin;
};

export default PluginHoc;
