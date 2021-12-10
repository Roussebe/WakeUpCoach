const express = require('express')
const app = express();

app.get( '/', (req, res) => {
	res.send("Hello Node.js on App Engine Standard!");
});

const server = app.listen( process.env.PORT || 8080, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log( "Example app listening" )
});

