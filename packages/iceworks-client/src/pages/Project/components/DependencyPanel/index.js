import React from 'react';
import { Icon, Tab } from '@alifd/next';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage } from 'react-intl';
import useDependency, { STATUS_RESETING } from '@hooks/useDependency';
import CreateDependencyModal from './CreateDependencyModal';
import Panel from '../Panel';
import styles from './index.module.scss';

const { Item: TabPane } = Tab;

const DependencyItem = ({
  package: packageName, localVersion, wantedVestion, isDev, onUpgrade,
}) => {
  return (
    <div key={packageName} className={styles.item}>
      <div className={styles.package}>
        {packageName}
      </div>
      <div className={styles.info}>
        <div className={styles.version}>{localVersion || '-'}</div>
        {
          wantedVestion ?
            <div title={<FormattedMessage id="iceworks.project.panel.dependency.main.upgrade" values={{ wantedVestion }} />}>
              <Icon type="download" size="xs" className={styles.download} onClick={() => onUpgrade(packageName, isDev)} />
            </div> :
            null
        }
      </div>
    </div>
  );
};

DependencyItem.defaultProps = {
  package: '',
  localVersion: '',
  wantedVestion: '',
  isDev: false,
  onUpgrade: () => {},
};

DependencyItem.propTypes = {
  package: PropTypes.string,
  localVersion: PropTypes.string,
  wantedVestion: PropTypes.string,
  isDev: PropTypes.bool,
  onUpgrade: PropTypes.func,
};

const DependencyPanel = () => {
  const {
    onReset,
    onCreate,

    onCreateModal,
    setCreateModal,
    onResetModal,
    setResetModal,
    onIncompatibleModal,
    setIncompatibleModal,

    bulkCreate,
    upgrade,
    refresh,
    reset,

    dependenciesStore,
    incompatibleDependencyText,
    projectDependencyText,
    setDependencies,
  } = useDependency();

  const { dataSource } = dependenciesStore;

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.dependency.title" /></h3>
          <div className={styles.icons}>
            <FormattedMessage id="iceworks.project.panel.dependency.main.refresh">
              {(title) => (
                <Icon
                  className={styles.icon}
                  type="refresh"
                  size="small"
                  onClick={refresh}
                  title={title}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="iceworks.project.panel.dependency.main.download">
              {(title) => (
                <Icon
                  className={
                    classNames({
                      [styles.icon]: true,
                      [styles.reseting]: dataSource.status === STATUS_RESETING,
                    })
                  }
                  type="download"
                  size="small"
                  onClick={onReset}
                  title={title}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="iceworks.project.panel.dependency.main.add">
              {(title) => (<Icon
                className={
                  classNames({
                    [styles.icon]: true,
                    [styles.reseting]: dataSource.status === STATUS_RESETING,
                  })
                }
                type="add"
                size="small"
                onClick={onCreate}
                title={title}
              />)}
            </FormattedMessage>
          </div>
        </div>
      }
    >
      <div className={styles.main}>
        <CreateDependencyModal
          on={onCreateModal}
          onCancel={() => setCreateModal(false)}
          onOk={bulkCreate}
        />
        <Modal
          title={<FormattedMessage id="iceworks.project.panel.dependency.main.reset.title" />}
          visible={onResetModal}
          onCancel={() => setResetModal(false)}
          onOk={reset}
        >
          <FormattedMessage id="iceworks.project.panel.dependency.main.reset.content" />
        </Modal>
        <Modal
          title={<FormattedMessage id="iceworks.project.panel.dependency.main.incompatible.title" />}
          visible={onIncompatibleModal}
          onCancel={() => setIncompatibleModal(false)}
          onOk={async () => {
            await bulkCreate(setDependencies, true);
          }}
        >
          <FormattedMessage
            id="iceworks.project.panel.dependency.main.incompatible.content"
            values={{ incompatibleDependencyText, projectDependencyText }}
          />
        </Modal>
        <Tab size="small" contentStyle={{ padding: '10px 0 0' }}>
          {
            [['dependencies', dataSource.dependencies], ['devDependencies', dataSource.devDependencies, true]].map(([key, deps, isDev]) => {
              return (
                <TabPane
                  title={
                    <div>
                      <strong>{key}</strong>
                      <span>({Object.keys(deps).length})</span>
                    </div>
                  }
                  key={key}
                >
                  <div className={styles.list}>
                    {
                      deps.map((dep, index) => (<DependencyItem
                        {...dep}
                        isDev={isDev}
                        onUpgrade={upgrade}
                        key={index}
                      />))
                    }
                  </div>
                </TabPane>
              );
            })
          }
        </Tab>
      </div>
    </Panel>
  );
};

export default DependencyPanel;
