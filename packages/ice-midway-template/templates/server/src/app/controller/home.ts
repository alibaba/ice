import { controller, get, provide } from 'midway';

@provide()
@controller('/')
export class HomeController {
  @get('/')
  async index(ctx) {
    await ctx.render('index.ejs', {
      assets: ctx.assets,
    });
  }
}
