import { controller, get, provide } from 'midway-mirror';

@provide()
@controller('/')
export class HomeController {

  @get('*')
  public async render(ctx) {
    await ctx.render('index.html');
    await ctx.render('index.html', ctx.clientConfig);
  }
}
