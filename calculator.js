let rates = JSON.parse(localStorage.getItem("rates")) || [];

window.onload = function () {

    loadDropdowns();

};

function loadDropdowns(){

rates = JSON.parse(localStorage.getItem("rates")) || [];

fillSelect("company","company");

fillSelect("series","series");

fillSelect("aluThickness","aluThickness");

fillSelect("glassCompany","glassCompany");

fillSelect("glassThickness","glassThickness");

fillSelect("glassColour","glassColour");

document.getElementById("company").selectedIndex=0;

document.getElementById("series").selectedIndex=0;

document.getElementById("aluThickness").selectedIndex=0;

document.getElementById("glassCompany").selectedIndex=0;

document.getElementById("glassThickness").selectedIndex=0;

document.getElementById("glassColour").selectedIndex=0;

}

function fillSelect(id,key){

let select=document.getElementById(id);

let oldValue=select.value;

select.innerHTML="";

let values=[...new Set(rates.map(r=>r[key]).filter(Boolean))];

values.forEach(v=>{

let option=document.createElement("option");

option.value=v;

option.textContent=v;

select.appendChild(option);

});

if(values.includes(oldValue)){

select.value=oldValue;

}

}
    values.forEach(v => {

        if (v != undefined) {

            select.innerHTML += `<option value="${v}">${v}</option>`;

        }

    });

}

function calculateMaterial() {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    let company = document.getElementById("company").value;
    let series = document.getElementById("series").value;
    let aluThickness = document.getElementById("aluThickness").value;
    let glassCompany = document.getElementById("glassCompany").value;
    let glassThickness = document.getElementById("glassThickness").value;
    let glassColour = document.getElementById("glassColour").value;
    
let setting = rates.find(r =>
    r.company === company
);
    if (!setting) {

        alert("Rate Not Found");

        return;

    }

    let width = parseFloat(document.getElementById("width").value) || 0;
    let height = parseFloat(document.getElementById("height").value) || 0;
    let qty = parseInt(document.getElementById("qty").value) || 1;
      // ===== Aluminium =====

    let outerSide = ((height * 2) / 12) * qty;

    let outerTop = (width / 12) * qty;

    let outerBottom = (width / 12) * qty;

    let shutterLock = ((height * 2) / 12) * qty;

    let shutterInterlock = ((height * 2) / 12) * qty;

    let shutterTop = (width / 12) * qty;

    let shutterBottom = (width / 12) * qty;

    let totalAluminium =

        outerSide +
        outerTop +
        outerBottom +
        shutterLock +
        shutterInterlock +
        shutterTop +
        shutterBottom;

    // ===== Glass =====

    let glass = ((width * height) / 144) * qty;

    // ===== Cost =====

    let aluminiumCost = totalAluminium * setting.aluRate;

    let glassCost = glass * setting.glassRate;

    let hardwareCost = glass * setting.hardwareRate;

    let fittingsCost = glass * setting.fittingsRate;

    let labourCost = glass * setting.labourRate;

    let materialCost =

        aluminiumCost +
        glassCost +
        hardwareCost +
        fittingsCost +
        labourCost;

    let costPerSqft = 0;

    if (glass > 0) {

        costPerSqft = materialCost / glass;

    }

    let profitAmount =

        materialCost * setting.profit / 100;

    let sellingPrice =

        materialCost + profitAmount;

    let sqft=((width*height)/144)*qty;

let materialSqft=0;
let sellingSqft=0;
let profitSqft=0;

if(sqft>0){

materialSqft=materialCost/sqft;

sellingSqft=sellingPrice/sqft;

profitSqft=profitAmount/sqft;

}

      // ===== Result =====

    document.getElementById("outerSide").innerHTML =
        outerSide.toFixed(2) + " ft";

    document.getElementById("outerTop").innerHTML =
        outerTop.toFixed(2) + " ft";

    document.getElementById("outerBottom").innerHTML =
        outerBottom.toFixed(2) + " ft";

    document.getElementById("shutterLock").innerHTML =
        shutterLock.toFixed(2) + " ft";

    document.getElementById("shutterInterlock").innerHTML =
        shutterInterlock.toFixed(2) + " ft";

    document.getElementById("shutterTop").innerHTML =
        shutterTop.toFixed(2) + " ft";

    document.getElementById("shutterBottom").innerHTML =
        shutterBottom.toFixed(2) + " ft";

    document.getElementById("totalAluminium").innerHTML =
        totalAluminium.toFixed(2) + " ft";

    document.getElementById("glass").innerHTML =
        glass.toFixed(2) + " Sqft";

    document.getElementById("hardwareCost").innerHTML =
        hardwareCost.toFixed(2) + " ৳";

    document.getElementById("fittingsCost").innerHTML =
        fittingsCost.toFixed(2) + " ৳";

    document.getElementById("labourCost").innerHTML =
        labourCost.toFixed(2) + " ৳";

    document.getElementById("materialCost").innerHTML =
        materialCost.toFixed(2) + " ৳";

    document.getElementById("costPerSqft").innerHTML =
        costPerSqft.toFixed(2) + " ৳";

    document.getElementById("sellingPrice").innerHTML =
        sellingPrice.toFixed(2) + " ৳";

    document.getElementById("materialSqft").innerHTML =
materialSqft.toFixed(2)+" ৳";

document.getElementById("sellingSqft").innerHTML =
sellingSqft.toFixed(2)+" ৳";

document.getElementById("profitSqft").innerHTML =
profitSqft.toFixed(2)+" ৳";
    
alert(materialSqft+" | "+sellingSqft+" | "+profitSqft);

    // ===== Save Quotation =====

    let quotation = {

        customerName: document.getElementById("customerName").value,

        mobile: document.getElementById("mobile").value,

        address: document.getElementById("address").value,

        company: company,

        series: series,

        aluThickness: aluThickness,

        glassCompany: glassCompany,

        glassThickness: glassThickness,

        glassColour: glassColour,

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

        totalAluminium: totalAluminium,

        glass: glass,

        aluminiumCost: aluminiumCost,

        glassCost: glassCost,

        hardwareCost: hardwareCost,

        fittingsCost: fittingsCost,

        labourCost: labourCost,

        materialCost: materialCost,

        costPerSqft: costPerSqft,

        profit: profitAmount,

        sellingPrice: sellingPrice

    };

    localStorage.setItem(
        "quotation",
        JSON.stringify(quotation)
    );
      alert("Calculation Completed");

}

function openQuotation(){

let q=localStorage.getItem("quotation");

if(!q){

alert("আগে Calculate করুন");

return;

}

window.location.href="quotation.html";

}

// ===== END =====
