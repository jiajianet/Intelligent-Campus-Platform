function errorToast(message) {
    $("#error-toast-body").text(message)
    $("#error-toast").toast('show');

}

function successToast(message) {
    $("#success-toast-body").text(message)
    $("#success-toast").toast('show');
}
function getUrlDataFN(urlStr) {
    // 定义一个空对象以储存数据
    const urlObj = {}
    // 检查url中是否携带数据
    if (urlStr.indexOf('?') === -1) return null
    // 找到 '?' 对应的下标
    const index = urlStr.indexOf('?') // index = 31
    // 截取 '?' 后的内容
    const dataStr = urlStr.substr(index + 1) // dataStr = a=1&b=2&c=&d=xxx&e
    // 通过 '&' 将字符串分割成数组
    const dataArr = dataStr.split('&') // ['a=1', 'b=2', 'c=', 'd=xxx', 'e']
    // 遍历字符串分割后的数组
    dataArr.forEach(str => {
        // 判断数组内的字符串是否有 '='
        if (str.indexOf('=') === -1) {
            // 如没有 '=' , 则将此字符串作为对象内键值对的键, 键值对的值为 undefined
            urlObj[str] = undefined // { e: undefined }
        } else {
            // 如果有 '='
            // 通过 '=' 将此字符串截取成两段字符串（不推荐使用 split 分割, 因为数据中可能携带多个 '=' ）
            const innerArrIndex = str.indexOf('=')
            const key = str.substring(0, innerArrIndex)
            const value = str.substr(innerArrIndex + 1)
            // 以截取后的两段字符串作为对象的键值对
            urlObj[key] = value // {a: '1', b: '2', c: '', d: 'xxx'}
        }
    })
    // 返回对象
    return urlObj
}

let login_token= localStorage.getItem("intelli_campus_login_token"),
    courseId = getUrlDataFN(window.location.href).courseId,
    teacherId = null,
    startDate = null,
    endDate = null,
    courseName = null,
    courseIntro = null;

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
                $("#nav-avatar").attr("src", 'data:image/jpeg;base64,' + data.data.avatarBase64 || "/assets/img/avatar.png");
                teacherId = data.data.uid
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
$('#course-startDate').datepicker({
    language: 'zh-CN', // 中文语言包
    autoclose: 1, // 选中日期后自动关闭
    format: 'yyyy-mm-dd', // 日期格式
    minView: "month", // 最小日期显示单元，这里最小显示月份界面，即可以选择到日
    todayBtn: 1, // 显示今天按钮
    todayHighlight: 1, // 显示今天高亮
});
$('#course-endDate').datepicker({
    language: 'zh-CN', // 中文语言包
    autoclose: 1, // 选中日期后自动关闭
    format: 'yyyy-mm-dd', // 日期格式
    minView: "month", // 最小日期显示单元，这里最小显示月份界面，即可以选择到日
    todayBtn: 1, // 显示今天按钮
    todayHighlight: 1, // 显示今天高亮
});

$.ajax({
    url: "http://111.230.253.94:8081/course/getCourseInfo?id="+courseId, // 后端 API 地址
    method: "GET", // 请求类型
    dataType: "json", // 返回的数据类型
    headers:{
        "Authorization": "Bearer " + login_token,
        "Content-Type": "application/json"
    },
    success: function (data) {
        if (data.code === "0") {
            console.log(data)
            // 将后端返回的数据填充到页面中
            $("#courseName").text(data.data.courseName || "未知");
            $("#courseIntro").text(data.data.courseDescription || "未知");
            $("#courseStartTime").text(data.data.startDate || "未知");
            $("#courseEndTime").text(data.data.endDate || "未知");
            $("#userSchool").text(data.data.uschool || "未知");
            if (data.data.coverImageBase64){
                $("#profileImage").attr("src", 'data:image/jpeg;base64,' + data.data.coverImageBase64);
            }else{
                $("#profileImage").attr("src", "./assets/img/values-1.png");
            }
            startDate = data.data.startDate || "";
            endDate = data.data.endDate || "";
            courseName = data.data.courseName || "";
            courseIntro = data.data.courseDescription || "";
        }else if (data.code === "404"){
            errorToast("课程不存在")
            window.location.href = "/hub"
            // setRedirect("http://111.230.253.94/login")
        }else{
            errorToast("服务器繁忙，请稍后再试")
        }

    },
    error: function () {
        console.log("加载课程信息失败");
        alert("加载课程信息失败，请稍后重试！");
    }
});

