'use strict';

let http = require('http');
let fs = require('fs');
let formidable = require("formidable");
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

let url = 'mongodb://localhost:27017/blog';

let post = {
	title: '',
	content: '',
	tags: ''
}

function newPost (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        post.title = fields.newPostTitle;
        post.content = fields.newPostContent;
        post.tags = fields.newPostTags;

       MongoClient.connect(url, (err,db)=> {
		if (err) {
			console.log(err)
		}else {
			console.log('connection established to ' + url)
		}

		let collection = db.collection('posts');

		collection.insert(post,function (err,result) {

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
					res.write('created new post');
					res.end();
					return
					}
			});

		db.close();
	})
 });
    


}

module.exports = newPost;