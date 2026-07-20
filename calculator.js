function calculateMaterial() {
let rates = JSON.parse(localStorage.getItem("rates")) || [];

let company = document.getElementById("company").value;
let series = document.getElementById("series").value;
let glassCompany = document.getElementById("glassCompany").value;
let glassThickness = document.getElementById("glassThickness").value;

let settings = rates.find(r =>
r.company === company &&
r.series === series &&
r.glassCompany === glassCompany &&
r.glassThickness === glassThickness
);

if(!settings){
alert("এই Combination-এর Rate পাওয়া যায়নি");
return;
}

if(!settings){
alert("আগে Settings থেকে Rate Save করুন");
return;
}

let width = parseFloat(document.getElementById("width").value)||0;
let height = parseFloat(document.getElementById("height").value)||0;
let qty = parseInt(document.getElementById("qty").value)||1;

let hardware = parseFloat(document.getElementById("hardware").value)||0;
let fittings = parseFloat(document.getElementById("fittings").value)||0;

// Outer
let outerSide=((height*2)/12)*qty;
let outerTop=(width/12)*qty;
let outerBottom=(width/12)*qty;

// Shutter
let shutterLock=((height*2)/12)*qty;
let shutterInterlock=((height*2)/12)*qty;
let shutterTop=(width/12)*qty;
let shutterBottom=(width/12)*qty;

// Total Aluminium
let totalAluminium=
outerSide+
outerTop+
outerBottom+
shutterLock+
shutterInterlock+
shutterTop+
shutterBottom;

// Glass
let glass=((width*height)/144)*qty;

// Cost
let aluminiumCost=totalAluminium*settings.aluRate;
let glassCost=glass*settings.glassRate;
let labourCost=glass*settings.labourRate;

let materialCost=
aluminiumCost+
glassCost+
hardware+
fittings+
labourCost;

let costPerSqft=0;

if(glass>0){
costPerSqft=materialCost/glass;
}

let sellingPrice=
materialCost+
(materialCost*settings.profit/100);

// Result
document.getElementById("outerSide").innerHTML=outerSide.toFixed(2)+" ft";
document.getElementById("outerTop").innerHTML=outerTop.toFixed(2)+" ft";
document.getElementById("outerBottom").innerHTML=outerBottom.toFixed(2)+" ft";

document.getElementById("shutterLock").innerHTML=shutterLock.toFixed(2)+" ft";
document.getElementById("shutterInterlock").innerHTML=shutterInterlock.toFixed(2)+" ft";
document.getElementById("shutterTop").innerHTML=shutterTop.toFixed(2)+" ft";
document.getElementById("shutterBottom").innerHTML=shutterBottom.toFixed(2)+" ft";

document.getElementById("totalAluminium").innerHTML=totalAluminium.toFixed(2)+" ft";
document.getElementById("glass").innerHTML=glass.toFixed(2)+" Sqft";

document.getElementById("materialCost").innerHTML=materialCost.toFixed(2)+" ৳";
document.getElementById("costPerSqft").innerHTML=costPerSqft.toFixed(2)+" ৳";
document.getElementById("sellingPrice").innerHTML=sellingPrice.toFixed(2)+" ৳";

// Save quotation
localStorage.setItem("quotation",JSON.stringify({

customer:document.getElementById("customerName").value,
mobile:document.getElementById("mobile").value,
address:document.getElementById("address").value,

company:document.getElementById("company").value,
series:document.getElementById("series").value,

glassCompany:document.getElementById("glassCompany").value,
glassThickness:document.getElementById("glassThickness").value,
glassColour:document.getElementById("glassColour").value,

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

materialCost,
costPerSqft,
sellingPrice

}));

}
