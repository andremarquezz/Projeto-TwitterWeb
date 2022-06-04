import Koa from 'koa';
import { router } from './routes';

export const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx) => {
  ctx.body = 'Hello World!';
});
