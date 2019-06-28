import React from 'react';
import { Tab } from '@alifd/next';
import Icon from '@components/Icon';
import PropTypes from 'prop-types';
import Modal from '@components/Modal';
import { FormattedMessage, injectIntl } from 'react-intl';
import useDependency, { STATUS_RESETING } from '@hooks/useDependency';
import CreateDependencyModal from './CreateDependencyModal';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
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
              <Icon type="package" size="small" title="升级依赖" className={styles.download} onClick={() => onUpgrade(packageName, isDev)} />
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

const DependencyPanel = ({ intl, title, description }) => {
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
        <PanelHead
          title={title}
          description={description}
          operations={[
            {
              icon: {
                type: 'reload',
                onClick: refresh,
              },
              tip: intl.formatMessage({ id: 'iceworks.project.panel.dependency.main.refresh' }),
            },
            {
              icon: {
                type: 'package',
                onClick: onReset,
                className: { [styles.iconReseting]: dataSource.status === STATUS_RESETING },
              },
              tip: intl.formatMessage({ id: 'iceworks.project.panel.dependency.main.download' }),
            },
            {
              icon: {
                type: 'plus',
                onClick: onCreate,
                className: { [styles.iconReseting]: dataSource.status === STATUS_RESETING },
              },
              tip: intl.formatMessage({ id: 'iceworks.project.panel.dependency.main.add' }),
            },
          ]}
        />
      }
    >
      <div className={styles.main}>
        <CreateDependencyModal
          on={onCreateModal}
          onCancel={() => setCreateModal(false)}
          onOk={bulkCreate}
        />
        <Modal
          title={intl.formatMessage({ id: 'iceworks.project.panel.dependency.main.reset.title' })}
          visible={onResetModal}
          onCancel={() => setResetModal(false)}
          onOk={reset}
        >
          <FormattedMessage id="iceworks.project.panel.dependency.main.reset.content" />
        </Modal>
        <Modal
          title={intl.formatMessage({ id: 'iceworks.project.panel.dependency.main.incompatible.title' })}
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

DependencyPanel.propTypes = {
  intl: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default injectIntl(DependencyPanel);
