window.qkl = {};
var btn = document.createElement("div");
btn.className = "qf-feedback";
btn.setAttribute("title", "问题反馈");
btn.onclick = function(params) {
  if (qkl.linkType == "qkl") {
    if (qkl.domain && qkl.uuid && qkl.system) {
      var originDomain = qkl.domain;
      var domain =
        originDomain.substr(0, 7).toLowerCase() == "http://"
          ? originDomain
          : "http://" + originDomain;
      window.open(
        domain +
          "#/create?uuid=" +
          qkl.uuid +
          "&system=" +
          qkl.system +
          "&name=" +
          qkl.name +
          "&phone=" +
          qkl.phone +
          "&company=" +
          qkl.company +
          "&department=" +
          qkl.department +
          "&zone=" +
          qkl.zone
      );
    } else {
      console.warn("问题反馈用户信息未配置");
    }
  } else if (qkl.linkType == "linkType") {
    window.open("http://cn.mikecrm.com/ij8rsYb");
  } else {
  }
};
document.body.appendChild(btn);
