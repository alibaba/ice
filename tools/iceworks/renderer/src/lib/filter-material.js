import services from '../services';
const { settings } = services;

export default function filterMaterial(materials) {
  const isAlibaba = settings.get('isAlibaba');
  // 是否为管理员？管理员可见所有物料
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return materials.filter((material) => {
    // 内部用户屏蔽内置的 vue 源
    if (isAdmin) {
      return true;
    }
    // 内网用户只透出 react 物料
    if (
      isAlibaba &&
      material.builtIn &&
      !['react', 'rax'].includes(material.type)
    ) {
      return false;
    }
    return true;
  });
}
