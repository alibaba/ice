import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SubMenu from '@components/SubMenu';
import { Button, Badge } from '@alifd/next';
import styles from './index.module.scss';
import Icon from '@components/Icon';

const ProjectSubMenu = ({
  projects, project, onSwitchProject, onDeleteProject, onCreateProject, onOpenProject,
}) => {
  return (
    <SubMenu title="iceworks.project.title">
      <div className={styles.wrapper}>
        <div className={styles.list}>
          {
            projects.map(({ name, path, task = {} }, index) => {
              return (
                <div
                  key={index}
                  className={
                    classNames({
                      [styles.item]: true,
                      [styles.itemCurrent]: path === project.path,
                    })
                  }
                  onClick={() => onSwitchProject(path)}
                >
                  <div className={styles.name}>
                    <strong>
                      {name}
                    </strong>
                    {task.status === 'working' ? <Badge className={styles.badge} dot /> : null}
                  </div>
                  <Icon
                    className={styles.icon}
                    type="trash"
                    size="xs"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteProject(path);
                    }}
                  />
                </div>
              );
            })
          }
        </div>
        <div className={styles.opts}>
          <Button className={styles.btn} type="secondary" size="medium" onClick={onOpenProject}>
            <Icon type="package" size="small" />
            <FormattedMessage id="iceworks.project.submenu.opts.openProject" />
          </Button>
          <Button className={styles.btn} type="primary" size="medium" onClick={onCreateProject}>
            <Icon type="plus" size="small" />
            <FormattedMessage id="iceworks.project.submenu.opts.createProject" />
          </Button>
        </div>
      </div>
    </SubMenu>
  );
};

ProjectSubMenu.propTypes = {
  projects: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  onSwitchProject: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onCreateProject: PropTypes.func.isRequired,
  onOpenProject: PropTypes.func.isRequired,
};

export default ProjectSubMenu;
