const fs = require('fs');
const request = require('request');
const utils = require('./utils');

class http {
    constructor(service) {
        this.serviceName = service;
        this.error = () => {}
        this.success = () => {}
    }

    /**
	 * [porxy 代理请求]
	 * @param  {[type]} para [description]
	 * @return {[Promise]} promise [description]
	 */
	mockDataPorxy(para){
		let that = this;
		let promise = new Promise((resolve, reject) => {
			let _data = null;

			let options = {
                service: para.service,
                body: para.para,
                method : para.method
            };

            if(para.headers) {
                options.headers = {
                    'Content-Type' : para.contentType,
                    'Cookie' : para.cookie
                }
            }
            console.log(JSON.stringify(options).replace('\\n', ''));
            resolve(request(options));
		});

		return promise;
    }
    
    getMockData(options) {
        let fileName = options.service;
        return utils.getFile(`./data/${fileName}`);
    }
}

module.exports = http;