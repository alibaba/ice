import { provide, inject } from '@ali/midway';
import { IUserProfile, IUserService } from '../interface';

@provide('userService')
export class UserService implements IUserService {
  @inject('userModel')
  model;

  async profile(): Promise<IUserProfile> {
    const data = await this.model.findUserProfile();
    return { data };
  }
}
