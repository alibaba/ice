import useModal from '@hooks/useModal';
import { Message } from '@alifd/next';

function useMaterial(visible = false, onAddMaterial) {
  const {
    on: onOpenMaterialModal,
    setModal: setMaterialModal,
    loading,
    setLoading,
  } = useModal(visible);

  async function addMaterial(url, name) {
    if (loading) return;

    setLoading(true);
    try {
      await onAddMaterial(url, name);
      setMaterialModal(false);
    } catch (err) {
      Message.show({
        align: 'tr tr',
        type: 'error',
        title: '添加物料失败',
        content: err.message,
      });
    }
    setLoading(false);
  }

  return {
    addMaterialLoading: loading,
    onOpenMaterialModal,
    setMaterialModal,
    addMaterial,
  };
}

export default useMaterial;
