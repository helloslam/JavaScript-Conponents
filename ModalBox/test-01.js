var newWindow = document.getElementById("newWindow");
var btn = document.getElementById("btn");
var closeBtn1 = document.getElementById("closeBtn1");
var closeBtn2 = document.getElementById("closeBtn2");
var reply = document.getElementById("reply");

newWindow.addEventListener("click", outsideClose);
btn.addEventListener("click", show);
closeBtn1.addEventListener("click", close);
closeBtn2.addEventListener("click", close);
reply.addEventListener("click", popUp);

function show() {
    newWindow.style.display = "block";
}

function close() {
    newWindow.style.display = "none";

}

function popUp() {
    alert("喊我做咩？");
}

function outsideClose(e) {
    if (e.target == newWindow) {
        newWindow.style.display = "none";
    }
}