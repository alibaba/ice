import * as EventEmitter from 'events';
import { IProject, IOSSModule } from '../../../interface';
import * as AliOSS from 'ali-oss';
import * as pathExists from 'path-exists';
import * as path from 'path';
import * as dir from 'node-dir';

const DOMAIN = 'aliyuncs.com';

export default class OSS extends EventEmitter implements IOSSModule {
  public project: IProject;

  public readonly buildDir: string = 'build';

  constructor(project: IProject) {
    super();
    this.project = project;
  }

  async getBuckets(params: {region: string; accessKeyId: string; accessKeySecret: string;}) {
    const { region } = params;
    const aliOSS = new AliOSS({...params, endpoint: `${region}.${DOMAIN}`});
    
    const { buckets } = await aliOSS.listBuckets();
    return buckets;
  }

  async upload(params: {region: string; accessKeyId: string; accessKeySecret: string; bucket: string; directory: string;}) {
    const buildPath = path.join(this.project.path, this.buildDir)
    if (!await pathExists(buildPath)) {
      throw new Error(`构建目录 ${this.buildDir} 不存在`);
    }

    const files = await dir.promiseFiles(buildPath);
    if (!files.length) {
      throw new Error('当前构建结果为空，请先构建');
    }

    const { bucket, directory, region } = params;
    const aliOSS = new AliOSS({...params, endpoint: `${region}.${DOMAIN}`});
    await aliOSS.setBucket(bucket);

    return Promise.all(files.map(async (file) => {
      const fileRelativePath = path.relative(buildPath, file);
      const storeFilepath = path.join(directory, fileRelativePath)
        .replace(/\\/g, '/')
        .replace(/^\//, '');

      try {
        const data = await aliOSS.put(storeFilepath, file);
        if (data && data.res && data.res.status === 200) {
          return {
            success: true,
            url: data.url,
            path: fileRelativePath,
          };
        } else {
          return {
            success: false,
            url: data.url,
            path: fileRelativePath,
          };
        }
      } catch (error) {
        return {
          success: false,
          path: fileRelativePath,
        };
      }
    }));
  }
}
