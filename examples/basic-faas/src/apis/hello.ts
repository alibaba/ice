import {
  Provide,
  Inject,
  Query,
  Controller,
  Get
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/faas';

@Provide()
@Controller('/')
export class HelloHTTPService {
  @Inject()
  ctx: Context;

  @Get('/hello')
  async handleHTTPEvent(@Query() name = 'midwayjs') {
    return `Hello  ${name}`;
  }
}
