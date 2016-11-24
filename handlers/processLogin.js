'use strict';

let http = require('http');
let fs = require('fs');
let formidable = require("formidable");
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/blog';


let user = {
	name: '',
	password: ''
}

function processLogin (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        user.name = fields.usernameLogin;
        user.email = fields.passwordLogin;

       MongoClient.connect(url, (err,db)=> {
		if (err) {
			console.log(err)
		}else {
			console.log('connection established to ' + url)
		}

		let usersCollection = db.collection('users');

	    usersCollection.find({name: user.name}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {

	          fs.readFile('./content/index-loggedin.html', (err, data)=>
	          	{
    				if(err) {
   						console.log(err)
 				  	}else {

						res.writeHead(200, {
						'Content-Type': 'text/html'
						});
						res.write(data);
						res.end();
						return
       				}
   				 });

	      } else {

				res.writeHead(404, {
				'Content-Type': 'text/html'
				});
				res.write('incorrect password or username');
				res.end();
	      }
	      db.close();
	    });
 })

  })
    
}

module.exports = processLogin;