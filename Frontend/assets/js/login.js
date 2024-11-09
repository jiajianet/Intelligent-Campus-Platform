"use strict";
function errorToast(message, mode) {
  if (mode == 1) {
    $("#userSchool").val("");   //清空学校输入框
    $("#uidInput").val("");   //清空学号输入框
    $("#unameInput").val("");   //清空用户名输入框
    $("#userPasswordA").val("");   //清空密码输入框A
    $("#userPasswordB").val("");    //清空密码输入框B
  } else {
    $("#uidInput").val("");   //清空学号输入框
    $("#passwdInput").val("");    //清空密码输入框
  }
  $("#error-toast-body").text(message)
  $("#error-toast").toast('show');

}

function successToast(message, mode) {
  if (mode == 1) {
    $("#userSchool").val("");   //清空学校输入框
    $("#uidInput").val("");   //清空学号输入框
    $("#unameInput").val("");   //清空用户名输入框
    $("#userPasswordA").val("");   //清空密码输入框A
    $("#userPasswordB").val("");    //清空密码输入框B

  } else {
    $("#uidInput").val("");   //清空学号输入框
    $("#passwdInput").val("");    //清空密码输入框
  }
  $("#success-toast-body").text(message)
  $("#success-toast").toast('show');
}

function checkLogin() {
  let login_token = localStorage.getItem("intelli_campus_login_token");
  console.log(login_token)
}

checkLogin();

// // 初始化验证码  弹出式
$('#mpanel2').slideVerify({
  baseUrl: 'http://111.230.253.94:8081',  //服务器请求地址, 默认地址为安吉服务器;
  mode: 'pop',     //展示模式
  containerId: 'submitLogin',//pop模式 必填 被点击之后出现行为验证码的元素id
  imgSize: {       //图片的大小对象,有默认值{ width: '310px',height: '155px'},可省略
    width: '400px',
    height: '200px',
  },
  barSize: {          //下方滑块的大小对象,有默认值{ width: '310px',height: '50px'},可省略
    width: '400px',
    height: '40px',
  },
  beforeCheck: function () {  //检验参数合法性的函数  mode ="pop"有效
    // var flag = true;
    // //实现: 参数合法性的判断逻辑, 返回一个boolean值
    // return flag
    let userID = $("#uidInput").val();
    let passwd = $("#passwdInput").val();
    if (!userID && !passwd) {
      errorToast("请输入用户名或密码", 2)
      return false
    } else {
      return true
    }
  },
  ready: function () { },  //加载完毕的回调
  success: function (params) { //成功的回调
    // params为返回的二次验证参数 需要在接下来的实现逻辑回传服务器
    // 例如:
    //login($.extend({}, params))
    let userID = $("#uidInput").val();
    let passwd = $("#passwdInput").val();

    if (userID && passwd) {
      let encryptedPasswd = CryptoJS.SHA256(passwd).toString();
      params["uno"] = userID;
      params["password"] = encryptedPasswd;
      $.ajax({
        type: "POST",
        url: "http://111.230.253.94:8081/user/login",
        Cache: false,
        data: params,
        dataType: "JSON",
        success: function (result) {
          //console.log(result)
          if (result.code == -1) {
            errorToast("用户名或密码错误", 2)
          } else if (result.code == 0) {
            localStorage.setItem("intelli_campus_login_token", result.token);
            successToast("登录成功，正在跳转...")
          }
        }
      });
    } else {
      errorToast("请输入用户名或密码", 2)
    }
  },
  error: function () { }        //失败的回调
});
