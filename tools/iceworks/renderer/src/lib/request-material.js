import request from 'request';
import services from '../services';

const { alilog, log } = services;

/**
 * 获取物料请求
 * uri：string 资源路径
 * options：object 参数
 * ignoreReject：boolean 是否忽略reject，总是返回值
 */
function requestMaterial(uri, options = {}, ignoreReject) {
  // 参数重置
  if (typeof options === 'boolean') {
    ignoreReject = options;
    options = {};
  }

  options = Object.assign({
    uri: uri.trim(),
    json: true,
    rejectUnauthorized: false, // 绕过 SSL 证书检测，主要是针对使用自签发证书的https资源无法访问的问题。
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 5000,
  }, options);

  return new Promise((resolve, reject) => {
    request(options,
      (err, res, body) => {
        const error = err || body.error;
        if (error) {
          log.error(`物料请求失败，地址: ${uri}，错误：${error}`);
          console.error(`物料请求失败，地址: ${uri}，错误：${error}`);
          if (ignoreReject) {
            resolve(null);
          } else {
            const type = getMaterialType(options);
            alilog.report({
              type: `request-${type}-material-error`,
              msg: error.message,
              stack: error.stack,
              data: {
                url: uri,
              },
            }, 'error');
            reject(error);
          }
        } else {
          resolve(body);
        }
      }
    );
  });
}

/**
 * 获取物料类型，区分官方物料和自定义物料两类
 * @param {Object} options
 * @return {string} official: 官网物料 custom：自定义物料
 */
function getMaterialType(options = {}) {
  const officialMaterial = options.uri.includes('ice.alicdn.com');
  if (officialMaterial) {
    return 'official';
  }
  return 'custom';
}


export default requestMaterial;
