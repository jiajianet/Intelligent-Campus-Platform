function errorToast(message) {
    $("#error-toast-body").text(message)
    $("#error-toast").toast('show');

}

function successToast(message) {
    $("#success-toast-body").text(message)
    $("#success-toast").toast('show');
}

let currentUserEmail = "",currentUno = ""
const login_token = localStorage.getItem("intelli_campus_login_token");
console.log(login_token)
$(document).ready(function () {
    function errorToast(message) {
        $("#error-toast-body").text(message)
        $("#error-toast").toast('show');

    }

    function successToast(message) {
        $("#success-toast-body").text(message)
        $("#success-toast").toast('show');
    }

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
                    $("#titleText").text("智慧校园服务平台 | "+data.data.uschool ||"智慧校园服务平台");
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
let selectedCourseId = null
$.ajax({
    url: "http://111.230.253.94:8081/course/getCourseListAll", // 后端 API 地址
    method: "GET", // 请求类型
    dataType: "json", // 返回的数据类型
    headers:{
        "Authorization": "Bearer " + login_token,
        "Content-Type": "application/json"
    },
    success: function (data) {
        if (data.code === "0" && data.data) {
            // 将后端返回的数据填充到页面中
            document.getElementById("courseHTMLArea").innerHTML = ""
            console.log(data)
            if (data.data.length !== 0){
                for (let i = 0; i < data.data.length; i++) {
                    let coverImgBase64 = null;
                    if (!data.data[i].coverImageBase64) {
                        coverImgBase64 = "./assets/img/values-1.png"
                    } else {
                        coverImgBase64 = 'data:image/jpeg;base64,' + data.data[i].coverImageBase64
                    }
                    document.getElementById("courseHTMLArea").innerHTML += `
<li class="course-item">
    <div class="progress" style="height: 3px;">
        <div class="progress-bar" role="progressbar" style="width: 6%;background-color: #4154f1" aria-valuenow="6"
            aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="course-content">
        <div class="img-wrap">
            <img src="${coverImgBase64}" width="200px" height="128px" style="border-radius: 10px">
        </div>
        <div class="information-wrap">
            <div class="course-title">${data.data[i].courseName}</div>
            <div class="course-instructor">${data.data[i].teacherName}</div>
            <a style="margin-left:auto;"><button class="btn primary" style="margin-left: auto" id="select-${i}">加入课程</button></a>
        </div>
    </div>
</li>
                    `;

                    document.getElementById("select-"+i).addEventListener('click', function () {
                        selectedCourseId = data.data[i].courseId
                        document.getElementById("joinCourseModal").style.display = "flex";
                    })
                }
            }else{
                document.getElementById("courseHTMLArea").innerHTML = "<h2 class=\"section-title\">暂时没有找到您未加入的课程~</h2>"
            }

        }else{
            // errorToast("登录已过期，请重新登录")
            // setRedirect("http://111.230.253.94/login")
        }

    },
            error: function () {
                errorToast("登录已过期，请重新登录")
                setRedirect("http://111.230.253.94/login")
            }
});
$('#selectDropCourseBtn').on('click', () => {
    window.open("/select_course")
})
$('#titleText').on('click', () => {
    window.open("/index")
})
$('#cancelJoinModal').on('click', () => {
    document.getElementById("joinCourseModal").style.display = "none";
})
$('#cancelJoinModalExit').on('click', () => {
    document.getElementById("joinCourseModal").style.display = "none";
})
$('#btnJoinCourseOkVerify').on('click', () => {
    let postParam = {
        courseId: selectedCourseId,
    }
    $.ajax({
        url: "http://111.230.253.94:8081/course/joinCourse",
        method: "POST",
        dataType: "json", // 返回的数据类型
        headers: {
            "Authorization": "Bearer " + login_token,
            "Content-Type": "application/json"
        },
        processData: false,
        Cache: false,
        data: JSON.stringify(postParam),
        success: function (result) {
            if (result.code === "0") {
                // createClassroomModal.hide()
                zui.Messager.show('加入课程成功')
                window.location.reload();
            } else {
                zui.Messager.show('加入课程失败')
            }
        },
        error: function () {
            console.log("修改课程信息失败");
            alert("修改课程信息失败，请稍后重试！");
        }
    });
});