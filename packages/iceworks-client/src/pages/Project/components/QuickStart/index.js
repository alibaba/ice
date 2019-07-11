import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import ScaffoldCard from '@components/ScaffoldCard';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const QuickStart = ({
  onOpenProject,
  onCreateProject,
  scaffolds,
  createProject,
}) => {
  return (
    <div className={styles.quickStart}>
      {
        scaffolds.length ?
          <div className={styles.scaffolds}>
            {
              scaffolds.map((scaffold, index) => {
                return (
                  <div className={styles.item} key={index}>
                    <ScaffoldCard dataSource={scaffold} onDownload={createProject} />
                  </div>
                );
              })
            }
          </div> : null
      }
      <div className={styles.text}>
        <FormattedMessage id="iceworks.quickStart.title" />
      </div>
      <div className={styles.opts}>
        <Button className={styles.btn} type="secondary" size="large" onClick={onOpenProject}>
          <Icon type="package" size="small" />
          <FormattedMessage id="iceworks.quickStart.open" />
        </Button>
        <Button className={styles.btn} type="primary" size="large" onClick={onCreateProject}>
          <Icon type="plus" size="small" />
          <FormattedMessage id="iceworks.quickStart.more" />
        </Button>
      </div>
    </div>
  );
};

QuickStart.propTypes = {
  onCreateProject: PropTypes.func.isRequired,
  onOpenProject: PropTypes.func.isRequired,
  scaffolds: PropTypes.array.isRequired,
  createProject: PropTypes.func.isRequired,
};

export default QuickStart;
