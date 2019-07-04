import stores from '@stores';
import useModal from '@hooks/useModal';
import { useState } from 'react';
import { Message } from '@alifd/next';
import logger from '@utils/logger';

function useProject({ panelStores } = {}) {
  const [projectsStore, projectStore, materialStore] = stores.useStores(['projects', 'project', 'material']);
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
  function refreshProjectStore(name) {
    const panelStore = panelStores[name];
    if (panelStore) {
      panelStore
        .refresh()
        .catch((error) => {
          logger.error(error);
        });
    }
  }

  async function refreshProject() {
    let newProject;
    try {
      newProject = await projectStore.refresh();
    } catch (err) {
      // error handle
    }

    if (newProject && panelStores) {
      newProject.dataSource.panels.forEach(({ name, isAvailable }) => {
        if (isAvailable) {
          refreshProjectStore(name);
        }
      });
    }
  }

  async function refreshProjects() {
    let error;
    let newProjects;
    try {
      newProjects = await projectsStore.refresh();
    } catch (err) {
      error = err;
    }

    if (!newProjects || !newProjects.dataSource.length) {
      await materialStore.getRecommendScaffolds();
    }

    if (!error) {
      await refreshProject();
    }
  }

  async function addProject(path) {
    await projectsStore.add(path);
    await refreshProjects();
    setOpenProjectModal(false);
  }

  async function deleteProject(params) {
    await projectsStore.delete({ ...params, projectPath: deleteProjectPath });
    await refreshProjects();
    setDeleteProjectModal(false);
  }

  async function createProject(data) {
    await projectsStore.create(data);
    await refreshProjects();
    setCreateProjectModal(false);
  }

  async function sortProjectPanel({ oldIndex, newIndex }) {
    await projectStore.sortPanels({ oldIndex, newIndex });
  }

  // event handle
  async function onSwitchProject(path) {
    await projectStore.reset(path);
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
        throw error;
      }
    }
  }

  async function onChangeProjectPanel(name, isAvailable) {
    await projectStore.setPanel({ name, isAvailable });
    if (isAvailable) {
      refreshProjectStore(name);
    }
  }

  const projectPreDelete =
    projectsStore.dataSource.find(({ path }) => {
      return path === deleteProjectPath;
    }) || {};

  return {

    // state
    material: materialStore.dataSource,
    projects: projectsStore.dataSource,
    project: projectStore.dataSource,
    projectPreDelete,

    // method
    refreshProjectStore,
    refreshProjects,
    refreshProject,
    createProject,
    addProject,
    deleteProject,
    sortProjectPanel,

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
    onChangeProjectPanel,
  };
}

export default useProject;
