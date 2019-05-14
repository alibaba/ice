import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Icon, Button } from '@alifd/next';
import styles from './index.module.scss';

const SubMenu = ({
  projects, project, onSwitchProject, onDeleteProject,
}) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <FormattedMessage id="iceworks.project.title" />
      </h2>
      <div className={styles.list}>
        {
          projects.map(({ name, folderPath }, index) => {
            return (
              <div
                key={index}
                className={
                  classNames({
                    [styles.item]: true,
                    [styles.itemCurrent]: folderPath === project.folderPath,
                  })
                }
                onClick={() => onSwitchProject(folderPath)}
              >
                <div className={styles.name}>
                  <strong>
                    {name}
                  </strong>
                </div>
                <Icon
                  className={styles.icon}
                  type="ashbin"
                  size="xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteProject(folderPath);
                  }}
                />
              </div>
            );
          })
        }
      </div>
      <div className={styles.opts}>
        <Button className={styles.btn} type="secondary" size="medium">
          <Icon type="download" size="xl" />
          <span>打开项目</span>
        </Button>
        <Button className={styles.btn} type="primary" size="medium">
          <Icon type="add" size="xl" />
          <span>创建项目</span>
        </Button>
      </div>
    </div>
  );
};

SubMenu.defaultProps = {
};

SubMenu.propTypes = {
  projects: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  onSwitchProject: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
};

export default SubMenu;
