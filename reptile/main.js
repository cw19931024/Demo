var http = require('http');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://jandan.net/ooxx/page-1319";

start(url);

function start(x){
    request(x,function(err,res){
        if(err){
            console.log(err)
        }else{
            Data(res.body)
        }
    })
}

function Data(res){
    var $ = cheerio.load(res);
    var data = $('.author strong').toArray();
    for(i in data){
        console.log(data[i].children[0].data)
        // data[i].attribs.src="http:"+data[i].attribs.src;
        // var url = ImgAddress(data[i].attribs.src);
        // downloadImg(data[i].attribs.src,url,function(){
        //     console.log(url+'OK');
        // })
    }

}

//解析图片地址
function ImgAddress(data){
    return path.basename(data);
}

var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
    // console.log('content-length:', res.headers['content-length']);  //图片大小
    if (err) {
        console.log('err: '+ err);
        return false;
    }
    console.log('res: '+ res);
    request(uri).pipe(fs.createWriteStream('img/'+filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};