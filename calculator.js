function calculateMaterial() {

// ===== Load Rate =====

let rates = JSON.parse(localStorage.getItem("rates")) || [];

let company = document.getElementById("company").value;
let series = document.getElementById("series").value;
let glassCompany = document.getElementById("glassCompany").value;
let glassThickness = document.getElementById("glassThickness").value;

let settings = rates.find(r =>

r.company == company &&
r.series == series &&
r.glassCompany == glassCompany &&
r.glassThickness == glassThickness

);

if(!settings){

alert("Rate Not Found");

return;

}

// ===== Customer =====

let customer =
document.getElementById("customerName").value;

let mobile =
document.getElementById("mobile").value;

let address =
document.getElementById("address").value;

// ===== Size =====

let width =
parseFloat(document.getElementById("width").value)||0;

let height =
parseFloat(document.getElementById("height").value)||0;

let qty =
parseInt(document.getElementById("qty").value)||1;

// ===== Manual Cost =====

let hardware =
parseFloat(document.getElementById("hardware").value)||0;

let fittings =
parseFloat(document.getElementById("fittings").value)||0;

// ===== Aluminium =====

let outerSide =
((height*2)/12)*qty;

let outerTop =
(width/12)*qty;

let outerBottom =
(width/12)*qty;

let shutterLock =
((height*2)/12)*qty;

let shutterInterlock =
((height*2)/12)*qty;

let shutterTop =
(width/12)*qty;

let shutterBottom =
(width/12)*qty;

let totalAluminium =

outerSide+
outerTop+
outerBottom+
shutterLock+
shutterInterlock+
shutterTop+
shutterBottom;

// ===== Glass =====

let glass =
((width*height)/144)*qty;

  // ===== Cost =====

let aluminiumCost = totalAluminium * settings.aluRate;
let glassCost = glass * settings.glassRate;
let labourCost = glass * settings.labourRate;

let materialCost =
aluminiumCost +
glassCost +
hardware +
fittings +
labourCost;

let costPerSqft = 0;

if(glass > 0){
costPerSqft = materialCost / glass;
}

let profitAmount =
(materialCost * settings.profit) / 100;

let sellingPrice =
materialCost + profitAmount;

// ===== Result =====

document.getElementById("outerSide").innerHTML =
outerSide.toFixed(2)+" ft";

document.getElementById("outerTop").innerHTML =
outerTop.toFixed(2)+" ft";

document.getElementById("outerBottom").innerHTML =
outerBottom.toFixed(2)+" ft";

document.getElementById("shutterLock").innerHTML =
shutterLock.toFixed(2)+" ft";

document.getElementById("shutterInterlock").innerHTML =
shutterInterlock.toFixed(2)+" ft";

document.getElementById("shutterTop").innerHTML =
shutterTop.toFixed(2)+" ft";

document.getElementById("shutterBottom").innerHTML =
shutterBottom.toFixed(2)+" ft";

document.getElementById("totalAluminium").innerHTML =
totalAluminium.toFixed(2)+" ft";

document.getElementById("glass").innerHTML =
glass.toFixed(2)+" Sqft";

document.getElementById("materialCost").innerHTML =
materialCost.toFixed(2)+" ৳";

document.getElementById("costPerSqft").innerHTML =
costPerSqft.toFixed(2)+" ৳";

document.getElementById("sellingPrice").innerHTML =
sellingPrice.toFixed(2)+" ৳";

// ===== Save Quotation =====

localStorage.setItem("quotation",JSON.stringify({

customer,
mobile,
address,

company,
series,

glassCompany,
glassThickness,

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

totalAluminium,
glass,

aluminiumCost,
glassCost,
labourCost,

hardware,
fittings,

materialCost,
costPerSqft,

profit:settings.profit,
profitAmount,

sellingPrice

}));

}
