import { IBaseModule } from './base';

export interface IGetBucketsParams {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
}

export interface IGetBucketsResult {
  name: string;
}

export interface IUploadParams {
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
  getBuckets(params: IGetBucketsParams): Promise<IGetBucketsResult[]>;
  upload(params: IUploadParams): Promise<IUploadResult[]>;
}
