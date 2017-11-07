angular.module('ng-downSelect',[]).directive('downSelect',function(){
    return {
        restrict:'E',
        replace:false,
        scope:{
            seetings:'=',
            ngModel:'='
        },
        templateUrl:'/js/angular-downSelect/index.html',
        link:function(scope,elem,attr){
            scope.defaultValue = {
                defaultText:'请选择',
                css:'select',
                placeholderText:'',
                list:[]
            }
            scope.data = angular.extend(scope.defaultValue,scope.seetings);
            console.log(scope.data)
            scope.UpdateDown = function(data){
                console.log(data)
            }
        }
    }
})