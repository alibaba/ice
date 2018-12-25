import { provide, inject } from 'midway';
import { IUserService, IUserProfile } from '../../interface';

@provide('userService')
export class UserService implements IUserService {
  @inject('userModel')
  model;

  async profile(): Promise<IUserProfile> {
    const data = await this.model.findUserProfile();
    return { data };
  }
}
