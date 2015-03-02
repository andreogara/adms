module.exports = function(app, db){
		app.get("/", function (req, res){
		res.render('index');
	});

	app.get('/partials/:name', function(req, res) {
		var name = req.params.name;
		res.render('partials/' + name);
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

