'use strict';

let http = require('http');
let fs = require('fs');
let formidable = require("formidable");
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/blog';


let user = {
	name: '',
	email: '',
	password: ''
}

function processFormFunc (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        user.name = fields.usernameSignUp;
        user.email = fields.userEmailSignUp;

        if(fields.userPasswordSignUp != fields.userPasswordSignUpRepeat
        	|| user.name == ''
        	|| user.email == ''
        	|| user.password == ''){
        	res.writeHead(400)
        	res.write('blank field or incorrect repeated password')
        	res.end()
        	return
        }else {
        	user.password = fields.userPasswordSignUp;
        }


       MongoClient.connect(url, (err,db)=> {
		if (err) {
			console.log(err)
		}else {
			console.log('connection established to ' + url)
		}

		let collection = db.collection('users');

		collection.insert(user,function (err,result) {

			if(err){
				console.log(err);
			}else {
				console.log('Inserted 1 document into the "users" collection. The documents inserted with "_id" are:', result.length, result);
			}
		});

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

		db.close();
	})
 });
    


}

module.exports = processFormFunc;