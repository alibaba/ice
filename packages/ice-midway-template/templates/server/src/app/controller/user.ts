import { controller, get, post, inject, provide } from 'midway';
import { IUserService } from '../../interface';

@provide()
@controller('/user')
export class UserController {
  @inject('userService')
  service: IUserService;

  /**
   * GET /user/profile
   */
  @get('/profile')
  async profile(ctx) {
    const res = await this.service.profile();
    ctx.body = res.data;
  }

  /**
   * POST /user/login
   */
  @post('/login')
  async login(ctx) {
    const { username, password } = ctx.query;

    if (username === 'admin' && password === 'admin') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
        currentAuthority: 'admin',
      };
    } else if (username === 'user' && password === 'user') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
        currentAuthority: 'user',
      };
    } else {
      ctx.body = {
        status: 401,
        statusText: 'unauthorized',
        currentAuthority: 'guest',
      };
    }
  }

  /**
   * POST /user/register
   */
  @post('/register')
  async register(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'user',
    };
  }

  /**
   * POST /user/logout
   */
  @post('/logout')
  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}
