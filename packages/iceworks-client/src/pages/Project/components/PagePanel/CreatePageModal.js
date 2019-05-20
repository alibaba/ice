import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Field } from '@alifd/next';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import stores from '../../stores';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 5,
  },
};

class SavePageModel extends Component {
  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  onOk = () => {
    const { onOk } = this.props;
    this.field.validate((errors, values) => {
      if (!errors) {
        onOk(values);
      }
    });
  }

  render() {
    const { init } = this.field;
    const { on, onCancel } = this.props;
    return (
      <Modal
        title="填写页面信息"
        visible={on}
        onCancel={onCancel}
        onOk={this.onOk}
      >
        <Form
          size="small"
          direction="ver"
          style={{ width: 320, paddingTop: '30px' }}
          field={this.field}
        >
          <FormItem {...formItemLayout} required label="页面目录名">
            <Input
              style={{ width: 200 }}
              {...init('name', {
                initValue: 'name',
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                    trigger: ['onChange'],
                  },
                  {
                    pattern: /^[a-z]([-_a-z0-9]*)$/i,
                    message: '请输入字母与数字组合，字母开头',
                    trigger: ['onChange'],
                  },
                  {
                    pattern: /^(?!index$)/i,
                    message: '`index` 为关键字，请更换',
                    trigger: ['onChange'],
                  },
                ],
              })}
              placeholder="请输入页面目录名，字母与数字组合，字母开头"
            />
          </FormItem>
          <FormItem {...formItemLayout} required label="路由路径">
            <Input
              style={{ width: 200 }}
              {...init('routePath', {
                initValue: 'routePath',
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                    trigger: ['onBlur', 'onChange'],
                  },
                  {
                    pattern: /^(\/?)([a-zA-Z0-9:])([a-zA-Z0-9:]*)((\/)?[a-zA-Z0-9:]+)$/,
                    message:
                      '请输入小写字母数字组合，支持二级路由以 `/` 分隔',
                    trigger: ['onBlur', 'onChange'],
                  },
                ],
              })}
              placeholder="请输入小写字母数字组合，支持二级路由以 `/` 分隔"
            />
          </FormItem>
          <FormItem {...formItemLayout} label="页面导航名">
            <Input
              style={{ width: 200 }}
              {...init('menuName', {
                initValue: 'menuName',
                rules: [{ trigger: ['onBlur', 'onChange'] }],
              })}
              placeholder="为空则不生成导航项"
            />
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

SavePageModel.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

// TODO
const pageData = {
  layout: {
    name: 'BasicLayout',
    title: 'BasicLayout',
    description: '用户自定义布局 - BasicLayout',
    customLayout: true,
    localization: true,
    folderName: 'BasicLayout',
    screenshot: 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png',
    thumbnail: 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png',
  },
  blocks: [
    {
      name: 'excellent-home-page',
      title: '简洁大气首页',
      description: '简洁大气首页',
      homepage: 'https://unpkg.com/@icedesign/excellent-home-page-block/build/index.html',
      categories: [
        '欢迎页',
      ],
      repository: 'https://github.com/ice-lab/react-materials/tree/master/blocks/ExcellentHomePage',
      source: {
        type: 'npm',
        npm: '@icedesign/excellent-home-page-block',
        version: '1.0.0',
        registry: 'http://registry.npmjs.com',
        'version-0.x': '2.0.0',
        sourceCodeDirectory: 'src/',
      },
      dependencies: {
        'prop-types': '^15.5.8',
        react: '^16.2.0',
        '@alifd/next': '^1.x',
      },
      screenshot: 'https://unpkg.com/@icedesign/excellent-home-page-block/screenshot.png',
      screenshots: [
        'https://unpkg.com/@icedesign/excellent-home-page-block/screenshot.png',
      ],
      customConfig: null,
      features: {
        useComponents: [
          {
            basePackage: '@alifd/next',
            className: 'Button',
          },
        ],
      },
      publishTime: '2018-12-13T09:07:38.022Z',
      updateTime: '2019-04-26T13:54:41.243Z',
      _isNew: true,
      uid: 'd7eba710-7ae7-11e9-b51c-6b6abc08871d',
      alias: 'ExcellentHomePage',
    },
    {
      name: 'data-overview',
      title: '数据概览',
      description: '基础数据概览',
      homepage: 'https://unpkg.com/@icedesign/data-overview-block/build/index.html',
      categories: [
        '信息展示',
      ],
      repository: 'https://github.com/ice-lab/react-materials/tree/master/blocks/DataOverview',
      source: {
        type: 'npm',
        npm: '@icedesign/data-overview-block',
        version: '1.0.0',
        registry: 'http://registry.npmjs.com',
        'version-0.x': '2.0.0',
        sourceCodeDirectory: 'src/',
      },
      dependencies: {
        '@icedesign/container': '^1.x',
        'prop-types': '^15.5.8',
        react: '^16.2.0',
      },
      screenshot: 'https://unpkg.com/@icedesign/data-overview-block/screenshot.png',
      screenshots: [
        'https://unpkg.com/@icedesign/data-overview-block/screenshot.png',
      ],
      customConfig: null,
      features: {
        useComponents: [
          {
            basePackage: '@icedesign/container',
            className: 'Container',
          },
        ],
      },
      publishTime: '2018-12-13T09:03:35.646Z',
      updateTime: '2019-04-26T13:54:16.266Z',
      _isNew: true,
      uid: 'da3792e0-7ae7-11e9-b51c-6b6abc08871d',
      alias: 'DataOverview',
    },
  ],
};

const CreatePageModal = ({
  on, onCancel, onOk,
}) => {
  const {
    on: onSaveModel,
    toggleModal: toggleSaveModal,
  } = useModal();
  const page = stores.useStore('page');
  function onClose() {
    onCancel();
  }
  function onCreateOk() {
    page.setData(pageData);
    toggleSaveModal();
  }

  function onSaveOk(data) {
    toggleSaveModal();
    onOk({
      ...page.dataSource,
      ...data,
    });
  }

  return (
    <div>
      <Modal
        title="创建页面"
        visible={on}
        onCancel={onClose}
        onOk={onCreateOk}
      >
        <div>
          测试的搭建页面
        </div>
      </Modal>
      <SavePageModel
        on={onSaveModel}
        onCancel={toggleSaveModal}
        onOk={onSaveOk}
      />
    </div>
  );
};

CreatePageModal.propTypes = {
  on: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default CreatePageModal;
