import { provide } from 'midway';
import { IUserModel, IUserData } from '../../interface';

@provide('userModel')
export class UserModel implements IUserModel {
  async findUserProfile(): Promise<IUserData> {
    // Similar: return await query('select * from user where uid = ?', uid);
    return {
      name: '淘小宝',
      department: '技术部',
      avatar:
        'https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png',
      userid: 10001,
    };
  }
}
