let IntervalSecond = 60,elementIdVal=localStorage.getItem("intelli_campus_interval_elementId"),resetTextVal=localStorage.getItem("intelli_campus_interval_resetText"),resetColorVal = localStorage.getItem("intelli_campus_interval_resetColor")
if (localStorage.getItem("intelli_campus_send_interval")){
    IntervalSecond = localStorage.getItem("intelli_campus_send_interval")
    if (elementIdVal && resetTextVal && resetColorVal){
        startVerifyInterval(elementIdVal,resetTextVal,resetColorVal)
    }

}
function startVerifyInterval(elementId,resetText,resetColor) {
    try {
        localStorage.setItem("intelli_campus_interval_elementId", elementId.toString());
        localStorage.setItem("intelli_campus_interval_resetText", resetText.toString());
        localStorage.setItem("intelli_campus_interval_resetColor", resetColor.toString());
        elementIdVal = elementId.toString()
        resetTextVal = resetText.toString()
        resetColorVal = resetColor.toString();
        document.getElementById(elementId).setAttribute("disabled","disabled");
        document.getElementById(elementId).style.color = "grey";
        let VerifyInterval
        if (!VerifyInterval){
            VerifyInterval = setInterval(() => {
                document.getElementById(elementId).innerText = IntervalSecond + "秒后重试"
                --IntervalSecond
                localStorage.setItem("intelli_campus_send_interval", IntervalSecond.toString());
                if (IntervalSecond <= 0) {
                    clearInterval(VerifyInterval)
                    document.getElementById(elementId).removeAttribute("disabled");
                    document.getElementById(elementId).style.color = resetColor;
                    document.getElementById(elementId).innerText = resetText
                    localStorage.removeItem("intelli_campus_send_interval")
                    IntervalSecond = 60
                }
            },1000)
        }
    }catch (e){

    }

}