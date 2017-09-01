var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var http_proxy = require('http-proxy');

app.use(express.static(path.join('127.0.0.1','/')));
var server = app.listen("1024", function() {
	console.log('当前端口 ' + server.address().port)
});

