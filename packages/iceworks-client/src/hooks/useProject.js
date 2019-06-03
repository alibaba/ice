import stores from '@stores';
import useModal from '@hooks/useModal';
import { useState } from 'react';
import { Message } from '@alifd/next';

function useProject({ panelStores } = {}) {
  const [projects, project, material] = stores.useStores(['projects', 'project', 'material']);
  const [deleteProjectPath, setDeleteProjectPath] = useState('');
  const [scaffold, setScaffold] = useState({});

  const {
    on: onCreateProjectModal,
    setModal: setCreateProjectModal,
  } = useModal();
  const {
    on: onOpenProjectModal,
    setModal: setOpenProjectModal,
  } = useModal();
  const {
    on: onDeleteProjectModal,
    setModal: setDeleteProjectModal,
  } = useModal();

  // function method
  async function refreshProject() {
    let newProject;
    try {
      newProject = await project.refresh();
    } catch (err) {
      // error handle
    }

    if (newProject && panelStores) {
      newProject.dataSource.panels.forEach((name) => {
        const panelStore = panelStores[name];
        if (panelStore) {
          panelStore.refresh();
        }
      });
    }
  }

  async function refreshProjects() {
    let error;
    let newProjects;
    try {
      newProjects = await projects.refresh();
    } catch (err) {
      error = err;
    }

    if (!newProjects.length) {
      await material.getRecommendScaffolds();
    }

    if (!error) {
      await refreshProject();
    }
  }

  async function addProject(path) {
    await projects.add(path);
    await refreshProjects();
    setOpenProjectModal(false);
  }

  async function deleteProject(params) {
    await projects.delete({ ...params, projectPath: deleteProjectPath });
    await refreshProjects();
    setDeleteProjectModal(false);
  }

  async function createProject(data) {
    await projects.create(data);
    await refreshProjects();
    setCreateProjectModal(false);
  }

  // event handle
  async function onSwitchProject(path) {
    await project.reset(path);
    await refreshProject();
  }

  async function onDeleteProject(path) {
    setDeleteProjectPath(path);
    setDeleteProjectModal(true);
  }

  async function onOpenProject() {
    setOpenProjectModal(true);
  }

  async function onCreateProject(values) {
    try {
      await createProject({ scaffold, ...values });
    } catch (error) {
      if (error.code === 'LEGAL_PROJECT') {
        await addProject(values.path);
      } else {
        Message.show({
          align: 'tr tr',
          type: 'error',
          title: '创建项目失败',
          content: error.message,
        });
      }
    }
  }

  const projectPreDelete =
    projects.dataSource.find(({ path }) => {
      return path === deleteProjectPath;
    }) || {};

  return {
    // state
    material,
    projects,
    project,
    projectPreDelete,

    // actions
    refreshProjects,
    createProject,
    addProject,
    deleteProject,

    // modal
    onCreateProjectModal,
    setCreateProjectModal: (value, scaffoldData) => {
      setScaffold(scaffoldData);
      setCreateProjectModal(value);
    },
    onOpenProjectModal,
    setOpenProjectModal,
    onDeleteProjectModal,
    setDeleteProjectModal,

    // event handles
    onCreateProject,
    onOpenProject,
    onDeleteProject,
    onSwitchProject,
  };
}

export default useProject;
