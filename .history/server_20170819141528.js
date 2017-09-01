var http = require('http');
var server = http.createServer(function (req, res) {
    //如果你发一个GET到http://127.0.0.1:9000/test
    var url_info = require('url').parse(req.url, true);
    //检查是不是给/test的request
    if (url_info.pathname === '/chengwen/test') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        var list = [
            {name:'chengwen',age:13},
            {name:'chengwen',age:13},
            {name:'chengwen',age:13},
            {name:'chengwen',age:13},
            {name:'chengwen',age:13}
        ]
        res.end(JSON.stringify(list));
    }
    //这个是用来回复上面那个post的，显示post的数据以表示成功了。你要是有别的目标，自然不需要这一段。
    else {
        req.pipe(res);
    }
});
server.listen(1024,'127.0.0.1');
//在server关闭的时候也关闭mysql连接
server.on('close', function () {
    
});
console.log('接口挂起');