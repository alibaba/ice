import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import useModal from '@hooks/useModal';
import stores from '../../stores';
import SavePageModel from './SavePageModel';
import styles from './CreatePageModal.module.scss';

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

  async function onSaveOk(data) {
    await onOk({
      ...page.dataSource,
      ...data,
    });
    toggleSaveModal();
  }

  return (
    <div>
      <Modal
        title="创建页面"
        visible={on}
        onCancel={onClose}
        onOk={onCreateOk}
      >
        <div className={styles.wrap}>
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
