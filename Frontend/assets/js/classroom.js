function errorToast(message) {
    $("#error-toast-body").text(message)
    $("#error-toast").toast('show');

}

function successToast(message) {
    $("#success-toast-body").text(message)
    $("#success-toast").toast('show');
}

let currentRole = "STUDENT",
    currentUno = "",
    teacherId = null,
    teacherName = null,
    login_token = localStorage.getItem("intelli_campus_login_token");
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
        if (data.code === "0") {
            // 将后端返回的数据填充到页面中
            if (data.data.role === "STUDENT"){
                currentRole = "STUDENT";
                initStudentPage();
            }else{
                teacherId = data.data.uname
                teacherName = data.data.userName
                initTeacherPage();
            }
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
function initStudentPage(){


}

function initTeacherPage(){
    document.getElementById("classroomList").innerHTML = `
    
            <li class="selection-item-1" id="createClassroom">
            <div class="course-content">
                <div class="img-wrap">
                    <img src="../assets/img/teacher.svg" width="64">
                </div>
                <div class="information-wrap">
                    <div class="course-title">开始授课</div>
                    <div class="course-instructor">发起课堂开始授课，学生可参与课堂互动</div>
                </div>
            </div>
        </li>
        <li class="selection-item-1" id="JoinClassroom">
            <div class="course-content">
                <div class="img-wrap">
                    <img src="../assets/img/assignment.svg" width="64">
                </div>
                <div class="information-wrap">
                    <div class="course-title">加入课堂</div>
                    <div class="course-instructor">作为助教或其他老师身份加入其他主讲老师课堂</div>
               </div>
            </div>
        </li>
    
    `
    $('#JoinClassroom').click(function () {
        initStudentPage();
    })
let createClassroomModal = null;
    $('#createClassroom').click(function () {
        createClassroomModal = new bootstrap.Modal(document.getElementById('createClassroomModal'), {
            keyboard: true
        });
        createClassroomModal.show()
    })

    $('#btnCreateClassroomOkVerify').click(function () {
            let postParam = {
                "teacherId": teacherId
            }
            $.ajax({
                url: "http://111.230.253.94:8081/classroom/beginClassroom",
                method: "POST",
                dataType: "json", // 返回的数据类型
                headers:{
                    "Authorization": "Bearer " + login_token,
                    "Content-Type": "application/json"
                },
                Cache: false,
                data: JSON.stringify(postParam),
                success: function (result) {
                    if (result.code === "0"){
                        createClassroomModal.hide()
                        window.location.href = "/classroom"
                    }else{
                        errorToast("课程信息修改失败")
                    }
                },
                error: function () {
                    console.log("修改课程信息失败");
                    alert("修改课程信息失败，请稍后重试！");
                }
            });
    })
}



$('#titleText').on('click', () => {
    window.open("/index")
})
