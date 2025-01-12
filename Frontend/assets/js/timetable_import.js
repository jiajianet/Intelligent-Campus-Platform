$(document).ready(function () {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('file-upload');

    function errorToast(message) {
        $("#error-toast-body").text(message)
        $("#error-toast").toast('show');

    }

    function successToast(message) {
        $("#success-toast-body").text(message)
        $("#success-toast").toast('show');
    }

    const login_token = localStorage.getItem("intelli_campus_login_token");
    if (!login_token) {
        errorToast("您还未登录，请先登录")
        setRedirect("http://111.230.253.94/login.html")
    }

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    uploadArea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            fileInput.click();
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#007bff';
        uploadArea.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
    });

    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        uploadArea.style.backgroundColor = 'transparent';

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            // 处理文件上传的逻辑

            const file = fileInput.files[0]; // 获取上传的文件
            if (file) {
                const reader = new FileReader();

                // 读取文件内容
                reader.onload = function (e) {
                    const binaryString = e.target.result; // 获取文件内容
                    const decoder = new TextDecoder('gbk'); // 使用 'gbk' 解码
                    const htmlContent = decoder.decode(new Uint8Array(binaryString)); // 解析文件内容为字符串

                    // 使用 DOMParser 解析 HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');

                    // 提取所有的表格数据
                    const tables = doc.querySelectorAll('table'); // 获取所有表格
                    const allResults = []; // 存储所有表格的结果

                    // 循环处理每个表格
                    tables.forEach((table, tableIndex) => {
                        const rows = table.querySelectorAll("tr");
                        const result = [];

                        rows.forEach((row, index) => {
                            if (index === 0) return; // 跳过表头
                            const cells = row.querySelectorAll("td"); // 获取所有单元格

                            const period = cells[0]?.textContent.trim(); // 获取时间段
                            const schedule = Array.from(cells)
                                .slice(1) // 跳过第一列（时间段）
                                .map((cell) => cell.textContent.trim() || "空"); // 获取课程信息

                            result.push({period, schedule});
                        });

                        if (result.length) {
                            allResults.push({table: `Table ${tableIndex + 1}`, data: result}); // 保存表格结果
                        }
                    });

                    // // 将数据转换为 JSON 并显示
                    // document.getElementById('output').textContent = JSON.stringify(allResults, null, 2);
                    // console.log(JSON.stringify(allResults, null, 2)); // 输出所有表格的 JSON 数据到控制台
                    //console.log(allResults); // 输出所有表格的结果到控制台
                    //console.log(allResults[2].data[0].schedule[2])
                    let courseData = [
                        {
                            "week": 0,
                            "courses": []
                        },
                        {
                            "week": 1,
                            "courses": []
                        },
                        {
                            "week": 2,
                            "courses": []
                        },
                        {
                            "week": 3,
                            "courses": []
                        },
                        {
                            "week": 4,
                            "courses": []
                        },
                        {
                            "week": 5,
                            "courses": []
                        },
                        {
                            "week": 6,
                            "courses": []
                        },
                    ]
                    //1-2

                    for (let h = 0; h < 8; h++) {
                        for (let i = 0; i < allResults[2].data[h].schedule.length; i++) {
                            if (allResults[2].data[h].schedule[i] != "空") {

                                let courseNameMatchData = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/(\S*)\(/)[1]
                                console.log(courseNameMatchData)
                                let Classroom = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/\[.*?\]/)[0]
                                console.log(Classroom)
                                let teacherClassMatchData = allResults[2].data[h].schedule[i].replace(/(\S*)\(/g, "").replace(/\[.*?\]/g, "").replace(/ [0-9]* [0-9]*.*?[0-9]*周 \)/g, "")
                                console.log(teacherClassMatchData)
                                let startTimeData = "", endTimeData = ""
                                if (h == 0) {
                                    startTimeData = "9:00"
                                    endTimeData = "10:20"
                                } else if (h == 1) {
                                    startTimeData = "10:40"
                                    endTimeData = "12:00"
                                } else if (h == 2) {
                                    startTimeData = "12:30"
                                    endTimeData = "13:50"
                                } else if (h == 3) {
                                    startTimeData = "14:00"
                                    endTimeData = "15:20"
                                } else if (h == 4) {
                                    startTimeData = "15:30"
                                    endTimeData = "16:50"
                                } else if (h == 5) {
                                    startTimeData = "17:00"
                                    endTimeData = "18:20"
                                } else if (h == 6) {
                                    startTimeData = "19:00"
                                    endTimeData = "20:20"
                                } else if (h == 7) {
                                    startTimeData = "20:30"
                                    endTimeData = "21:50"
                                }
                                let singleCourseData = {
                                    index: h + 1,
                                    startTime: startTimeData,
                                    endTime: endTimeData,
                                    subject: courseNameMatchData, //学科
                                    major: teacherClassMatchData, //专业
                                    class: Classroom, //班级
                                }
                                courseData[i].courses.push(singleCourseData)
                            } else continue;
                        }
                    }
                    // for (let h = 0; h < allResults[2].data.length; h++) {
                    //     for (let i = 0; i < allResults[2].data[h].schedule.length; i++) {
                    //         if (allResults[2].data[h].schedule[i] != "空") {
                    //
                    //             let courseNameMatchData = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/(\S*)\(/)[1]
                    //             console.log(courseNameMatchData)
                    //             let Classroom = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/\[.*?\]/)[0]
                    //             console.log(Classroom)
                    //             let teacherClassMatchData = allResults[2].data[h].schedule[i].replace(/(\S*)\(/g, "").replace(/\[.*?\]/g, "").replace(/ [0-9]* [0-9]*.*?[0-9]*周 \)/g, "")
                    //             console.log(teacherClassMatchData)
                    //             let startTimeData = "", endTimeData = ""
                    //             if (h == 0) {
                    //                 startTimeData = "9:00"
                    //                 endTimeData = "10:20"
                    //             } else if (h == 1) {
                    //                 startTimeData = "10:40"
                    //                 endTimeData = "12:00"
                    //             } else if (h == 2) {
                    //                 startTimeData = "14:00"
                    //                 endTimeData = "15:20"
                    //             } else if (h == 3) {
                    //                 startTimeData = "15:30"
                    //                 endTimeData = "16:50"
                    //             } else if (h == 4) {
                    //                 startTimeData = "17:00"
                    //                 endTimeData = "18:20"
                    //             } else if (h == 5) {
                    //                 startTimeData = "19:00"
                    //                 endTimeData = "20:20"
                    //             } else if (h == 6) {
                    //                 startTimeData = "20:20"
                    //                 endTimeData = "21:50"
                    //             }
                    //             let singleCourseData = {
                    //                 index: i + 1,
                    //                 startTime: startTimeData,
                    //                 endTime: endTimeData,
                    //                 subject: courseNameMatchData, //学科
                    //                 major: teacherClassMatchData, //专业
                    //                 class: Classroom, //班级
                    //             }
                    //             weekCourseData.push(singleCourseData)
                    //         }
                    //         //console.log(allResults[2].data[0].schedule[i])
                    //     }
                    // }

                    $.ajax({
                        type: "POST",
                        url: "http://111.230.253.94:8081/user/saveUserSchedule?token=" + login_token,
                        Cache: false,
                        data: JSON.stringify(courseData),
                        dataType: "JSON",
                        contentType: "application/json",
                        success: function (result) {
                            //console.log(result)
                            if (result.code == 403) {
                                errorToast("登录已过期，请重新登录", 2)

                            } else if (result.code == 0) {
                                successToast("上传成功，正在跳转...")
                                setTimeout(function () {
                                    window.location.href = "../../timetable/index.html"
                                }, 1000)

                            } else {
                                errorToast("上传失败", 2)
                            }
                        }
                    });
                }
                // 读取文件作为 ArrayBuffer 以处理不同编码
                reader.readAsArrayBuffer(file); // 使用 readAsArrayBuffer 读取文件
            }

        }
    });
    $.ajax({
        url: "http://111.230.253.94:8081/user/getUserInfo?token=" + login_token, // 后端 API 地址
        method: "GET", // 请求类型
        dataType: "json", // 返回的数据类型
        success: function (data) {
            if (data.code == 0) {
                $("#profileImage").attr("src", 'data:image/jpeg;base64,' + data.data.avatarBase64 || "/assets/img/avatar.png");
            } else {
                console.log("加载学生信息失败");
                errorToast("登录过期，请重新登录", 2)
                setRedirect("http://111.230.253.94/login.html")
            }
            // 将后端返回的数据填充到页面中

        },
        error: function () {

        }
    });
    document.getElementById('file-upload').addEventListener('change', function (event) {

        const file = event.target.files[0]; // 获取上传的文件
        if (file) {
            const reader = new FileReader();

            // 读取文件内容
            reader.onload = function (e) {
                const binaryString = e.target.result; // 获取文件内容
                const decoder = new TextDecoder('gbk'); // 使用 'gbk' 解码
                const htmlContent = decoder.decode(new Uint8Array(binaryString)); // 解析文件内容为字符串

                // 使用 DOMParser 解析 HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // 提取所有的表格数据
                const tables = doc.querySelectorAll('table'); // 获取所有表格
                const allResults = []; // 存储所有表格的结果

                // 循环处理每个表格
                tables.forEach((table, tableIndex) => {
                    const rows = table.querySelectorAll("tr");
                    const result = [];

                    rows.forEach((row, index) => {
                        if (index === 0) return; // 跳过表头
                        const cells = row.querySelectorAll("td"); // 获取所有单元格

                        const period = cells[0]?.textContent.trim(); // 获取时间段
                        const schedule = Array.from(cells)
                            .slice(1) // 跳过第一列（时间段）
                            .map((cell) => cell.textContent.trim() || "空"); // 获取课程信息

                        result.push({period, schedule});
                    });

                    if (result.length) {
                        allResults.push({table: `Table ${tableIndex + 1}`, data: result}); // 保存表格结果
                    }
                });

                // // 将数据转换为 JSON 并显示
                // document.getElementById('output').textContent = JSON.stringify(allResults, null, 2);
                // console.log(JSON.stringify(allResults, null, 2)); // 输出所有表格的 JSON 数据到控制台
                //console.log(allResults); // 输出所有表格的结果到控制台
                //console.log(allResults[2].data[0].schedule[2])
                let courseData = [
                    {
                        "week": 0,
                        "courses": []
                    },
                    {
                        "week": 1,
                        "courses": []
                    },
                    {
                        "week": 2,
                        "courses": []
                    },
                    {
                        "week": 3,
                        "courses": []
                    },
                    {
                        "week": 4,
                        "courses": []
                    },
                    {
                        "week": 5,
                        "courses": []
                    },
                    {
                        "week": 6,
                        "courses": []
                    },
                ]
                //1-2

                for (let h = 0; h < 8; h++) {
                    for (let i = 0; i < allResults[2].data[h].schedule.length; i++) {
                        if (allResults[2].data[h].schedule[i] != "空") {

                            let courseNameMatchData = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/(\S*)\(/)[1]
                            console.log(courseNameMatchData)
                            let Classroom = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/\[.*?\]/)[0]
                            console.log(Classroom)
                            let teacherClassMatchData = allResults[2].data[h].schedule[i].replace(/(\S*)\(/g, "").replace(/\[.*?\]/g, "").replace(/ [0-9]* [0-9]*.*?[0-9]*周 \)/g, "")
                            console.log(teacherClassMatchData)
                            let startTimeData = "", endTimeData = ""
                            if (h == 0) {
                                startTimeData = "9:00"
                                endTimeData = "10:20"
                            } else if (h == 1) {
                                startTimeData = "10:40"
                                endTimeData = "12:00"
                            } else if (h == 2) {
                                startTimeData = "12:30"
                                endTimeData = "13:50"
                            } else if (h == 3) {
                                startTimeData = "14:00"
                                endTimeData = "15:20"
                            } else if (h == 4) {
                                startTimeData = "15:30"
                                endTimeData = "16:50"
                            } else if (h == 5) {
                                startTimeData = "17:00"
                                endTimeData = "18:20"
                            } else if (h == 6) {
                                startTimeData = "19:00"
                                endTimeData = "20:20"
                            } else if (h == 7) {
                                startTimeData = "20:30"
                                endTimeData = "21:50"
                            }
                            let singleCourseData = {
                                index: h + 1,
                                startTime: startTimeData,
                                endTime: endTimeData,
                                subject: courseNameMatchData, //学科
                                major: teacherClassMatchData, //专业
                                class: Classroom, //班级
                            }
                            courseData[i].courses.push(singleCourseData)
                        } else continue;
                    }
                }
                // for (let h = 0; h < allResults[2].data.length; h++) {
                //     for (let i = 0; i < allResults[2].data[h].schedule.length; i++) {
                //         if (allResults[2].data[h].schedule[i] != "空") {
                //
                //             let courseNameMatchData = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/(\S*)\(/)[1]
                //             console.log(courseNameMatchData)
                //             let Classroom = allResults[2].data[h].schedule[i].replace(/\s+/g, "").match(/\[.*?\]/)[0]
                //             console.log(Classroom)
                //             let teacherClassMatchData = allResults[2].data[h].schedule[i].replace(/(\S*)\(/g, "").replace(/\[.*?\]/g, "").replace(/ [0-9]* [0-9]*.*?[0-9]*周 \)/g, "")
                //             console.log(teacherClassMatchData)
                //             let startTimeData = "", endTimeData = ""
                //             if (h == 0) {
                //                 startTimeData = "9:00"
                //                 endTimeData = "10:20"
                //             } else if (h == 1) {
                //                 startTimeData = "10:40"
                //                 endTimeData = "12:00"
                //             } else if (h == 2) {
                //                 startTimeData = "14:00"
                //                 endTimeData = "15:20"
                //             } else if (h == 3) {
                //                 startTimeData = "15:30"
                //                 endTimeData = "16:50"
                //             } else if (h == 4) {
                //                 startTimeData = "17:00"
                //                 endTimeData = "18:20"
                //             } else if (h == 5) {
                //                 startTimeData = "19:00"
                //                 endTimeData = "20:20"
                //             } else if (h == 6) {
                //                 startTimeData = "20:20"
                //                 endTimeData = "21:50"
                //             }
                //             let singleCourseData = {
                //                 index: i + 1,
                //                 startTime: startTimeData,
                //                 endTime: endTimeData,
                //                 subject: courseNameMatchData, //学科
                //                 major: teacherClassMatchData, //专业
                //                 class: Classroom, //班级
                //             }
                //             weekCourseData.push(singleCourseData)
                //         }
                //         //console.log(allResults[2].data[0].schedule[i])
                //     }
                // }

                $.ajax({
                    type: "POST",
                    url: "http://111.230.253.94:8081/user/saveUserSchedule?token=" + login_token,
                    Cache: false,
                    data: JSON.stringify(courseData),
                    dataType: "JSON",
                    contentType: "application/json",
                    success: function (result) {
                        //console.log(result)
                        if (result.code == 403) {
                            errorToast("登录已过期，请重新登录", 2)
                            setRedirect("http://111.230.253.94/login.html")
                        } else if (result.code == 0) {
                            successToast("上传成功，正在跳转...")
                            setTimeout(function () {
                                window.location.href = "../../index.html"
                            }, 1000)

                        } else {
                            errorToast("上传失败", 2)
                        }
                    }
                });
            }
            // 读取文件作为 ArrayBuffer 以处理不同编码
            reader.readAsArrayBuffer(file); // 使用 readAsArrayBuffer 读取文件
        }


    })
})