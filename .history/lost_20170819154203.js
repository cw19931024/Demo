const http = require('http');
const path = require('path');
const hostName = '127.0.0.1';
const port = '8080';


http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(path.join(__dirname,'/'))
}).listen(port,hostName,()=>{
    console.log(path.join(__dirname))
    console.log('服务器:'+hostName+':'+port)
})