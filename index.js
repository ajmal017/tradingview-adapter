const port = process.env.PORT || 4040;
const ipAddress = process.env.IP_ADDRESS;
const http = require('http');
const handleHttpServerErrors = require('./utils/handleHttpServerErrors');

var express = require('express'),
    app     = express();

app.set('port', port);
app.set('ipaddr',ipAddress);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
* Create HTTP server.
*/
const server = http.createServer(app);

server.listen({port: port, host: ipAddress, ipv6Only: true}, () => {
  console.log(`Trading View Adapter started on port -> ${server.address().port} , ip -> ${server.address().address}`);
});
server.on('error', handleHttpServerErrors);

app.get('/', function (req, res) {
  res.send('hello');
});

app.post('/alert', function (req, res) {
  let body =req.body; // JSON.parse(JSON.stringif());
  console.log(body);
  console.log(body.info);
  res.send({ status: 'SUCCESS' });
});


