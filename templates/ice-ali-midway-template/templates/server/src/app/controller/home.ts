import { controller, get, provide } from '@ali/midway';

@provide()
@controller('/')
export class HomeController {

  @get('/')
  async index(ctx) {
		ctx.redirect('/index.html');
  }
}
