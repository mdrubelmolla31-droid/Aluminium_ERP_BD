function calculateMaterial() {

let width = parseFloat(document.getElementById("width").value) || 0;
let height = parseFloat(document.getElementById("height").value) || 0;
let qty = parseInt(document.getElementById("qty").value) || 1;

let hardware = parseFloat(document.getElementById("hardware").value) || 0;
let fittings = parseFloat(document.getElementById("fittings").value) || 0;

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

// Total Aluminium
let totalAluminium =
outerSide +
outerTop +
outerBottom +
shutterLock +
shutterInterlock +
shutterTop +
shutterBottom;

// Save Calculator Data
localStorage.setItem("calculatorData", JSON.stringify({

customer: document.getElementById("customerName").value,
mobile: document.getElementById("mobile").value,
address: document.getElementById("address").value,

company: document.getElementById("company").value,
series: document.getElementById("series").value,

glassCompany: document.getElementById("glassCompany").value,
glassThickness: document.getElementById("glassThickness").value,
glassColour: document.getElementById("glassColour").value,

width,
height,
qty,

outerSide,
outerTop,
outerBottom,

shutterLock,
shutterInterlock,
shutterTop,
shutterBottom,

glass,
totalAluminium,

hardware,
fittings

}));

alert("Calculation Saved Successfully");

}
