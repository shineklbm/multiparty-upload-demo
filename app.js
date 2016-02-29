var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir : "temp"});
const fs = require('fs');

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.render("pages/index");
});

app.post('/', multipartMiddleware, function(req, res){
	var x = 10;
	var extension = req.files.profile_picture.originalFilename.split(".").pop();
	var filename = Math.random().toString(36).substr(2, 5);
	if(x === 10){
		var tmp_path	= req.files.profile_picture.path,
			target_path = "uploads/"+filename+"."+extension;

        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + req.files.profile_picture.size + ' bytes');
            });
        });

	}
});



app.listen(3000, function () {
  console.log('Server running on 3000!');
});