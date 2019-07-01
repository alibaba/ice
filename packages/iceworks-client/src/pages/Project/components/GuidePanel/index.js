/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@components/Icon';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import stores from '@stores';
import Panel from '../Panel';
import styles from './index.module.scss';

const GuidePanel = ({ history, intl }) => {
  const [settingPanelStore] = stores.useStores(['settingPanel']);

  const FEATURES = [
    {
      icon: 'projects',
      path: '/project',
      title: intl.formatMessage({ id: 'iceworks.project.panel.guide.project' }),
      description: intl.formatMessage({ id: 'iceworks.project.panel.guide.project.desc' }),
    },
    {
      icon: 'zujian',
      path: '/task/dev',
      title: intl.formatMessage({ id: 'iceworks.project.panel.guide.engineering' }),
      description: intl.formatMessage({ id: 'iceworks.project.panel.guide.engineering.desc' }),
    },
    {
      icon: 'template',
      path: '/material',
      title: intl.formatMessage({ id: 'iceworks.project.panel.guide.material' }),
      description: intl.formatMessage({ id: 'iceworks.project.panel.guide.material.desc' }),
    },
  ];

  function handleClick(path) {
    if (path === '/project') {
      settingPanelStore.toggle();
      return;
    }

    history.push(path);
  }

  return (
    <Panel>
      <div className={styles.guidePanel}>
        <div className={styles.head}>
          <h3 className={styles.title}>入门指引</h3>
        </div>
        <div className={styles.features}>
          {
            FEATURES.map((feature, index) => {
              return (
                <div className={styles.feature} key={index}>
                  <Icon type={feature.icon} className={styles.icon} size="small" />
                  <h6
                    className={styles.title}
                    onClick={() => handleClick(feature.path)}
                  >
                    {feature.title}
                  </h6>
                  <span>：</span>
                  <p className={styles.description}>{feature.description}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </Panel>
  );
};

GuidePanel.propTypes = {
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default injectIntl(withRouter(GuidePanel));
