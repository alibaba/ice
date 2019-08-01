import { IBaseModule, IContext } from './base';

export interface IOSSGetBucketsParams {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
}

export interface IOSSBucket {
  name: string;
}

export interface IOSSUploadParams {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  directory: string;
}

export interface IUploadResult {
  success: boolean;
  path: string;
  message?: string;
  url?: string;
}

export interface IOSSModule extends IBaseModule {
  getBuckets(params: IOSSGetBucketsParams): Promise<IOSSBucket[]>;
  upload(params: IOSSUploadParams, ctx: IContext): Promise<IUploadResult[]>;
}
