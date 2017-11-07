(function() {
  jQuery.fn.extend({
    page: function(params) {
      var _this = this;
      var opt = {
        pageSize: 20,
        page: 1,
        count: 0,
        callback: function(res) {
          return res;
        }
      };
      opt = $.extend(opt, params);
      init(opt);
      //分页初始化
      function init(data) {
        console.log(data);
        var startBtn = 1;
        var pageSize = data.count / data.pageSize;
        var pageList = [];
        //判断是否被整除
        pageSize =
          pageSize === parseInt(pageSize)
            ? parseInt(pageSize)
            : parseInt(pageSize) + 1;
        pageSize == 0 ? 1 : pageSize;
        console.log(pageSize);
        if (pageSize < 2) {
          pageList = [];
        } else {
          if (pageSize > 5) {
            //大数据分页
            PageArray(pageSize);
          } else {
            pageList[0] = "《";
            for (i = 1; i <= pageSize; i++) {
              pageList.push(i);
            }
            pageList.push("》");
          }
        }
        AddDom(pageList);
      }

      this.find(".pageBtn").click(function() {
        var num = $(this).attr("value");

        if (num != "《" && num != "》") {
          $(this)
            .addClass("btn-primary")
            .siblings()
            .removeClass("btn-primary");
          opt.callback({
            pageSize: num
          });
        } else {
          var btnDom = $(this)
            .siblings(".btn-primary")
            .next()
            .addClass("btn-primary");
          btnDom.siblings().removeClass("btn-primary");
          var doule = btnDom.attr("value");
        }
      });

      function AddDom(list) {
        var startDom = '<div class="btn-group">';
        var endDom = "</div>";
        list.forEach(function(element) {
          if (element == opt.page) {
            startDom +=
              '<button type="button" class="btn btn-default btn-sm pageBtn btn-primary" value=' +
              element +
              ">" +
              element +
              "</button>";
          } else {
            startDom +=
              '<button type="button" class="btn btn-default btn-sm pageBtn" value=' +
              element +
              ">" +
              element +
              "</button>";
          }
        }, this);
        startDom += endDom;
        _this.append(startDom);
      }

      function PageArray(num) {
          var arr = ["《",1,2,3,4,5]
      }
    }
  });
})(jQuery);
