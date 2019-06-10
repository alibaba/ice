import stores from '@stores';
import useModal from '@hooks/useModal';
import { Message } from '@alifd/next';

function useMaterial(visible = false) {
  const [materialStore] = stores.useStores(['material']);
  const {
    on: onOpenMaterialModal,
    setModal: setMaterialModal,
    loading,
    setLoading,
  } = useModal(visible);

  async function addMaterial({ url }, error) {
    if (loading) return;
    if (error && error.url) return;

    setLoading(true);
    try {
      await materialStore.addMaterial(url);
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
