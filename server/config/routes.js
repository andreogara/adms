module.exports = function(app, db){
		app.get("/", function (req, res){
		res.render('index');
	});

	app.get('/partials/*', function(req, res) {
			res.render('partials/' + req.params[0]);
	});
	
	app.get("/data", function (req, res){
		db.artists.find({}, function(err, record){
			res.json(record);
		});	
		
	});
	
	app.get("*", function (req, res){
		res.render('index');
	});
	
}

