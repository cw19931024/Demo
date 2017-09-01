const http = require('http');
const hostName = '127.0.0.1';
const port = '1024';

http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
}).listen(port,hostName,()=>{
    console.log('服务器:'+hostName+':'+port)
})