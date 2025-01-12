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
  $.ajax({
    url: "http://111.230.253.94:8081/user/getUserInfo?token="+login_token, // 后端 API 地址
    method: "GET", // 请求类型
    dataType: "json", // 返回的数据类型
    success: function (data) {
      if (data.code == 0) {
        // 将后端返回的数据填充到页面中
        successToast("您已登录，正在跳转",1)
        redirect()
      }else{

      }

    },
    error: function () {
    }
  });
}

checkLogin();

// // 初始化验证码  弹出式
$('#mpanel2').slideVerify({
  baseUrl: 'http://111.230.253.94:8081',  //服务器请求地址;
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
    $("#loginForm").bootstrapValidator('validate');//提交验证
    if ($("#loginForm").data('bootstrapValidator').isValid()) {//获取验证结果，如果成功，执行下面代码
      return true
    }else{
      return false;
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
            redirect()
          }
        }
      });
    } else {
      errorToast("请输入用户名或密码", 2)
    }
  },
  error: function () { }        //失败的回调
});
$(function () {
  $("#loginForm").bootstrapValidator({
    live: 'enabled',//验证时机，enabled是内容有变化就验证（默认），disabled和submitted是提交再验证
    excluded: [':disabled', ':hidden', ':not(:visible)'],//排除无需验证的控件，比如被禁用的或者被隐藏的
    submitButtons: '#btn-test',//指定提交按钮，如果验证失败则变成disabled，但我没试成功，反而加了这句话非submit按钮也会提交到action指定页面
    message: '验证失败',//好像从来没出现过
    feedbackIcons: {//根据验证结果显示的各种图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      userID: {
        validators: {
          notEmpty: {//检测非空,radio也可用
            message: '不能为空'
          },
          stringLength: {//检测长度
            min: 6,
            max: 30,
            message: '长度必须在6-30之间'
          }
        }
      },
      userPassword: {
        validators: {
          notEmpty: {//检测非空,radio也可用
            message: '不能为空'
          },
          stringLength: {//检测长度
            min: 6,
            max: 30,
            message: '长度必须在6-30之间'
          }
        }
      }
    }
  });

  });