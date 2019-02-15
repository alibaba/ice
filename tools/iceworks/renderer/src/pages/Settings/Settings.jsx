/* eslint react/no-string-refs:0 */
import {
  Form,
  Switch,
  Radio,
  Select,
  Field,
  Input,
  Button,
} from '@icedesign/base';
import { remote } from 'electron';
import Notification from '@icedesign/notification';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

const { registries: originRegistries } = remote.require('./shared');
import RecommendMaterials from './RecommendMaterials';
import CustomMaterials from './CustomMaterials';
import Separator from './Separator';
import services from '../../services';
import filterRegistry from '../../lib/filter-registry';
import BrowserLink from '../../components/BrowserLink';
const { settings, shared } = services;
const { Shell } = services.shells.shared;
const { ExternalEditor, CUSTOM_EDITOR } = services.editors.shared;

const registries = filterRegistry(originRegistries).concat([
  {
    label: '自定义',
    value: '__custom_registry__',
  },
]);

const FormItem = Form.Item;
const { Group: RadioGroup } = Radio;

@observer
class Setting extends Component {
  constructor(props) {
    super(props);
    const userconfig = settings.getAll();
    const { registry } = userconfig;

    // 判断是否在默认定义的 registries 里，不在则表示是自定义的类型
    const isRegistryCustom = this.checkRegistryIsCustom(registry);

    this.state = {
      userconfig: userconfig || {},
      currentEditor: userconfig.editor || 'VisualStudioCode', // 当前选择的浏览器
      editorShell: userconfig.editorShell || '',
      registryCustomVisible: isRegistryCustom, // 判断是否为自定义源，则展示自定义输入框
    };

    this.field = new Field(this, {
      onChange: this.handleFormChange,
    });
  }

  checkRegistryIsCustom = (registryUrl) => {
    const inRegistryes = originRegistries.some((reg) => {
      if (reg.value == registryUrl) {
        return true;
      }
      return false;
    });
    return !inRegistryes;
  };

  notificationTimer = null;
  udpateSettings = (key, value) => {
    settings.set(key, value);
    clearTimeout(this.notificationTimer);
    this.notificationTimer = setTimeout(() => {
      try {
        Notification.destroy();
        Notification.success({ message: '设置变更已保存' });
      } catch (e) {
        console.log('提示失败', e);
      }
    }, 300);
  };

  throttleTimer = null;
  handleFormChange = (key, value) => {
    if (key == 'registryCustom') {
      // 输入自定义 NPM 源地址
      if (!this.field.getError('registryCustom')) {
        clearTimeout(this.throttleTimer);
        this.throttleTimer = setTimeout(() => {
          this.udpateSettings('registry', value);
        }, 300);
      }
    } else if (key == 'editorShell') {
      // 输入自定义编辑器启动脚本
      if (!this.field.getError(key)) {
        clearTimeout(this.throttleTimer);
        this.throttleTimer = setTimeout(() => {
          this.udpateSettings(key, value);
        }, 300);
      }
    } else if (key == 'editor') {
      this.setState({ currentEditor: value });
      this.udpateSettings(key, value);
    } else if (key == 'registry') {
      const isRegistryCustom = this.checkRegistryIsCustom(value);
      this.setState({ registryCustomVisible: isRegistryCustom });
      if (!isRegistryCustom) {
        // 不是自定义的直接保存变更
        this.udpateSettings(key, value);
      }
    } else {
      this.udpateSettings(key, value);
    }
  };

  render() {
    const formItemLayout = {
      className: 'settings-item',
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 18,
      },
      size: 'medium',
    };

    const { init } = this.field;

    const terminalSource = Object.keys(Shell).map((name) => {
      return {
        label: Shell[name],
        value: name,
      };
    });

    const externalEditorSource = Object.keys(ExternalEditor).map((name) => {
      return {
        label: ExternalEditor[name],
        value: name,
      };
    });

    return (
      <div className="settings">
        <div key="r1" className="settings-body">
          <RecommendMaterials />
          <CustomMaterials />
          <Separator title="通用" />
          <Form
            style={{ padding: '0 20px' }}
            size="large"
            direction="ver"
            field={this.field}
          >
            <FormItem label="终端" {...formItemLayout}>
              <RadioGroup
                dataSource={terminalSource}
                {...init('terminal', {
                  initValue: this.state.userconfig.terminal || 'Terminal',
                })}
              />
            </FormItem>

            <FormItem label="编辑器" {...formItemLayout}>
              <RadioGroup
                dataSource={externalEditorSource}
                {...init('editor', {
                  initValue: this.state.userconfig.editor || 'VisualStudioCode',
                })}
              />
            </FormItem>
            <FormItem
              style={{
                display:
                  this.state.currentEditor == CUSTOM_EDITOR ? 'flex' : 'none',
              }}
              label=" "
              {...formItemLayout}
            >
              <Input
                style={{
                  width: 300,
                }}
                {...init('editorShell', {
                  initValue: this.state.userconfig.editorShell,
                  rules: [
                    { required: true, message: '编辑器启动脚本不能为空' },
                  ],
                })}
                placeholder="自定义启动脚本如: open --project=${cwd}"
              />

              <BrowserLink
                style={{ marginLeft: 20 }}
                href="https://github.com/alibaba/ice/wiki/custom-editor"
              >
                需要帮助
              </BrowserLink>
            </FormItem>

            <FormItem label="NPM 源" {...formItemLayout}>
              <Select
                style={{
                  width: 300,
                }}
                autoWidth={true}
                dataSource={registries}
                {...init('registry', {
                  initValue: this.state.registryCustomVisible
                    ? '__custom_registry__'
                    : this.state.userconfig.registry ||
                      'http://registry.npmjs.org',
                })}
              />
            </FormItem>

            <FormItem
              style={{
                display: this.state.registryCustomVisible ? 'flex' : 'none',
              }}
              label=" "
              {...formItemLayout}
            >
              <Input
                style={{
                  width: 300,
                }}
                {...init('registryCustom', {
                  initValue: this.state.userconfig.registry,
                  rules: [
                    {
                      required: true,
                      type: 'url',
                      message: '请输入正确的 URL 地址',
                    },
                  ],
                })}
                placeholder="请输入自定义源地址"
              />
            </FormItem>

            <FormItem label="消息提示音" {...formItemLayout}>
              <Switch
                {...init('tone', {
                  initValue: this.state.userconfig.tone,
                  valueName: 'checked',
                })}
              />
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Setting;
