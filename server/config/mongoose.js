var mongojs = require('mongojs');
module.exports = function (config){
	/* mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error ... '));
	db.once('open', function callback(){
		console.log('MongoDB Opened db Opened');
	}); */
	var uri = config.db,
		  db = mongojs.connect(uri, ["artists"]);
		  db.on('error',function(err) {
			console.log('database error', err);
		   });
			db.on('ready',function() {
			console.log('database connected');
			});
		return db;	
}
