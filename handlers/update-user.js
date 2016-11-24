'use strict';

let http = require('http');
let fs = require('fs');
let formidable = require("formidable");
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/blog';

function updateUser (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        let userEmail = fields.userEmailChange;
        let userCurrentPassword = fields.userPassword;
        let userNewPassword = fields.userPasswordChange;
        let userNewPassRepeat = fields.userPasswordRepeatChange;

       MongoClient.connect(url, (err,db)=> {
		if (err) {
			console.log(err)
		}else {
			console.log('connection established to ' + url)
		}

		let usersCollection = db.collection('users');
		let userArr = [];

		if(userNewPassword === userNewPassRepeat){

	    usersCollection.findAndModify(
	    	{email: userEmail, password:userCurrentPassword},
	    	[['_id','asc']],
	    	{$set:{password:userNewPassword}},
	    	 {new: true, upsert: true}, 
	    	  function(err, object) {
 			     if (err){
 			         console.warn(err.message);  
  			    }else{
   			       console.dir(object);
 				     }
 				 });
	   

	      res.writeHead(200);
	      res.write('updated');
	      res.end()
	      return

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

}

module.exports = updateUser;