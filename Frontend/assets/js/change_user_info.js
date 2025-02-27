
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
let currentUname = "",currentUno = "",currentUschool = ""
const login_token = localStorage.getItem("intelli_campus_login_token");
console.log(login_token)
function checkLogin() {

    $.ajax({
        url: "http://111.230.253.94:8081/user/getUserInfo", // 后端 API 地址
        method: "GET", // 请求类型
        dataType: "json", // 返回的数据类型
        headers:{
            "Authorization": "Bearer " + login_token,
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code == 0) {
                // 将后端返回的数据填充到页面中
                currentUname = data.data.uname
                currentUno = data.data.uno
                currentUschool = data.data.uschool
                $("#unameInput").val(data.data.uname || "未知姓名");
                $("#uidInput").val(data.data.uno || "未知学号");
                $("#userSchool").val(data.data.uschool || "未知学校");
            }else{
                errorToast("您还未登录，请先登录", 2)
                setRedirect("http://111.230.253.94/login")

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
    //console.log(passwdA)
    //console.log(userSchool)
    if (userSchool != currentUschool || userID != currentUno || userName != currentUname) {
            let postParam = {
                "uschool": userSchool,
                "uno": userID,
                "uname": userName,
            }
            //console.log(encryptedPasswd)
            $.ajax({
                type: "POST",
                url: "http://111.230.253.94:8081/user/updateUserInfo",
                Cache: false,
                data: JSON.stringify(postParam),
                dataType: "JSON",
                contentType: "application/json",
                headers:{
                    "Authorization": "Bearer " + login_token,
                    "Content-Type": "application/json"
                },
                success: function (result) {
                    console.log(result)
                    if (result.code == -1) {
                        errorToast("注册失败", 1)
                    } else if (result.code == 456) {
                        errorToast("用户已存在", 1)
                    } else if (result.code == 0) {
                        localStorage.setItem("intelli_campus_login_token", result.token);
                        successToast("修改成功，信息已变更，请重新登录，正在跳转...",1)
                        redirect()
                    } else if (result.code == 400) {
                        errorToast("安全验证失败，请重试", 1)
                    } else {
                        errorToast("未知错误，请重试", 1)
                    }
                }
            });
        } else {
            $("#error-toast-body").text("请输入新的信息")
            $("#error-toast").toast('show');
        }
})

