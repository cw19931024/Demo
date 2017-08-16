var fs = require('fs');
var path = require('path');
var text =',{"name":"测试","age":23,"address":"虹梅路"}';

get();
var text = new Buffer(text);
//读
function get() {
	fs.readFile(__dirname+'/list.json',{flag:'r+',encoding:'utf8'},function(err,data){
		console.log(err);
		console.log(data);
	})
}

//post();

function post(){
	fs.writeFile(__dirname+'/list.json',text,{flag:'a'},function(err) {
		console.log(err);
	})
}
