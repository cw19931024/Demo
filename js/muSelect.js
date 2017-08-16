(function ($) {
    $.fn.Muselect = function (options) {
        console.log(options);
        var dom = "<div class='select-group'>请选择</div><div class='group-list'>";
        options.list.forEach(function (e) {
            dom += "<div class='list-option'><input type='checkbox' value='" + e + "'>" + e + "</div>";
        });
        dom += "</div></div>";
        var _this = this;
        var _list = "";
        _this.append(dom);
        _this.find('.select-group').toggle(function () {
            $(_this).find('.group-list').slideDown().show();
        }, function () {
            $(_this).find('.group-list').hide();
        });
        _this.mouseleave(function () {
            setTimeout(function () {
                _this.find('.group-list').hide();
            }, 500);
        })
        _this.find(".list-option").click(function (){
            var is = $(this).find('input[type=checkbox]').is(':checked');
            if (is) {
                if ($(this).find('input[type=checkbox]').val() == "不限") {
                    $(_this).find('.list-option input[type=checkbox]').attr('checked', false);
                } else {
                    $(this).find('input[type=checkbox]').attr('checked', false)
                }
            } else {
                if ($(this).find('input[type=checkbox]').val() == "不限") {
                    _list = checkTrue($(_this).find('.list-option input[type=checkbox]'),true)
                } else {
                    $(this).find('input[type=checkbox]').attr('checked', true)
                    _list=$(this).find('input[type=checkbox]').val();
                }
            }
           Listeach(_this.find('.list-option'))
        });

        function checkTrue(list,status){
            var text = "";
            for(i=0;i<list.length;i++){
                list.eq(i).attr('checked',status);
                text+=list.eq(i).val()+","
            }
            return text;
        }

        function Listeach(data){
            var list = new Array();
            for (var i = 0; i < data.length; i++) {
                if (data.eq(i).find('input[type=checkbox]').is(':checked')) {
                    list.push(data.eq(i).find('input[type=checkbox]').val());
                }
            }
            if (list.length > 1) {
                $(".select-group").text("已选择" + list.length + "项")
            } else if (list.length == 1) {
                $(".select-group").text(list[0])
            } else {
                $(".select-group").text("请选择");
            }
        };
        return _list
    }
})(jQuery)