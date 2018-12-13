#!/usr/bin/env bash
# build.sh <envType>
# node-scripts 自动生成，请勿修改，并保证上传到 gitlab 上

set -e

BASE_DIR=${PWD}
echo "------------- build.sh start, pwd: ${PWD}, schema: ${SCHEMA_NAME}, envType: ${ENV_TYPE}, appname: ${APP_NAME}, baseDir: ${BASE_DIR} at $(date +%Y/%m/%d\ %H:%M:%S) ------------"

safe_remove_dir() {
  # safe_remove 命令不存在就使用 rm -rf 代替
  # safe_remove 只在 aone 环境存在
  if command -v safe_remove >/dev/null 2>&1; then
    safe_remove $@
  else
    rm -rf $@
  fi
}

if [ -d ./node_modules ]; then
  echo "[node-scripts] remove exist node_modules directory!"
  safe_remove_dir ./node_modules
fi

# 打印打包服务器的操作系统版本
cat /proc/version
ls -al /etc/*-release
cat /etc/*-release
uname -a

# 在没有将全部 5u 服务器替换到 7u 之前，只能默认使用 node 4
if hash nvm 2>/dev/null; then
  nvm install 4
fi

# 会被 postinstall.js 自动判断替换
TNPM_VERSION='latest'
# 依赖安装模式
INSTALL_DEPS_MODE='';

NPM_TMP_GLOBAL_DIR=${BASE_DIR}/.npm_global
safe_remove_dir ${NPM_TMP_GLOBAL_DIR}

export PATH=${BASE_DIR}/node_modules/.bin:${NPM_TMP_GLOBAL_DIR}/bin:${BASE_DIR}/.node/bin:${BASE_DIR}/.bin:/usr/local/gcc-5.2.0/bin:$PATH

# 安装到 ${BASE_DIR}/.npm_global 目录，避免覆盖 docker 镜像里面的文件，会出现 EINVAL: invalid argument, rmdir '/usr/local/lib/node_modules/tnpm/bin' 错误
npm i --prefix=${NPM_TMP_GLOBAL_DIR} -g npminstall --registry=http://registry.npm.alibaba-inc.com
npminstall --prefix=${NPM_TMP_GLOBAL_DIR} -g tnpm@${TNPM_VERSION} --registry=http://registry.npm.alibaba-inc.com

which tnpm
tnpm -v

# http://gitlab.alibaba-inc.com/node/precompile-check/tree/master 不允许直接依赖的模块检查
mkdir precompile-check-tmp
cp package.json precompile-check-tmp
cd precompile-check-tmp
tnpm i @ali/precompile-check
node node_modules/@ali/precompile-check/index.js
cd ..

safe_remove_dir precompile-check-tmp

time tnpm i --internal-oss-cache --deps-tree ${INSTALL_DEPS_MODE} --aone_app_pwd=${BASE_DIR} --aone_env_type=${ENV_TYPE} --aone_app_name=${APP_NAME} --aone_schema=${SCHEMA_NAME} || exit $?

# 执行 tnpm run build 来进行应用自定义的构建
echo "[node-scripts] start custom build: tnpm run build... at $(date +%Y/%m/%d\ %H:%M:%S) "
BUILD_ERROR=0
BUILD_OUTPUT=`tnpm run build 2>&1` || BUILD_ERROR=1
if [[ $BUILD_ERROR -eq 1 ]]
  then
  if [[ $BUILD_OUTPUT != *"missing script: build"* ]]
    then
    echo "$BUILD_OUTPUT"
    echo "[node-scripts] custom build error! please check your npm build script! at $(date +%Y/%m/%d\ %H:%M:%S) "
    exit 1
  else
    echo "[node-scripts] npm build script not exist, skip custom build. at $(date +%Y/%m/%d\ %H:%M:%S) "
  fi
else
  echo "$BUILD_OUTPUT"
  echo "[node-scripts] custom build success!"
fi

# 尝试执行 tnpm run autoproxy 自动生成 proxy 代码
echo "[node-scripts] try tnpm run autoproxy... at $(date +%Y/%m/%d\ %H:%M:%S) "
AUTOPROXY_ERROR=0
AUTOPROXY_OUTPUT=`tnpm run autoproxy 2>&1` || AUTOPROXY_ERROR=1
if [[ ${AUTOPROXY_ERROR} -eq 1 ]]
  then
  if [[ ${AUTOPROXY_OUTPUT} != *"missing script: autoproxy"* ]]
    then
    echo "${AUTOPROXY_OUTPUT}"
    echo "[node-scripts] autoproxy error! please check your npm autoproxy script! at $(date +%Y/%m/%d\ %H:%M:%S) "
    exit 1
  else
    echo "[node-scripts] npm autoproxy script not exist, skip. at $(date +%Y/%m/%d\ %H:%M:%S) "
  fi
else
  echo "${AUTOPROXY_OUTPUT}"
  echo "[node-scripts] autoproxy success!"
fi


echo "[node-scripts] build success! at $(date +%Y/%m/%d\ %H:%M:%S) "

# 删除安装的devDeps依赖, 重新安装线上依赖
if [ -z ${INSTALL_DEPS_MODE} ]
  then
  safe_remove_dir node_modules
  # 安装线上依赖
  time tnpm i --internal-oss-cache --deps-tree --production --aone_app_pwd=${BASE_DIR} --aone_env_type=${ENV_TYPE} --aone_app_name=${APP_NAME} --aone_schema=${SCHEMA_NAME} || exit $?
fi

# http://gitlab.alibaba-inc.com/node/sigma/issues/26488 解决 CPU Share 化后 egg 自动获取到的核心数太多的问题
tnpm i @ali/sigma --production --internal-oss-cache

echo "[node-scripts] reporting package.json to npm.alibaba-inc.com ... at $(date +%Y/%m/%d\ %H:%M:%S) "
tnpm i @ali/node-app-reporter@1 --internal-oss-cache
# $ node-app-reporter [baseDir] [appname] [buildId] [buildAuthor]
node-app-reporter ${BASE_DIR} ${APP_NAME} ${ENV_TYPE}

# 删除临时的 ${NPM_TMP_GLOBAL_DIR} 目录
safe_remove_dir ${NPM_TMP_GLOBAL_DIR}
echo "[node-scripts] report success! at $(date +%Y/%m/%d\ %H:%M:%S) "
