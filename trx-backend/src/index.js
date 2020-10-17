const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const Models = require('../db/models');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

// Should I use something like this for other common patterns?
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  // eslint-disable-next-line no-console
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

router.post('/users', async (ctx) => {
  const jsonRequest = ctx.request.body;

  // This may or may not be dangerous but if this is ever in prod
  // we should definetly make it safer to avoid injection
  const user = await Models.User.create({
    name: jsonRequest.name,
    email: jsonRequest.email,
    bio: jsonRequest.bio,
  });
  ctx.body = JSON.stringify(user);
});

router.put('/users', async (ctx) => {
  const jsonRequest = ctx.request.body;
  const newItem = {
    id: jsonRequest.id,
    name: jsonRequest.name,
    email: jsonRequest.email,
    bio: jsonRequest.bio,
  };
  const where = {
    id: jsonRequest.id,
  };
  // I couldn't figure findorcreate out, ended up
  // with the brute approach
  let user = await Models.User.findOne({ where });
  // This may or may not be dangerous but if this is ever in prod
  // we should definetly make it safer to avoid injection
  if (!user) {
    user = await Models.User.create(newItem);
  } else {
    await Models.User.update(newItem, { where });
    user = await Models.User.findOne({
      where,
    });
  }
  ctx.body = JSON.stringify(user);
});

router.get('/users/:id*', async (ctx) => {
  const { id } = ctx.params;
  let where = {};
  if (id) {
    where = {
      id,
    };
  }
  const response = await Models.User.findAll({ where });

  ctx.body = JSON.stringify(response);
});

router.delete('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const result = await Models.User.destroy({
    where: { id },
  });
  ctx.body = JSON.stringify({ deleted: Boolean(result) });
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