const basePath = "http://111.230.253.94:8081"
document.addEventListener('DOMContentLoaded', function () {

    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });


});
let modifyCourseModal = null,deleteCourseModal = null;
$('#changeCourseInfo').click(function () {
    document.getElementById('course-name').value = courseName;
    document.getElementById('course-intro').value = courseIntro;
    document.getElementById('course-startDate').value = startDate;
    document.getElementById('course-endDate').value = endDate;
    // modifyCourseModal = new bootstrap.Modal(document.getElementById('modifyCourseModal'), {
    //     keyboard: true
    // });
    // modifyCourseModal.show()
    $('#modifyCourseModal').on('click', () => {
        zui.Messager.show('修改课程信息成功！')
    });
})
$('#btnModifyCourseOkVerify').click(function () {
    let courseName = $('#course-name').val()
    let courseIntro = $('#course-intro').val()
    let startDate = $('#course-startDate').val()
    let endDate = $('#course-endDate').val()
    if (courseName || courseIntro || startDate || endDate) {
        let postParam = {
            "courseName": courseName ,
            "courseDescription": courseIntro,
            "teacherId": teacherId,
            "startDate": startDate,
            "endDate": endDate,
            "progress": 0
        }
        $.ajax({
            url: "http://111.230.253.94:8081/course/updateCourse?courseId="+courseId,
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
                    modifyCourseModal.hide()
                    successToast("课程信息修改成功")
                    location.reload();
                }else{
                    errorToast("课程信息修改失败")
                }
            },
            error: function () {
                console.log("修改课程信息失败");
                alert("修改课程信息失败，请稍后重试！");
            }
        });
    }else{
        errorToast("课程信息不能为空")
    }

})

$('#titleText').on('click', () => {
    window.location.href = "http://111.230.253.94/"
})

$('#deleteProfile').on('click', () => {
    deleteCourseModal = new bootstrap.Modal(document.getElementById('deleteCourseModal'), {
        keyboard: true
    });
    deleteCourseModal.show()
})

$('#btnDeleteCourseOkVerify').on('click', () => {
    $.ajax({
        type: "DELETE",
        url: "http://111.230.253.94:8081/course/deleteCourse?id="+courseId, // 后端 API 地址
        Cache: false,
        dataType: "JSON",
        headers:{
            "Authorization": "Bearer " + login_token,
            "Content-Type": "application/json"
        },
        success: function (result) {
            if (result.code === "-1") {
                errorToast("删除失败")
            } else if (result.code === "0") {
                successToast("课程删除成功")
                deleteCourseModal.hide()
                window.location.href = "/hub"
            } else if (result.code === "400") {
                errorToast("安全验证失败，请重试")
            } else {
                errorToast("未知错误，请重试")
            }
        }
    });
})

/**
 * 压缩图片方法
 * @param {file} file 文件
 * @param {Number} quality 图片质量(取值0-1之间默认0.92)
 */
