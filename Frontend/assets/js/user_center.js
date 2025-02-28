$(function () {

        let currentUserEmail = "",currentUno = ""
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
            headers:{
                "Authorization": "Bearer " + login_token,
                "Content-Type": "application/json"
            },
            method: "GET", // 请求类型
            dataType: "json", // 返回的数据类型
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

        let changeEmailModal,newEmailVal;
    $('#changeEmailBtn').on('click', () => {
            newEmailVal = $("#userEmail").val()
            if (newEmailVal == currentUserEmail){
                errorToast("请输入新的电子邮箱")
            }else {
                console.log($("#userEmail").val())
                $.ajax({
                    url: "http://111.230.253.94:8081/user/updateEmail?newEmail="+newEmailVal, // 后端 API 地址
                    headers:{
                        "Authorization": "Bearer " + login_token,
                        "Content-Type": "application/json"
                    },
                    method: "POST", // 请求类型
                    dataType: "json", // 返回的数据类型
                    success: function (data) {
                        if (data.code == 0) {
                            startVerifyInterval("changeEmailBtn","更改邮箱","white")
                            // 将后端返回的数据填充到页面中
                            // changeEmailModal = new bootstrap.Modal(document.getElementById('changeEmail'), {
                            //     keyboard: false
                            // });
                            // changeEmailModal.show()
                            $('#changeEmail').on('click', () => {
                                zui.Messager.show('修改邮箱成功！')
                            });
                        }else{
                            errorToast("验证邮件发送失败，请重试")
                        }

                    },
                    error: function () {
                        errorToast("验证邮件发送失败，请重试")
                    }
                });
            }

        });

    $('#btnOkVerify').on('click', () => {
            let EmailCodeVal = $("#email-verify-code").val()
            console.log($("#email-verify-code").val())
            $.ajax({
                url: "http://111.230.253.94:8081/user/verifyEmailUpdate?newEmail="+newEmailVal+"&emailCaptcha="+EmailCodeVal, // 后端 API 地址
                headers:{
                    "Authorization": "Bearer " + login_token,
                    "Content-Type": "application/json"
                },
                method: "POST", // 请求类型
                dataType: "json", // 返回的数据类型
                success: function (data) {
                    console.log(data);
                    if (data.code == 0) {
                        // 将后端返回的数据填充到页面中
                        successToast("电子邮箱更改成功")
                        changeEmailModal.hide()
                    }else{
                        errorToast("验证码错误，请重试")
                    }

                },
                error: function () {
                    console.log("加载学生信息失败");
                    alert("加载学生信息失败，请稍后重试！");
                }
            });

        });

    $('#changePasswordBtn').on('click', () => {
            window.location.href = "http://111.230.253.94/reset"
        })
    $('#changeUserInfoBtn').on('click', () => {
            window.location.href = "http://111.230.253.94/change_user_info"
        })
    $('#titleText').on('click', () => {
            window.location.href = "http://111.230.253.94/index"
        })
        let deleteProfileModal
// // 初始化验证码  弹出式
        $('#mpanel1').slideVerify({
            baseUrl: 'http://111.230.253.94:8081',  //服务器请求地址, 默认地址为安吉服务器;
            mode: 'pop',     //展示模式
            containerId: 'deleteProfile',//pop模式 必填 被点击之后出现行为验证码的元素id
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
                // console.log(passwdA)
                // console.log(userSchool)
                if (currentUno && currentUserEmail) {
                    return true
                } else {
                    errorToast("系统异常", 2)
                    return false
                }
            },
            ready: function () { },  //加载完毕的回调
            success: function (params) { //成功的回调
// params为返回的二次验证参数 需要在接下来的实现逻辑回传服务器
                // 例如:
                //login($.extend({}, params))
                //console.log(passwdA)
                //console.log(userSchool)
                //console.log(encryptedPasswd)
                $.ajax({
                    type: "DELETE",
                    url: "http://111.230.253.94:8081/user/deleteAccount?uno="+currentUno+"&email="+currentUserEmail+ "&captchaVerification=" + params.captchaVerification.replace(/\+/g, "%2B"), // 后端 API 地址
                    Cache: false,
                    dataType: "JSON",
                    headers:{
                        "Authorization": "Bearer " + login_token,
                        "Content-Type": "application/json"
                    },
                    success: function (result) {
                        console.log(result)
                        if (result.code == -1) {
                            errorToast("重设失败", 1)
                        } else if (result.code == 456) {
                            errorToast("用户已存在", 1)
                        } else if (result.code == 0) {
                            successToast("验证码已发送，请注意查收",0)
                            startVerifyInterval("deleteProfile","注销","white")
                            // deleteProfileModal = new bootstrap.Modal(document.getElementById('deleteProfileModal'), {
                            //     keyboard: false
                            // });
                            // deleteProfileModal.show()
// 不确定
                            $('#deleteProfileModal').on('click', () => {
                                zui.Messager.show('嘿！这是一条消息。')
                            });
                            // $('#deleteProfileModal').modal('show');
                        } else if (result.code == 400) {
                            errorToast("安全验证失败，请重试", 1)
                        } else {
                            errorToast("未知错误，请重试", 1)
                        }
                    }
                });

            },
            error: function () { }        //失败的回调
        });

    $('#btnOkDelete').on('click', () => {
            let EmailCodeVal = $("#email-verify-code-delete").val()
            console.log($("#email-verify-code-delete").val())
            $.ajax({
                url: "http://111.230.253.94:8081/user/completeDeleteAccount?uno="+currentUno+"&email="+currentUserEmail+"&EmailcaptchaVerification="+EmailCodeVal, // 后端 API 地址
                method: "POST", // 请求类型
                dataType: "json", // 返回的数据类型
                success: function (data) {
                    console.log(data);
                    if (data.code == 0) {
                        // 将后端返回的数据填充到页面中
                        successToast("账号已成功注销")
                        localStorage.removeItem("intelli_campus_login_token")
                        redirect()
                    }else{
                        errorToast("注销失败，请检查验证码")
                    }

                },
                error: function () {
                    console.log("加载学生信息失败");
                    alert("加载学生信息失败，请稍后重试！");
                }
            });

        });

//console.log(login_token)
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

    });
