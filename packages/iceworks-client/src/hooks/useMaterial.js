import useModal from '@hooks/useModal';
import { useState } from 'react';
import { Message } from '@alifd/next';

function useMaterial(visible = false, materialStore) {
  const {
    on: onOpenMaterialModal,
    setModal: setMaterialModal,
    loading: addMaterialLoading,
    setLoading: setAddMaterialLoading,
  } = useModal(visible);

  const {
    on: onDeleteMaterialModal,
    setModal: setDeleteMaterialModal,
    loading: deleteMaterialLoading,
    setLoading: setDeleteMaterialLoading,
  } = useModal(visible);

  const {
    on: onInstallModal,
    setModal: setInstallModal,
  } = useModal(visible);

  const [deleteMaterialSource, setDeleteMaterialSource] = useState('');

  async function addMaterial(url, name) {
    if (addMaterialLoading) return;

    setAddMaterialLoading(true);
    try {
      await materialStore.addMaterial(url, name);
      setMaterialModal(false);
    } catch (err) {
      Message.show({
        align: 'tr tr',
        type: 'error',
        title: '添加物料失败',
        content: err.message,
      });
    }
    setAddMaterialLoading(false);
  }

  async function deleteMaterial(source) {
    if (deleteMaterialLoading) return;

    setDeleteMaterialLoading(true);
    try {
      await materialStore.deleteMaterial(source);
      setDeleteMaterialModal(false);
    } catch (err) {
      Message.show({
        align: 'tr tr',
        type: 'error',
        title: '删除物料失败',
        content: err.message,
      });
    }
    setDeleteMaterialLoading(false);
  }

  function openDeleteMaterialModal(source) {
    setDeleteMaterialModal(true);
    setDeleteMaterialSource(source);
  }

  return {
    addMaterialLoading,
    onOpenMaterialModal,
    setMaterialModal,
    addMaterial,
    onDeleteMaterialModal,
    setDeleteMaterialModal,
    deleteMaterialLoading,
    setDeleteMaterialLoading,
    deleteMaterialSource,
    openDeleteMaterialModal,
    deleteMaterial,
    onInstallModal,
    setInstallModal,
  };
}

export default useMaterial;