function compressImg(file, quality) {
    var qualitys = 0.52
    console.log(parseInt((file.size / 1024).toFixed(2)))
    if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
        qualitys = 0.85
    }
    if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
        qualitys = 0.92
    }
    if (quality) {
        qualitys = quality
    }
    if (file[0]) {
        return Promise.all(Array.from(file).map(e => this.compressImg(e,
            qualitys))) // 如果是 file 数组返回 Promise 数组
    } else {
        return new Promise((resolve) => {
            //console.log(file)
            if ((file.size / 1024).toFixed(2) < 300) {
                resolve({
                    file: file
                })
            } else {
                const reader = new FileReader() // 创建 FileReader
                reader.onload = ({
                                     target: {
                                         result: src
                                     }
                                 }) => {
                    const image = new Image() // 创建 img 元素
                    image.onload = async() => {
                        const canvas = document.createElement('canvas') // 创建 canvas 元素
                        const context = canvas.getContext('2d')
                        var targetWidth = image.width
                        var targetHeight = image.height
                        var originWidth = image.width
                        var originHeight = image.height
                        if (1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024) {
                            var maxWidth = 1600
                            var maxHeight = 1600
                            targetWidth = originWidth
                            targetHeight = originHeight
                            // 图片尺寸超过的限制
                            if (originWidth > maxWidth || originHeight > maxHeight) {
                                if (originWidth / originHeight > maxWidth / maxHeight) {
                                    // 更宽，按照宽度限定尺寸
                                    targetWidth = maxWidth
                                    targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                                } else {
                                    targetHeight = maxHeight
                                    targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                                }
                            }
                        }
                        if (10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024) {
                            maxWidth = 1400
                            maxHeight = 1400
                            targetWidth = originWidth
                            targetHeight = originHeight
                            // 图片尺寸超过的限制
                            if (originWidth > maxWidth || originHeight > maxHeight) {
                                if (originWidth / originHeight > maxWidth / maxHeight) {
                                    // 更宽，按照宽度限定尺寸
                                    targetWidth = maxWidth
                                    targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                                } else {
                                    targetHeight = maxHeight
                                    targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                                }
                            }
                        }
                        canvas.width = targetWidth
                        canvas.height = targetHeight
                        context.clearRect(0, 0, targetWidth, targetHeight)
                        context.drawImage(image, 0, 0, targetWidth, targetHeight) // 绘制 canvas
                        const canvasURL = canvas.toDataURL('image/jpeg', qualitys)
                        const buffer = atob(canvasURL.split(',')[1])
                        let length = buffer.length
                        const bufferArray = new Uint8Array(new ArrayBuffer(length))
                        while (length--) {
                            bufferArray[length] = buffer.charCodeAt(length)
                        }
                        const miniFile = new File([bufferArray], file.name, {
                            type: 'image/jpeg'
                        })/*
                                console.log({
                                    file: miniFile,
                                    origin: file,
                                    beforeSrc: src,
                                    afterSrc: canvasURL,
                                    beforeKB: Number((file.size / 1024).toFixed(2)),
                                    afterKB: Number((miniFile.size / 1024).toFixed(2)),
                                    qualitys: qualitys
                                })*/
                        resolve({
                            file: miniFile,
                            origin: file,
                            beforeSrc: src,
                            afterSrc: canvasURL,
                            beforeKB: Number((file.size / 1024).toFixed(2)),
                            afterKB: Number((miniFile.size / 1024).toFixed(2))
                        })
                    }
                    image.src = src
                }
                reader.readAsDataURL(file)
            }
        })
    }
}



function editProfile(event) {
    document.getElementById('fileInput').click();
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        // 创建一个新的 FileReader 对象
        const reader = new FileReader();
        // 读取 File 对象
        reader.readAsDataURL(file);
        // 加载完成后
        reader.onload = function () {
            // 将读取的数据转换为 base64 编码的字符串
            const base64String = reader.result.split(",")[1];
            // 解析为 Promise 对象，并返回 base64 编码的字符串

            resolve(base64String);
        };

        // 加载失败时
        reader.onerror = function () {
            reject(new Error("Failed to load file"));
        };
    });
}

function previewImage(event) {
    const file = event.target.files[0]; // 获取用户选择的文件
    const reader = new FileReader(); // 创建 FileReader 对象
    if (file) {
        reader.readAsDataURL(file); // 将文件读取为 Data URL
        compressImg(file, 0.2).then(r => {
            fileToBase64(r.file).then(result => {
                const profileImage = document.getElementById('profileImage');
                profileImage.src = 'data:image/jpeg;base64,' + result; // 更新头像的 src 属性
                console.log(result)
                $.ajax({
                    url: basePath + "/course/uploadCourseCover?courseId="+courseId,
                    type: "post",
                    data: result,
                    headers:{
                        "Authorization": "Bearer " + login_token,
                        "Content-Type": "application/json"
                    },
                    processData: false, // 告诉jQuery不要去处理发送的数据
                    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                    dataType: 'text',
                    success: function (data) {
                        console.log(data)
                        $("#nav-avatar").attr("src", 'data:image/jpeg;base64,' + result);
                    },
                    error: function (data) {
                        console.log("e:", data)
                    }

                })
            })



        })
    }
}
