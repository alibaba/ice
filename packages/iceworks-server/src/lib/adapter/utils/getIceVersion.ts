/**
 * @icedesign/base: 0.x
 * @alifd/next: 1.x
 * none: 1.x
 */
export default function getIceVersion(packageJSON): string {
  const dependencies = packageJSON.dependencies || {};
  const hasIceDesignBase = dependencies['@icedesign/base'];
  return hasIceDesignBase ? '0.x' : '1.x';
}
