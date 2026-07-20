let rates = JSON.parse(localStorage.getItem("rates")) || [];

window.onload = function () {

loadDropdowns();

};

function loadDropdowns() {

rates = JSON.parse(localStorage.getItem("rates")) || [];

fillSelect("company","company");
fillSelect("series","series");
fillSelect("aluThickness","aluThickness");
fillSelect("glassCompany","glassCompany");
fillSelect("glassThickness","glassThickness");
fillSelect("glassColour","glassColour");

}

function fillSelect(id,key){

let select=document.getElementById(id);

select.innerHTML="";

let values=[...new Set(rates.map(x=>x[key]))];

values.forEach(v=>{

if(v!=undefined){

select.innerHTML+=`<option>${v}</option>`;

}

});

}

function calculateMaterial(){

let company=document.getElementById("company").value;
let series=document.getElementById("series").value;
let aluThickness=document.getElementById("aluThickness").value;
let glassCompany=document.getElementById("glassCompany").value;
let glassThickness=document.getElementById("glassThickness").value;
let glassColour=document.getElementById("glassColour").value;

let setting = rates.find(r =>

r.company === company &&
r.series === series &&
r.aluThickness === aluThickness &&
r.glassCompany === glassCompany &&
r.glassThickness === glassThickness &&
r.glassColour === glassColour

);

r.company==company &&
r.series==series &&
r.aluThickness==aluThickness &&
r.glassCompany==glassCompany &&
r.glassThickness==glassThickness &&
r.glassColour==glassColour

);

if(!setting){

alert("Rate Not Found");

return;

}

let width=parseFloat(document.getElementById("width").value)||0;
let height=parseFloat(document.getElementById("height").value)||0;
let qty=parseInt(document.getElementById("qty").value)||1;

let glass=((width*height)/144)*qty;

// Aluminium

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

// Cost

let aluminiumCost=
totalAluminium*setting.aluRate;

let glassCost=
glass*setting.glassRate;

let hardwareCost=
glass*setting.hardwareRate;

let fittingsCost=
glass*setting.fittingsRate;

let labourCost=
glass*setting.labourRate;

let materialCost=

aluminiumCost+
glassCost+
hardwareCost+
fittingsCost+
labourCost;

let costPerSqft=0;

if(glass>0){

costPerSqft=
materialCost/glass;

}

let sellingPrice=

materialCost+

(materialCost*setting.profit/100);

// Result

document.getElementById("outerSide").innerHTML=
outerSide.toFixed(2)+" ft";

document.getElementById("outerTop").innerHTML=
outerTop.toFixed(2)+" ft";

document.getElementById("outerBottom").innerHTML=
outerBottom.toFixed(2)+" ft";

document.getElementById("shutterLock").innerHTML=
shutterLock.toFixed(2)+" ft";

document.getElementById("shutterInterlock").innerHTML=
shutterInterlock.toFixed(2)+" ft";

document.getElementById("shutterTop").innerHTML=
shutterTop.toFixed(2)+" ft";

document.getElementById("shutterBottom").innerHTML=
shutterBottom.toFixed(2)+" ft";

document.getElementById("totalAluminium").innerHTML=
totalAluminium.toFixed(2)+" ft";

document.getElementById("glass").innerHTML=
glass.toFixed(2)+" Sqft";

document.getElementById("hardwareCost").innerHTML=
hardwareCost.toFixed(2)+" ৳";

document.getElementById("fittingsCost").innerHTML=
fittingsCost.toFixed(2)+" ৳";

document.getElementById("labourCost").innerHTML=
labourCost.toFixed(2)+" ৳";

document.getElementById("materialCost").innerHTML=
materialCost.toFixed(2)+" ৳";

document.getElementById("costPerSqft").innerHTML=
costPerSqft.toFixed(2)+" ৳";

document.getElementById("sellingPrice").innerHTML=
sellingPrice.toFixed(2)+" ৳";

}
