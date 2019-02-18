import { controller, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {

  @get('/')
  index (ctx) {
    ctx.redirect('/index.html');
  }
}
