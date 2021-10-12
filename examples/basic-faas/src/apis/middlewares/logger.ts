import { Context } from '@midwayjs/faas';
import { useContext } from '@midwayjs/hooks';

const logger = async (next: any) => {
  const ctx = useContext<Context>();
  console.log(`<-- [${ctx.method}] ${ctx.url}`);

  const start = Date.now();
  await next();
  const cost = Date.now() - start;

  console.log(`[${ctx.method}] ${ctx.url} ${cost}ms`);
};

export default logger;
