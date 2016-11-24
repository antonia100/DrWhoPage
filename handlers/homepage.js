'use strict';
let fs = require('fs');
let url = require('url');

module.exports = (req, res) => {
	let parsedUrl = req.pathname || url.parse(req.url).pathname;
	if (parsedUrl === '/' || parsedUrl === '/index.html'){
		fs.readFile('./index.html', (err,data) => {
			if(err) console.log(err)

			res.writeHead(200, {
				'Content-Type': 'text/html'
			})
			res.write(data)
			res.end()
			})
	} else {
		return true;
	}
}