const Router = require('koa-router')();
const Config = require('../config/config.js');
const http = require('./http');

const processRequest = async (ctx, next) => {
    console.log('Mock api call');
    
    let _path = ctx.path;

    if(_path.indexOf('api') < 0){
        return null;
    }
    _path = ctx.path.split('api')[1];

    let serverController;
    let mockHttp = new http();
    
    let __body = ctx.request.body
    console.log(`body: ${JSON.stringify(__body)}`);
    console.log(`content-type: ${ctx.request.type}`);
    
    let options = {};
    if(__body && __body.service && __body.user) {
        options = {
            service: __body.service + __body.user
        };
    }else {
        options = {
            service: 'personal-info-Caleb'
        }
    }

    await mockHttp.getMockData(options).then((data) => {
        ctx.body = data;
    });
    console.log(JSON.stringify(ctx.body));
    
    ctx.set('Cache-Control', 'no-cache');
	ctx.set('Connection', 'close');
    await next();
}

Config.ServiceRouter.forEach(d => {
	let strRegex = `^\/${d.context}(?:\/|$)`;
	let urlRegex = new RegExp(strRegex);
	// service router resend
	Router.all(urlRegex, processRequest);
});

module.exports = Router;