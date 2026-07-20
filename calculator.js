function calculateMaterial() {

let settings = JSON.parse(localStorage.getItem("erpSettings"));
document.getElementById("totalAluminium").innerHTML =
totalAluminium.toFixed(2) + " ft";


if(!settings){
alert("আগে Settings থেকে Rate Save করুন");
return;
}

let width = parseFloat(document.getElementById("width").value)||0;
let height = parseFloat(document.getElementById("height").value)||0;
let qty = parseInt(document.getElementById("qty").value)||1;

let hardware = parseFloat(document.getElementById("hardware").value)||0;
let fittings = parseFloat(document.getElementById("fittings").value)||0;

// Aluminium Length
let outerSide=((height*2)/12)*qty;
let outerTop=(width/12)*qty;
let outerBottom=(width/12)*qty;

let shutterLock=((height*2)/12)*qty;
let shutterInterlock=((height*2)/12)*qty;
let shutterTop=(width/12)*qty;
let shutterBottom=(width/12)*qty;

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

let sqft=glass;

let costPerSqft=0;

if(sqft>0){
costPerSqft=materialCost/sqft;
}

let sellingPrice=
materialCost+
(materialCost*settings.profit/100);

// Save Quotation
localStorage.setItem("quotation",JSON.stringify({
  document.getElementById("totalAluminium").innerHTML =
totalAluminium.toFixed(2) + " ft";

document.getElementById("glass").innerHTML =
glass.toFixed(2) + " Sqft";

document.getElementById("materialCost").innerHTML =
materialCost.toFixed(2) + " ৳";

document.getElementById("costPerSqft").innerHTML =
costPerSqft.toFixed(2) + " ৳";

document.getElementById("sellingPrice").innerHTML =
sellingPrice.toFixed(2) + " ৳";

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

totalAluminium,
glass,

aluminiumCost,
glassCost,
hardware,
fittings,
labourCost,

materialCost,
costPerSqft,
sellingPrice

}));

alert("Quotation Ready");

}
