/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  id: number;
}

export interface IUserData {
  name: string;
  department: string;
  avatar: string;
  userid: number;
}

/**
 * @description User-Service response
 */
export interface IUserResult {
  id: number;
  username: string;
  phone: string;
  email?: string;
}

export interface IUserModel {
  findUserProfile(): Promise<any>;
}

export interface IUserProfile {
  data: IUserData;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
  profile(): Promise<IUserProfile>;
}
