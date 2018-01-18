/**
 * 返回云构建的 CDN 地址
 */
module.exports = function getPublicPath() {
  // def 云构建环境
  const isCloudBuild = process.env.BUILD_ENV === 'cloud';
  let publicPathCdn = null;
  const branchRegex = /^(?:[^\/]+)\/(\d+\.\d+\.\d+)$/;

  if (isCloudBuild && process.env.BUILD_GIT_BRANCH.match(branchRegex)) {
    publicPathCdn =
      [
        '//g.alicdn.com', // 不能判断环境正式发布代码是拷贝日常的代码发布
        process.env.BUILD_GIT_GROUP,
        process.env.BUILD_GIT_PROJECT,
        process.env.BUILD_GIT_BRANCH.replace(branchRegex, (str, $1) => $1),
      ].join('/') + '/';
  }

  return publicPathCdn;
};
