import { controller, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @get('/')
  async index(ctx) {
    ctx.body = `Welcome to midwayjs!`;
  }
}
