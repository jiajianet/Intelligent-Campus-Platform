function errorToast(message, mode) {
  if (mode == 1) {
    $("#userSchool").val("");   //清空学校输入框
    $("#uidInput").val("");   //清空学号输入框
    $("#unameInput").val("");   //清空用户名输入框
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
    $("#userPasswordA").val("");   //清空密码输入框A
    $("#userPasswordB").val("");    //清空密码输入框B

  } else {
    $("#uidInput").val("");   //清空学号输入框
    $("#passwdInput").val("");    //清空密码输入框
  }
  $("#success-toast-body").text(message)
  $("#success-toast").toast('show');
}

function checkLogin() {
  let login_token = localStorage.getItem("intelli_campus_login_token");
  console.log(login_token)
}

checkLogin();