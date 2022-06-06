import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import ramda from 'ramda';
// import jwt from 'jsonwebtoken';

export const router = new Router();

const prisma = new PrismaClient();

router.get('/tweets', async (ctx) => {
  const tweets = await prisma.tweet.findMany();
  ctx.body = tweets;
});

router.post('/tweets', async (ctx) => {
  const tweet = await prisma.tweet.create({
    data: {
      userId: 'cl404x10m0009ly9bbp6v12f1',
      text: ctx.request.body.text,
    },
  });

  ctx.body = tweet;
});

router.post('/signup', async (ctx) => {
  const saltRounds = 10;
  const password = bcrypt.hashSync(ctx.request.body.password, saltRounds);
  const user = await prisma.user.create({
    data: {
      name: ctx.request.body.name,
      username: ctx.request.body.username,
      email: ctx.request.body.email,
      password,
    },
  });

  ctx.body = omit(['password'], user);
  
});
