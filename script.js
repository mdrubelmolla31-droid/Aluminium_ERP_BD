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

let outerSide = ((height * 2) / 39.37) * qty;
let outerTop = (width / 39.37) * qty;
let outerBottom = (width / 39.37) * qty;

let glass = ((width * height) / 144) * qty;

let totalAluminium = outerSide + outerTop + outerBottom;

document.getElementById("outerSide").innerHTML = outerSide.toFixed(2) + " ft";
document.getElementById("outerTop").innerHTML = outerTop.toFixed(2) + " ft";
document.getElementById("outerBottom").innerHTML = outerBottom.toFixed(2) + " ft";
document.getElementById("glass").innerHTML = glass.toFixed(2) + " sqft";
document.getElementById("totalAluminium").innerHTML = totalAluminium.toFixed(2) + " ft";

localStorage.setItem("quotation", JSON.stringify({
customer: document.getElementById("customerName").value,
company: document.getElementById("company").value,
series: document.getElementById("series").value,
profile: document.getElementById("profile").value,
width: width,
height: height,
qty: qty,
glass: glass.toFixed(2),
aluminium: totalAluminium.toFixed(2)
}));

}
