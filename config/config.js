const config = {
    ENV: 'Local',
    PORT: 80,
	Service: 'http://localhost:9527',
	ServiceRouter: [{
		context: 'mock-api'
	}],
	PathList: [
		{
			name : '/index', 
			path : './page'
		},
		{
			name: '/static',
			path: './page/static'
		}
	]
}

module.exports = config;