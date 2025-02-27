function errorToast(message) {
    $("#error-toast-body").text(message)
    $("#error-toast").toast('show');

}

function successToast(message) {
    $("#success-toast-body").text(message)
    $("#success-toast").toast('show');
}

let currentUserEmail = "",currentUno = ""
$(document).ready(function () {
    function errorToast(message) {
        $("#error-toast-body").text(message)
        $("#error-toast").toast('show');

    }

    function successToast(message) {
        $("#success-toast-body").text(message)
        $("#success-toast").toast('show');
    }
    let login_token = localStorage.getItem("intelli_campus_login_token");
    console.log(login_token)
        // 从后端获取数据并更新页面
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
                    $("#profileImage").attr("src", 'data:image/jpeg;base64,' + data.data.avatarBase64 || "/assets/img/avatar.png");
                    $("#nav-avatar").attr("src", 'data:image/jpeg;base64,' + data.data.avatarBase64 || "/assets/img/avatar.png");
                    $("#userName").text(data.data.uname || "未知姓名");
                    $("#userEmail").val(data.data.email || "未绑定邮箱");
                    currentUserEmail = data.data.email || "";
                    currentUno = data.data.uno || "";
                    $("#userRole").text(data.role || "学生");
                    $("#userId").text(data.data.uno || "未知学号");
                    $("#userSchool").text(data.data.uschool || "未知学校");
                }else{
                    errorToast("登录已过期，请重新登录")
                    setRedirect("http://111.230.253.94/login")
                }

            },
            error: function () {
                console.log("加载学生信息失败");
                alert("加载学生信息失败，请稍后重试！");
            }
        });
});

