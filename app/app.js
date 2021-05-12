const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const https = require('https');
const http = require('http');

const articles = require('./controllers/articles');
const summary = require('./controllers/summary');
const categories = require('./controllers/categories');
const users = require('./controllers/users');
const weeks = require('./controllers/weeks');
const dingding = require('./controllers/dingding');

const httpsOptions = require('./config/httpsConfig');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

/**
 * 收藏文章
 */
router.post('/api/post', async (ctx) => {
  const { body } = ctx.request;
  await articles.post(body).then(() => {
    ctx.body = {
      message: '保存成功',
      code: 1,
    };
  }).catch((err) => {
    ctx.app.emit('error', err, ctx);
  });
});

/**
 * 获取文章列表数据
 */
router.get('/api/list', async (ctx) => {
  const params = ctx.request.query;
  const res = await articles.list(params);
  ctx.body = res;
});

/**
 * 获取所有的文章分类
 */
router.get('/api/categories/list', async (ctx) => {
  const params = ctx.request.query;
  const res = await categories.list(params);
  ctx.body = res;
});

/**
 * 按分类获取所有的文章分类
 */
router.get('/api/categories/orderedList', async (ctx) => {
  const params = ctx.request.query;
  const res = await categories.orderedList(params);
  ctx.body = res;
});

/**
 * 根据类别查找文章
 */
router.get('/api/articles/category', async (ctx) => {
  const params = ctx.request.query;
  const res = await articles.categories(params);
  ctx.body = res;
});

/**
 * 获取周刊数目数据
 */
router.get('/api/weeks/list', async (ctx) => {
  const params = ctx.request.query;
  const res = await weeks.list(params);
  ctx.body = res;
});

/**
 * 获取本周文章
 */
router.get('/api/lastest/list', async (ctx) => {
  const params = ctx.request.query;
  const res = {
    data: [],
    total: 0,
  };
  res.data = await articles.listThisWeek(params);
  const tmp = await articles.queryTimes();
  if (tmp) {
    res.total = JSON.parse(JSON.stringify(tmp)).length === 0
      ? 0
      : JSON.parse(JSON.stringify(tmp))[0].times;
  } else {
    res.total = 0;
  }
  ctx.body = res;
});

/**
 * 一键推送本周最新3篇小报文章给钉钉,可以多次推送
 */
router.post('/api/push/robot', async (ctx) => {
  const params = ctx.request.query;
  const data = await articles.listLastest(params);
  let res = null;
  if (data && data.length > 0) {
    res = await dingding.pushToRobot({
      data: JSON.parse(JSON.stringify(data)),
    });
  }
  ctx.body = res;
});

/**
 * 查看统计数据
 */
router.get('/api/summary/overview', async (ctx) => {
  const res = await summary.overview();
  ctx.body = res;
});

/**
 * 获取用户列表
 */
router.get('/api/users', async (ctx) => {
  const res = await users.list();
  ctx.body = res;
});

app.use(router.routes());
app.on('error', (err, ctx) => {
  ctx.body = {
    message: '保存失败',
    code: 0,
    err,
  };
});
httpsOptions.enable
  ? https.createServer(httpsOptions.httpsCert, app.callback()).listen(3030)
  : http.createServer({}, app.callback()).listen(3030);
