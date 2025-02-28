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
    $.ajax({
        url: "http://111.230.253.94:8081/course/getClassroomList", // 后端 API 地址
        method: "GET", // 请求类型
        dataType: "json", // 返回的数据类型
        headers:{
            "Authorization": "Bearer " + login_token,
            "Content-Type": "application/json"
        },
        success: function (data) {
            if (data.code === "0" && data.data) {
                // 将后端返回的数据填充到页面中
                document.getElementById("classroomList").innerHTML = ""
                console.log(data)
                if (data.data.length !== 0){
                    for (let i = 0; i < data.data.length; i++) {
                        let coverImgBase64 = null;
                        if (!data.data[i].coverImageBase64) {
                            coverImgBase64 = "./assets/img/values-1.png"
                        } else {
                            coverImgBase64 = 'data:image/jpeg;base64,' + data.data[i].coverImageBase64
                        }
                        document.getElementById("classroomList").innerHTML += `
        <ul class="course-list">
        <li class="course-item">
            <div class="course-content">
                <div class="img-wrap">
                    <img src="${coverImgBase64}" width="128">
                </div>
                <div class="information-wrap">
                    <div class="course-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><rect width="2.8" height="12" x="1" y="6" fill="#009dff"><animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate></rect><rect width="2.8" height="12" x="5.8" y="6" fill="#009dff"><animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate></rect><rect width="2.8" height="12" x="10.6" y="6" fill="#009dff"><animate id="svgSpinnersBarsScaleMiddle0" attributeName="y" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate><animate attributeName="height" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate></rect><rect width="2.8" height="12" x="15.4" y="6" fill="#009dff"><animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate></rect><rect width="2.8" height="12" x="20.2" y="6" fill="#009dff"><animate id="svgSpinnersBarsScaleMiddle1" attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"></animate><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"></animate></rect></svg>
                        ${data.data[i].classroomName}
                    </div>
                    <div class="course-instructor" style="display: flex;justify-content: center;align-items: center">${data.data[i].teacherName}</div>
                    <button class="btn btn-primary" style="background-color: #4154f1;margin-left: auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#ffffff" fill-opacity="0" stroke="#ffffff" stroke-dasharray="36" stroke-dashoffset="36" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-swindex="0" d="M8 6L18 12L8 18z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="36;0"></animate><animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.5s" values="0;1"></animate></path></svg>
                        &nbsp;进入教室
                    </button>
                </div>
            </div>
        </li>
        </ul>
        
                    `;


                    }
                }else{
                    document.getElementById("classroomList").innerHTML = "<h2 class=\"section-title\">还没有教师上课~</h2>"
                }

            }else{
                // errorToast("登录已过期，请重新登录")
                // setRedirect("http://111.230.253.94/login")
            }

        },
        error: function () {
            console.log("加载学生信息失败");
            alert("加载学生信息失败，请稍后重试！");
        }
    });

}

function initTeacherPage(){

    document.getElementById("classroomList").innerHTML = `
      <ul class="course-list" style="display: flex;justify-content: center;align-content: center;flex-direction: column;flex-wrap: wrap;">
         <li class="selection-item-1" id="createClassroom" data-toggle="modal" data-target="#createClassroomModal"><!--修改了这里-->
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
      </ul>
    
    `
    $('#JoinClassroom').click(function () {
        initStudentPage();
    })
let createClassroomModal = null;
    // $('#createClassroom').click(function () {
    //     createClassroomModal = new bootstrap.Modal(document.getElementById('createClassroomModal'), {
    //         keyboard: true
    //     });
    //     createClassroomModal.show()
    // })

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




