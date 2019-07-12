import { IContext, IProject, IOSSModule, IOSSUploadParams, IUploadResult, IOSSGetBucketsParams, IOSSBucket } from '../../../../interface';
import * as AliOSS from 'ali-oss';
import * as pathExists from 'path-exists';
import * as path from 'path';
import * as dir from 'node-dir';

const DOMAIN = 'aliyuncs.com';

export default class OSS implements IOSSModule {
  public project: IProject;
  public storage: any;

  public readonly buildDir: string = 'build';

  constructor(params: {project: IProject; storage: any; }) {
    const { project, storage } = params;
    this.project = project;
    this.storage = storage;
  }

  async getBuckets(): Promise<IOSSBucket[]> {
    const oss = this.storage.get('oss');
    const params: IOSSGetBucketsParams = oss.find(({ project }) => project === this.project.path);
    const { region } = params;
    const aliOSS = new AliOSS({...params, endpoint: `${region}.${DOMAIN}`});

    const { buckets } = await aliOSS.listBuckets();
    return buckets;
  }

  async getConfig() {
    const oss = this.storage.get('oss');
    return oss.find(({ project }) => project === this.project.path) || {};
  }

  async setConfig(args) {
    const oss = this.storage.get('oss');

    let newConfig;
    const projectOSS = oss.find(({ project }) => project === this.project.path);
    if (projectOSS) {
      // Change the prototype chain
      newConfig = Object.assign(projectOSS, args, { project: this.project.path });
    } else {
      newConfig = {...args, project: this.project.path};
      oss.push({...args, project: this.project.path});
    }

    this.storage.set('oss', oss);

    return newConfig;
  }

  async upload(args, ctx: IContext): Promise<IUploadResult[]> {
    const { i18n } = ctx;
    const oss = this.storage.get('oss');
    const params: IOSSUploadParams = oss.find(({ project }) => project === this.project.path);

    const buildPath = path.join(this.project.path, this.buildDir);
    if (!await pathExists(buildPath)) {
      throw new Error(i18n.format('baseAdapter.oss.upload.dirEmptyError', {buildDir: this.buildDir}));
    }

    const files = await dir.promiseFiles(buildPath);
    if (!files.length) {
      throw new Error(i18n.format('baseAdapter.oss.upload.buildEmptyError'));
    }

    const { bucket, directory, region } = params;
    const aliOSS = new AliOSS({...params, endpoint: `${region}.${DOMAIN}`});
    await aliOSS.setBucket(bucket);

    return await Promise.all(files.map(async (file) => {
      const fileRelativePath = path.relative(buildPath, file);
      const storeFilepath = path.join(directory, fileRelativePath)
        .replace(/\\/g, '/')
        .replace(/^\//, '');

      let result: IUploadResult;
      try {
        const data = await aliOSS.put(storeFilepath, file);
        if (data && data.res && data.res.status === 200) {
          result = {
            success: true,
            url: data.url,
            path: fileRelativePath,
          };
        } else {
          result = {
            success: false,
            url: data.url,
            path: fileRelativePath,
          };
        }
      } catch (error) {
        result = {
          success: false,
          path: fileRelativePath,
          message: error.message,
        };
      }

      return result;
    }));
  }
}
