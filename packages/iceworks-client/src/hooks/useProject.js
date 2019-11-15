import { useState } from 'react';
import useModal from '@hooks/useModal';
import showMessage from '@utils/showMessage';
import logger from '@utils/logger';
import goldlog from '@utils/goldlog';
import stores from '@stores';

function useProject({ panelStores } = {}) {
  const [projectsStore, projectStore, materialStore] = stores.useStores(['projects', 'project', 'material']);
  const [deleteProjectPath, setDeleteProjectPath] = useState('');
  const [scaffold, setScaffold] = useState({});

  const { currentMaterial } = materialStore.dataSource;

  const {
    on: onCreateProjectModal,
    setModal: setCreateProjectModal,
    loading: createProjectLoading,
    setLoading: setCreateProjectLoading,
  } = useModal();
  const {
    on: onOpenProjectModal,
    setModal: setOpenProjectModal,
    loading: openProjectLoading,
    setLoading: setOpenProjectLoading,
  } = useModal();
  const {
    on: onDeleteProjectModal,
    setModal: setDeleteProjectModal,
  } = useModal();

  // function method
  function refreshProjectStore(name) {
    const panelStore = panelStores[name];
    if (panelStore && panelStore.refresh) {
      panelStore
        .refresh()
        .catch((error) => {
          logger.error('refresh project got error: ', error);
        });
    }
  }

  async function refreshProject() {
    let error;
    try {
      await projectStore.refresh();
    } catch (err) {
      error = err;
    }

    if (!error && panelStores) {
      projectStore.dataSource.panels.forEach(({ name, isAvailable }) => {
        if (isAvailable) {
          refreshProjectStore(name);
        }
      });
    }
  }

  async function refreshProjects() {
    let error;
    try {
      await projectsStore.refresh();
    } catch (err) {
      error = err;
    }

    if (error || !projectsStore.dataSource.length) {
      await materialStore.getRecommendScaffolds();
    } else {
      await refreshProject();
    }
  }

  async function onAddProject(path) {
    setOpenProjectLoading(true);

    try {
      await addProject(path);
      setOpenProjectModal(false);
    } catch (err) {
      showMessage(err);
    }

    setOpenProjectLoading(false);
  }

  async function addProject(path) {
    await projectsStore.add(path);
    await refreshProjects();
    goldlog({
      namespace: 'home',
      module: 'project',
      action: 'add-project',
    });
  }

  async function deleteProject(params) {
    await projectsStore.delete({ ...params, projectPath: deleteProjectPath });
    await refreshProjects();
    setDeleteProjectModal(false);
  }

  async function createProject(data) {
    goldlog({
      namespace: 'home',
      module: 'project',
      action: 'create-project',
      data: {
        materialIsOfficial: currentMaterial.official,
        scaffoldSourceNpm: scaffold.source.npm,
      },
    });

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
    setCreateProjectLoading(true);
    try {
      await createProject({ scaffold, ...values });
    } catch (error) {
      if (error.code === 'LEGAL_PROJECT') {
        await addProject(values.path);
      } else {
        showMessage('创建项目失败');
      }
    }
    setCreateProjectLoading(false);
  }

  async function onChangeProjectPanel(name, isAvailable) {
    await projectStore.setPanel({ name, isAvailable });
    if (isAvailable) {
      refreshProjectStore(name);
    }
  }

  async function reloadAdapter() {
    await projectStore.reloadAdapter();
  }

  const projectPreDelete =
    projectsStore.dataSource.find(({ path }) => {
      return path === deleteProjectPath;
    }) || {};

  return {
    // loading
    createProjectLoading,

    // state
    material: materialStore.dataSource,
    projects: projectsStore.dataSource,
    project: projectStore.dataSource,
    scaffold,
    projectPreDelete,

    // method
    refreshProjectStore,
    refreshProjects,
    refreshProject,
    createProject,
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
    openProjectLoading,
    setOpenProjectLoading,
    onDeleteProjectModal,
    setDeleteProjectModal,

    // event handles
    onAddProject,
    onCreateProject,
    onOpenProject,
    onDeleteProject,
    onSwitchProject,
    onChangeProjectPanel,
    reloadAdapter,
  };
}

export default useProject;
