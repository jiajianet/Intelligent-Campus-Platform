
"use strict";
function errorToast(message, mode) {
    if (mode == 1) {
        $("#userSchool").val("");   //清空学校输入框
        $("#uidInput").val("");   //清空学号输入框
        $("#unameInput").val("");   //清空用户名输入框
        $("#uemailInput").val("");   //清空电子邮件输入框
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
        $("#uemailInput").val("");   //清空电子邮件输入框
        $("#userPasswordA").val("");   //清空密码输入框A
        $("#userPasswordB").val("");    //清空密码输入框B
        $("#userPasswordA").val("");   //清空验证码输入框

    }else if (mode == 2) {
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

$('#submitRegister').click(function () {
    let userSchool = $("#userSchool").val();
    let userID = $("#uidInput").val();
    let userName = $("#unameInput").val();
    let userEmail = $("#inputEmail").val();
    let passwdA = $("#userPasswordA").val();
    let passwdB = $("#userPasswordB").val();
    let emailCode = $("#inputCode").val();
    //console.log(passwdA)
    //console.log(userSchool)
    if (userID && passwdA && passwdB && userSchool && userName && emailCode) {
        if (passwdA == passwdB) {

            let encryptedPasswd = CryptoJS.SHA256(passwdB).toString();
            let postParam = {
                "uschool": userSchool,
                "uno": userID,
                "password": encryptedPasswd,
                "uname": userName,
                "email":userEmail,
                "captchaVerification":emailCode
            }
            //console.log(encryptedPasswd)
            $.ajax({
                type: "POST",
                url: "http://111.230.253.94:8081/user/completeRegistration",
                Cache: false,
                data: JSON.stringify(postParam),
                dataType: "JSON",
                contentType: "application/json",
                success: function (result) {
                    console.log(result)
                    if (result.code == -1) {
                        errorToast("注册失败", 1)
                    } else if (result.code == 456) {
                        errorToast("用户已存在", 1)
                    } else if (result.code == 0) {
                        localStorage.setItem("intelli_campus_login_token", result.token);
                        successToast("注册成功，正在跳转...",1)
                        redirect()
                    } else if (result.code == 400) {
                        errorToast("安全验证失败，请重试", 1)
                    } else {
                        errorToast("未知错误，请重试", 1)
                    }
                }
            });
        } else {
            $("#userPasswordA").val("");   //清空密码输入框A
            $("#userPasswordB").val("");    //清空密码输入框B
            $("#error-toast-body").text("两次输入密码不一致，请重新输入")
            $("#error-toast").toast('show');
        }
    } else {
        $("#uidInput").val("");   //清空学号输入框
        $("#passwdInput").val("");    //清空密码输入框
        $("#error-toast-body").text("请输入对应信息完成注册")
        $("#error-toast").toast('show');
    }
})

// // 初始化验证码  弹出式
$('#mpanel1').slideVerify({
    baseUrl: 'http://111.230.253.94:8081',  //服务器请求地址, 默认地址为安吉服务器;
    mode: 'pop',     //展示模式
    containerId: 'sendEmail',//pop模式 必填 被点击之后出现行为验证码的元素id
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
        let userSchool = $("#userSchool").val();
        let userID = $("#uidInput").val();
        let userName = $("#unameInput").val();
        let passwdA = $("#userPasswordA").val();
        let passwdB = $("#userPasswordB").val();
        let userEmail = $("#inputEmail").val();
        // console.log(passwdA)
        // console.log(userSchool)
        if (userID && passwdA && passwdB && userSchool && userName && passwdA == passwdB && userEmail) {
            return true
        } else {
            errorToast("请输入完整的信息", 2)
            return false
        }
    },
    ready: function () { },  //加载完毕的回调
    success: function (params) { //成功的回调
        // params为返回的二次验证参数 需要在接下来的实现逻辑回传服务器
        // 例如:
        //login($.extend({}, params))
        let userSchool = $("#userSchool").val();
        let userID = $("#uidInput").val();
        let userName = $("#unameInput").val();
        let passwdA = $("#userPasswordA").val();
        let passwdB = $("#userPasswordB").val();
        let userEmail = $("#inputEmail").val();
        if (passwdA == passwdB) {

            let encryptedPasswd = CryptoJS.SHA256(passwdB).toString();
            let postParam = {
                "uschool": userSchool,
                "uno": userID,
                "password": encryptedPasswd,
                "uname": userName,
                "email": userEmail,
            }
            $.ajax({
                type: "POST",
                url: "http://111.230.253.94:8081/user/register?captchaVerification=" + params.captchaVerification.replace(/\+/g, "%2B"),
                Cache: false,
                data: JSON.stringify(postParam),
                dataType: "JSON",
                contentType: "application/json",
                success: function (result) {
                    console.log(result)
                    if (result.code == -1) {
                        errorToast("注册失败", 1)
                    } else if (result.code == 456) {
                        errorToast("用户已存在", 1)
                    } else if (result.code == 0) {
                        successToast("验证码已发送，请注意查收", 0)
                        startVerifyInterval("sendEmail","发送验证码","#4154f1")
                    } else if (result.code == 400) {
                        errorToast("安全验证失败，请重试", 1)
                    } else {
                        errorToast("未知错误，请重试", 1)
                    }
                }
            });
        }else {
            errorToast("两次密码输入不一致", 1)
        }
    },
    error: function () { }        //失败的回调
});

