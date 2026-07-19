function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "admin@gmail.com" && password === "123456") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("msg").innerHTML = "Wrong Email or Password";
        document.getElementById("msg").style.color = "red";
    }

}

function calculateMaterial(){

let width = parseFloat(document.getElementById("width").value) || 0;
let height = parseFloat(document.getElementById("height").value) || 0;
let qty = parseFloat(document.getElementById("qty").value) || 1;

let outerSide = (height * 2 * qty) / 12;
let outerTop = (width * qty) / 12;
let outerBottom = (width * qty) / 12;

let shutterLock = (height * 2 * qty) / 12;
let shutterInterlock = (height * 2 * qty) / 12;
let shutterTop = (width * qty) / 12;
let shutterBottom = (width * qty) / 12;

let glass = (width * height * qty) / 144;

let hardware = glass * 40;
let fitting = glass * 30;

let totalAluminium =
outerSide +
outerTop +
outerBottom +
shutterLock +
shutterInterlock +
shutterTop +
shutterBottom;

let grandTotal = hardware + fitting;

document.getElementById("outerSide").innerHTML = outerSide.toFixed(2) + " ft";
document.getElementById("outerTop").innerHTML = outerTop.toFixed(2) + " ft";
document.getElementById("outerBottom").innerHTML = outerBottom.toFixed(2) + " ft";

document.getElementById("shutterLock").innerHTML = shutterLock.toFixed(2) + " ft";
document.getElementById("shutterInterlock").innerHTML = shutterInterlock.toFixed(2) + " ft";
document.getElementById("shutterTop").innerHTML = shutterTop.toFixed(2) + " ft";
document.getElementById("shutterBottom").innerHTML = shutterBottom.toFixed(2) + " ft";

document.getElementById("glass").innerHTML = glass.toFixed(2) + " Sqft";
document.getElementById("hardware").innerHTML = hardware.toFixed(2) + " ৳";
document.getElementById("fitting").innerHTML = fitting.toFixed(2) + " ৳";

document.getElementById("totalAluminium").innerHTML = totalAluminium.toFixed(2) + " ft";

if(document.getElementById("grandTotal")){
    document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2) + " ৳";
}

localStorage.setItem("quotation", JSON.stringify({
customer: document.getElementById("customerName").value,
company: document.getElementById("company").value,
series: document.getElementById("series").value,
profile: document.getElementById("profile").value,
width: width,
height: height,
qty: qty,
outerSide: outerSide,
outerTop: outerTop,
outerBottom: outerBottom,
shutterLock: shutterLock,
shutterInterlock: shutterInterlock,
shutterTop: shutterTop,
shutterBottom: shutterBottom,
glass: glass,
hardware: hardware,
fitting: fitting,
totalAluminium: totalAluminium,
grandTotal: grandTotal
}));

}
