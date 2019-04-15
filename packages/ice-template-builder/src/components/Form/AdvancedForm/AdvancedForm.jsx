import React, { Component } from 'react';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { Checkbox } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';
import Tooltip from 'rc-tooltip';
import CreateForm from '../CreateForm';

class AdvancedForm extends Component {
  static displayName = 'AdvancedForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      value: { redux },
    } = this.props;

    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.formChange}
      >
        <div className="form-group">
          <div style={styles.formHead}>
            <span style={styles.title}>
              Redux 配置
              <Tooltip
                overlayStyle={{ width: '120px' }}
                placement="top"
                trigger={['hover']}
                overlay={
                  <span>
                    生成基础的 redux 配置文件，默认会同步路由信息到 redux store
                  </span>
                }
              >
                <FoundationSymbol
                  type="bangzhu"
                  size="xs"
                  style={styles.icon}
                />
              </Tooltip>
              ：
            </span>
            <IceFormBinder name="redux.enabled">
              <Checkbox size="large" checked={redux.enabled} />
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
            <span>
              注册登录示例
              <Tooltip
                overlayStyle={{ width: '100px' }}
                placement="top"
                trigger={['hover']}
                overlay={<span> 生成注册登录的示例代码</span>}
              >
                <FoundationSymbol
                  type="bangzhu"
                  size="xs"
                  style={styles.icon}
                />
              </Tooltip>
            </span>
            ：
            <IceFormBinder name="redux.registerLoginModule">
              <Checkbox
                size="large"
                checked={redux.registerLoginModule}
                disabled={!redux.enabled}
              />
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
            <span>
              权限管理示例
              <Tooltip
                overlayStyle={{ width: '100px' }}
                placement="top"
                trigger={['hover']}
                overlay={<span>生成权限管理的示例代码</span>}
              >
                <FoundationSymbol
                  type="bangzhu"
                  size="xs"
                  style={styles.icon}
                />
              </Tooltip>
              ：
            </span>

            <IceFormBinder name="redux.authorityModule">
              <Checkbox
                size="large"
                checked={redux.authorityModule}
                disabled={!redux.enabled}
              />
            </IceFormBinder>
          </div>

          <div style={styles.formItem}>
            <span>
              Mock 示例
              <Tooltip
                overlayStyle={{ width: '100px' }}
                placement="top"
                trigger={['hover']}
                overlay={<span>生成简单的 Mock 示例代码</span>}
              >
                <FoundationSymbol
                  type="bangzhu"
                  size="xs"
                  style={styles.icon}
                />
              </Tooltip>
              ：
            </span>
            <IceFormBinder name="redux.mockModule">
              <Checkbox
                size="large"
                checked={redux.mockModule}
                disabled={!redux.enabled}
              />
            </IceFormBinder>
          </div>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

export default CreateForm(AdvancedForm);

const styles = {
  title: {
    fontWeight: '500',
  },
  formHead: {
    marginBottom: '20px',
  },
  formItem: {
    marginBottom: '15px',
  },
  icon: {
    margin: '0 4px',
    color: 'rgba(0, 0, 0, 0.2)',
  },
};
