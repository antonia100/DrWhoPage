"use strict";
let fs = require('fs');
let url = require('url');

module.exports = (req,res) => {
	let parsedUrl = req.pathname || url.parse(req.url).pathname;

	if (parsedUrl.startsWith('/content')){
			fs.readFile('.' + parsedUrl, (err,data)=>{
			if(err){
				res.writeHead(404)
				res.write('404 not found')
				res.end()
				return true;
			} else {

				let contentType = 'text/html';

				if(parsedUrl.endsWith('.css')){
					contentType = 'text/css';
				}else if (parsedUrl.endsWith('.js')){
					contentType = 'application/javascript';
				}

				res.writeHead(200, {
					'Content-Type': contentType
				})
				res.write(data)
				res.end()
			}
		})
	} else {
		res.writeHead(404)
		res.write('404 not found')
		res.end()
	}
}
  

