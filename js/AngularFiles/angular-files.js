app.directive('imageFiles',function($http){
    return {
        restrict:'E',
        replace:false,
        scope:{
            seetings:'='
        },
        templateUrl:'/js/AngularFiles/angular-files.html',
        link:function(scope,elem,attr){
            scope.FilesSeeting={
                FilesName:'文件上传',
                FilesStart:'选择文件',
                IsFilesType:false,
                FilesTitle:[
                    {name:'文件名',className:'',width:'',algin:''},
                    {name:'文件类型',className:'',width:'80',algin:'center'},
                    {name:'文件大小',className:'',width:'80',algin:'center'},
                    {name:'操作',className:'',width:'55',algin:'center'},
                ],
                FilesBtn:['上传','取消'],
                FilesType:[],
                FilesUrl:'test.html',
                FilesParams:{},
                FilesError:null,
                FilesSuccess:null
            }
            angular.extend(scope.FilesSeeting,scope.seetings)
            console.log(scope.FilesSeeting)
            scope.FileList = new Array();
            scope.FilesChange = function(res){
                for(var i = 0;i<res.files.length;i++){
                    scope.FileList.push(res.files[i])
                }
                scope.FileList.forEach(function(e){
                    e.Size = bytesToSize(e.size)
                })
                scope.$apply();
            }

            scope.FileAjax = function(){
                console.log(scope.FileList)
                var is =true;
                if(scope.FilesSeeting.IsFilesType){
                    scope.FileList.forEach(function(e){
                        if(!isNull(e.FilesType)){
                            is=false;
                        }
                    })
                }
                if(!is){
                    layer.msg('请填写类型');
                    return false;
                }
                var data = new FormData();
                scope.FileList.forEach(function(e,index){
                    var obj = new Object();
                    obj.type = 'test'
                    obj.image = e;
                    data.append('picture[]',JSON.stringify(obj),'test');
                })
                // scope.FileList.forEach(function(e){
                //     for(i in scope.FilesSeeting.FilesParams){
                //         data.append(i,scope.FilesSeeting.FilesParams[i]);
                //     }
                //     data.append('picture',e);
                // })
                $http({
                        method:'post',
                        url:scope.FilesSeeting.FilesUrl,
                        data:data
                    }).success(function(res){
                        if(isNull(scope.FilesSeeting.FilesError)){
                            scope.FilesSeeting.FilesError()
                        }
                    }).error(function(res){
                        if(isNull(scope.FilesSeeting.FilesSuccess)){
                            scope.FilesSeeting.FilesSuccess(res)
                        }
                    })
            }
            
            //转换文件大小
            function bytesToSize(bytes) {
                if (bytes === 0) return '0 B';
                var k = 1024;
                sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                i = Math.floor(Math.log(bytes) / Math.log(k));
                var num = (bytes / Math.pow(k,i))+"";
                var num_index = num.indexOf('.');
                num = num.substring(0,num_index+3) + ' ' + sizes[i];
                return num;
                //toPrecision(3) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
            }

            //
            function isNull(str){
                if(str==""||typeof str =='undefined'||str==0||str==null){
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
})