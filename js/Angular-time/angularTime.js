app.directive('dateSelect', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            seetings: '=',
            ngModel: '='
        },
        templateUrl: '/js/Angular-time/index.html',
        link: function (scope, elem, attr) {
            scope.DateTime = scope.ngModel || new Date;
            NewTime(scope.DateTime)
            scope.year = [];
            scope.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            scope.day = [];
            scope.i = 0;
            scope.year_i = 0;
            scope.year[scope.i] = [];
            // NewTime()
            GetDayList(scope.Date.year, scope.Date.month)
            for (var i = 0; i < 140; i++) {
                if (i % 14 == 0 && i !== 0) {
                    scope.i += 1;
                    scope.year[scope.i] = [];
                }
                scope.year[scope.i].push(1950 + i);
            }
            console.log(scope.year)
            //获取当前年份的数组下标
            for (var i = 0; i < scope.year.length; i++) {
                if (scope.year[i].indexOf(scope.Date.year) > -1) {
                    scope.year_i = i;
                }
            }
            scope.ChangeMonth = function (num) {
                scope.Date.month.Value = num;
                scope.MonStatus = false;
            }

            scope.today = function () {
                NewTime();
            }

            scope.ChangeYear = function (num) {
                scope.Date.year = num;
                scope.YearStatus = false;
            }

            scope.Del = function (str) {
                switch (str) {
                    case "month":
                        if (scope.Date.month.Value > 1) {
                            scope.Date.month.Value -= 1;
                        } else {
                            scope.Date.year -= 1;
                            scope.Date.month.Value = 12;
                        }
                        break;
                    case 'year':
                        if (scope.Date.year > 1950) {
                            scope.Date[str] -= 1;
                        }
                        break
                }
            }
            scope.Add = function (str) {
                switch (str) {
                    case "month":
                        if (scope.Date.month.Value < 12) {
                            scope.Date.month.Value += 1;
                        } else {
                            scope.Date.year += 1;
                            scope.Date.month.Value = 1;
                        }
                        break;
                    case 'year':
                        if (scope.Date.year < 2089) {
                            scope.Date.year += 1;
                        }
                        break
                }
            }

            function NewTime(Data) {
                console.log(Data)
                scope.Date = {
                    str: Data.getFullYear() + '-' + (Data.getMonth() + 1 > 10 ? Data.getMonth() + 1 : "0" + (Data.getMonth() + 1)) + "-" + Data.getDate(),
                    strNum: Data.getTime(),
                    year: Data.getFullYear(),
                    month: {
                        Value: Data.getMonth() + 1,
                        year: Data.getFullYear()
                    },
                    day: {
                        Value: Data.getDate(),
                        month: Data.getMonth() + 1,
                        year: Data.getFullYear()
                    }
                };
                console.log(scope.Date)
            }

            scope.$watch('Date.year.Value', function () {
                GetDayList(scope.Date.year, scope.Date.month.Value)
            })
            scope.$watch('Date.month.Value', function () {
                GetDayList(scope.Date.year, scope.Date.month.Value)
            })

            function GetDayList(year, month) {
                var d = new Date(year, month, 0);
                var x = 0;
                scope.day[x] = [];
                for (var i = 1; i < d.getDate() + 1; i++) {
                    scope.day[x].push(i);
                    if (i % 7 == 0) {
                        x += 1;
                        scope.day[x] = [];
                    }
                }
                console.log(scope.day)
            }

            scope.CloseYear = function () {
                scope.YearStatus = false;
            }

            scope.AddYearI = function () {
                if (scope.year[scope.year_i].length > 0 && scope.year.length - 1 != scope.year_i) {
                    scope.year_i += 1;
                }
            }
            scope.DelYearI = function () {
                if (scope.year_i != 0) {
                    scope.year_i -= 1;
                }
            }
        }
    }
})