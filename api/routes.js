import Router from '@koa/router';

export const router = new Router();

const tweets = [];

router.get('/tweets', (ctx) => {
  ctx.body = ctx.query.username
    ? tweets.filter((tweet) => tweet.username === ctx.query.username)
    : tweets;
});

router.post('/tweets', (ctx) => {
  const tweet = {
    ...ctx.request.body,
    id: tweets.length + 1,
  };

  tweets.push(tweet);
  ctx.body = tweet;
});
