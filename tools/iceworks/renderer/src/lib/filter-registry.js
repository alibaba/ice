import services from '../services';
const { settings } = services;

export default function filterMaterial(registries) {
  const isAlibaba = settings.get('isAlibaba');
  // 是否为管理员
  const isAdmin = localStorage.getItem('isAdmin') == 'true';
  return registries.filter((registry) => {
    // 非内网用户屏蔽内置的 tnpm 源
    if (!isAdmin && !isAlibaba && registry.name == 'tnpm') {
      return false;
    }
    return true;
  });
}
