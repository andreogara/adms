var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../' ),
	mongo = require('mongodb'),
	server = mongo.Server;
module.exports = {
	development: {
		rootPath: rootPath,
		db : 'mongodb://daemonbits:Swordfish09011@ds041841.mongolab.com:41841/test_db',
		port : 4141
	},
	production: {
		rootPath : rootPath,
		db: 'mongodb://daemonbits:Swordfish09011@ds041841.mongolab.com:41841/test_db',
		port:  process.env.port || 80
	}
}