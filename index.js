var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");
var Hashids = require("hashids");
	hashids = new Hashids("this is my salt");
	number = hashids.encode(12345);

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function( req, res ){
	res.render("index");
});

app.post('/create', function( req, res ){

	db.Address.create({ url: req.body.url }).done(function (err, data){
		var host = req.headers.host;
		if (err) {
			var errorMsg = { msg: err.errors[0].message }
			res.render('index', {errorMsg: errorMsg});
			return;
		}
  		// res.send(data);
  		var id = data.id;
  		var hash = hashids.encode(id);
  		data.random = hash;
  		data.save().done(function (err, data2){
  			res.render('create', {data2: data2, 'host': host});
  		})
	})
});

app.get('/:tinyurl', function(req,res) {
	db.Address.find({ where: {random: req.params.tinyurl}}).done(function (err,data){
		res.redirect("http://" + data.url);
	})
})


app.listen(process.env.PORT || 3000);