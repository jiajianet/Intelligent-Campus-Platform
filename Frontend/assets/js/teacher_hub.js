let currentUserEmail = "",
    currentUno = "",
    teacherId = null,
    teacherName = null

const login_token = localStorage.getItem("intelli_campus_login_token");
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
        if (data.code === "0") {
            // 将后端返回的数据填充到页面中
            if (data.data.role === "STUDENT"){
                errorToast("正在跳转...")
                setTimeout(function () {
                    window.location.href = "./student_hub"
                },1000)
            }else{
                teacherId = data.data.uid
                teacherName = data.data.userName
            }
        }else{
            errorToast("服务器繁忙，请稍后再试")
        }

    },
            error: function () {
                errorToast("登录已过期，请重新登录")
                setRedirect("http://111.230.253.94/login")
            }
});
$.ajax({
    url: "http://111.230.253.94:8081/course/getCourseList", // 后端 API 地址
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
            <a href="./course?courseId=${data.data[i].courseId}" style="margin-left:auto;"><button class="btn primary" style="margin-left: auto">查看课程</button></a>
        </div>
    </div>
</li>
                    `;


                }
            }else{
                document.getElementById("courseHTMLArea").innerHTML = "<h2 class=\"section-title\">您还未创建任何课程~</h2>"
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
const SDTDatetimePicker = new zui.DatetimePicker('#course-startDate',{
    format: 'yyyy-MM-ddTHH:mm:ss+08:00',
});
const EDTDatetimePicker = new zui.DatetimePicker('#course-endDate',{
    format: 'yyyy-MM-ddTHH:mm:ss+08:00',
});

$('#online_classroom').on('click', () => {
    window.open("/class/online_classroom")
})
$('#titleText').on('click', () => {
    window.open("/index")
})



$('#btnCreateCourseOkVerify').on('click', () => {
    console.log(SDTDatetimePicker._element.__k.props.children[0].ref.current.state.value);
    let courseName = $('#course-name').val()
    let courseIntro = $('#course-intro').val()
    let startDate = SDTDatetimePicker._element.__k.props.children[0].ref.current.state.value
    let endDate = EDTDatetimePicker._element.__k.props.children[0].ref.current.state.value
    if (courseName && courseIntro && startDate && endDate) {
        let postParam = {
            "courseName": courseName ,
            "courseDescription": courseIntro,
            "teacherId": teacherId,
            "startDate": startDate,
            "endDate": endDate,
            "progress": 0
        }
        $.ajax({
            type: "POST",
            url: "http://111.230.253.94:8081/course/createCourse",
            headers:{
                "Authorization": "Bearer " + login_token,
                "Content-Type": "application/json"
            },
            dataType: "JSON",
            contentType: "application/json",
            Cache: false,
            processData: false,
            data: JSON.stringify(postParam),
            success: function (result) {
                let dataJSONData = JSON.parse(result)
                console.log(dataJSONData)
                if (dataJSONData.code === "0"){
                    zui.Messager.show('创建课程成功！')
                    window.location.reload()
                }else{
                    errorToast("课程创建失败")
                }
            }
        });

    }else{
        errorToast("请输入信息")
    }

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
                    url: basePath + "/user/uploadAvatar",
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

