const http = require('http');
const path = require('path');
const hostName = '127.0.0.1';
const port = '8080';

http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('/')
}).listen(port,hostName,()=>{
    console.log('服务器:'+hostName+':'+port)
})