"use strict";
let http = require('http');
let url = require('url');
let fs = require('fs');
let homepage = require('./handlers/homepage');
let content = require('./handlers/content-files');
let favicon = require('./handlers/favicon');
let processForm = require('./handlers/process-form');
let processLogin = require('./handlers/processLogin');
let updateUser = require('./handlers/update-user');
let newPost = require('./handlers/new-post');

let port = 3000;

http.createServer((req, res)=> {
	let parsedUrl = url.parse(req.url).pathname;
	let method = req.method;

	if(method === 'GET'){
		let handlers = [homepage, favicon, content];

		for (let handle of handlers){
			let next = handle(req, res);
			if(!next){
				break;
			}
		}
	} else if (method === 'POST'){

		if (req.url == '/content/signup.html'){
			processForm(req,res);
		} else if(req.url == '/content/login.html'){
			processLogin(req,res);
		} else if(req.url == '/content/user-profile.html'){
			updateUser(req,res);
		} else if (req.url == '/content/new-post.html'){
			newPost(req, res);
		}
	}

}).listen(port)