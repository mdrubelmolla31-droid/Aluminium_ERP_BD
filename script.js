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

function calculateMaterial() {

let width = parseFloat(document.getElementById("width").value) || 0;
let height = parseFloat(document.getElementById("height").value) || 0;
let qty = parseInt(document.getElementById("qty").value) || 1;

// Outer
let outerSide = ((height * 2) / 12) * qty;
let outerTop = (width / 12) * qty;
let outerBottom = (width / 12) * qty;

// Shutter
let shutterLock = ((height * 2) / 12) * qty;
let shutterInterlock = ((height * 2) / 12) * qty;
let shutterTop = (width / 12) * qty;
let shutterBottom = (width / 12) * qty;

// Glass
let glass = ((width * height) / 144) * qty;

// Cost
let hardware = glass * 40;
let fitting = glass * 30;

// Aluminium Total
let totalAluminium =
outerSide +
outerTop +
outerBottom +
shutterLock +
shutterInterlock +
shutterTop +
shutterBottom;

// Grand Total
let grandTotal = hardware + fitting;

// Show Result
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
document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2) + " ৳";

}
