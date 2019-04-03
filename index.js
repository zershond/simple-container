const Koa = require('koa');
const Mount = require('koa-mount');
const Static = require('koa-static');
const Cors = require('kcors');
const Config = require('./config/config.js');
const ServiceRouter = require('./app/router.js');

const app = new Koa();

// 启用跨域
app.use(Cors());

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    console.log(`path: ${ctx.path}`);
    
});

// 挂载
Config.PathList.forEach(d => {
    console.log(d);
	app.use(Mount(d.name, Static(d.path)));
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(ServiceRouter.routes(), ServiceRouter.allowedMethods());

app.listen(Config.PORT);