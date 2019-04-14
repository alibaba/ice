import { controller, get, inject, provide } from 'midway';
import { IUserService, IUserResult } from '../../interface';

@provide()
@controller('/user')
export class UserController {
  @inject('userService')
  service: IUserService;

  @get('/:id')
  async getUser(ctx): Promise<void> {
    const id: number = ctx.params.id;
    const user: IUserResult = await this.service.getUser({id});
    ctx.body = {success: true, message: 'OK', data: user};
  }
}
