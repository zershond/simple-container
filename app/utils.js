const fs = require('fs');

module.exports = {
    getFile: (path) => {
        let __path = path + '.json'
        
        return new Promise((resolve, reject) => {
            let _data = null;
            fs.readFile(__path, 'UTF-8', (error, data) => {
                if(error) {
                    console.log(`Read File in ${path} failed`);
                    reject(error);
                }
                resolve(data);
            })
        });
    }
}
