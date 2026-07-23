// ============================
// Material Calculator V2
// ============================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

document.addEventListener("DOMContentLoaded", () => {

    loadDropdowns();

});

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

    if(!select) return;

    select.innerHTML="<option value=''>Select</option>";

    let values=[...new Set(

        rates
        .map(r=>r[key])
        .filter(v=>v)

    )];

    values.forEach(v=>{

        let op=document.createElement("option");

        op.value=v;
        op.textContent=v;

        select.appendChild(op);

    });

    // ============================
// CALCULATE MATERIAL
// ============================

function calculateMaterial(){

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    let company=document.getElementById("company").value;
    let series=document.getElementById("series").value;
    let aluThickness=document.getElementById("aluThickness").value;
    let glassCompany=document.getElementById("glassCompany").value;
    let glassThickness=document.getElementById("glassThickness").value;
    let glassColour=document.getElementById("glassColour").value;

    let setting=rates.find(r=>

        r.company===company &&
        r.series===series &&
        r.aluThickness===aluThickness &&
        r.glassCompany===glassCompany &&
        r.glassThickness===glassThickness &&
        r.glassColour===glassColour

    );

    if(!setting){

        alert("Rate Not Found");
        return;

    }

    let width=parseFloat(document.getElementById("width").value)||0;
    let height=parseFloat(document.getElementById("height").value)||0;
    let qty=parseInt(document.getElementById("qty").value)||0;

    let width2=parseFloat(document.getElementById("width2").value)||0;
    let height2=parseFloat(document.getElementById("height2").value)||0;
    let qty2=parseInt(document.getElementById("qty2").value)||0;

    let width3=parseFloat(document.getElementById("width3").value)||0;
    let height3=parseFloat(document.getElementById("height3").value)||0;
    let qty3=parseInt(document.getElementById("qty3").value)||0;

        // =========================
    // WINDOW-1
    // =========================

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

    let glass = ((width * height) / 144) * qty;


    // =========================
    // WINDOW-2
    // =========================

    let outerSide2 = ((height2 * 2) / 12) * qty2;
    let outerTop2 = (width2 / 12) * qty2;
    let outerBottom2 = (width2 / 12) * qty2;

    let shutterLock2 = ((height2 * 2) / 12) * qty2;
    let shutterInterlock2 = ((height2 * 2) / 12) * qty2;

    let shutterTop2 = (width2 / 12) * qty2;
    let shutterBottom2 = (width2 / 12) * qty2;

    let totalAluminium2 =
        outerSide2 +
        outerTop2 +
        outerBottom2 +
        shutterLock2 +
        shutterInterlock2 +
        shutterTop2 +
        shutterBottom2;

    let glass2 = ((width2 * height2) / 144) * qty2;


    // =========================
    // WINDOW-3
    // =========================

    let outerSide3 = ((height3 * 2) / 12) * qty3;
    let outerTop3 = (width3 / 12) * qty3;
    let outerBottom3 = (width3 / 12) * qty3;

    let shutterLock3 = ((height3 * 2) / 12) * qty3;
    let shutterInterlock3 = ((height3 * 2) / 12) * qty3;

    let shutterTop3 = (width3 / 12) * qty3;
    let shutterBottom3 = (width3 / 12) * qty3;

    let totalAluminium3 =
        outerSide3 +
        outerTop3 +
        outerBottom3 +
        shutterLock3 +
        shutterInterlock3 +
        shutterTop3 +
        shutterBottom3;

    let glass3 = ((width3 * height3) / 144) * qty3;


    // =========================
    // GRAND TOTAL
    // =========================

    let grandTotalAluminium =
        totalAluminium +
        totalAluminium2 +
        totalAluminium3;

    let totalGlass =
        glass +
        glass2 +
        glass3;
        // =========================
    // COST CALCULATION
    // =========================

    // Aluminium Rate (Sqft অনুযায়ী)
    let aluminiumCost = totalGlass * setting.aluRate;

    let glassCost = totalGlass * setting.glassRate;

    let hardwareCost = totalGlass * setting.hardwareRate;

    let fittingsCost = totalGlass * setting.fittingsRate;

    let labourCost = totalGlass * setting.labourRate;

    let materialCost =
        aluminiumCost +
        glassCost +
        hardwareCost +
        fittingsCost +
        labourCost;

    let costPerSqft = 0;

    if (totalGlass > 0) {

        costPerSqft = materialCost / totalGlass;

    }

    // Profit (%)
    let profitAmount =
        materialCost * setting.profit / 100;

    let sellingPrice =
        materialCost + profitAmount;

    let materialSqft = 0;
    let sellingSqft = 0;
    let profitSqft = 0;
    
let materialSqft = 0;
let sellingSqft = 0;
let profitSqft = 0;

// =========================
// 18.6ft & 21ft Piece Count
// =========================

let piece186 = 0;
let piece21 = 0;

function countPiece(height, qty) {

    if (height <= 0 || qty <= 0) return;

    if (height >= 60) {
        piece21 += qty;
    } else {
        piece186 += qty;
    }

}

countPiece(height, qty);
countPiece(height2, qty2);
countPiece(height3, qty3);
    if (totalGlass > 0) {

        materialSqft = materialCost / totalGlass;

        sellingSqft = sellingPrice / totalGlass;

        profitSqft = profitAmount / totalGlass;

    }

}

    // =========================
    // RESULT
    // =========================

    document.getElementById("outerSide").innerHTML =
        (outerSide + outerSide2 + outerSide3).toFixed(2) + " ft";

    document.getElementById("outerTop").innerHTML =
        (outerTop + outerTop2 + outerTop3).toFixed(2) + " ft";

    document.getElementById("outerBottom").innerHTML =
        (outerBottom + outerBottom2 + outerBottom3).toFixed(2) + " ft";

    document.getElementById("shutterLock").innerHTML =
        (shutterLock + shutterLock2 + shutterLock3).toFixed(2) + " ft";

    document.getElementById("shutterInterlock").innerHTML =
        (shutterInterlock + shutterInterlock2 + shutterInterlock3).toFixed(2) + " ft";

    document.getElementById("shutterTop").innerHTML =
        (shutterTop + shutterTop2 + shutterTop3).toFixed(2) + " ft";

    document.getElementById("shutterBottom").innerHTML =
        (shutterBottom + shutterBottom2 + shutterBottom3).toFixed(2) + " ft";

    document.getElementById("totalAluminium").innerHTML =
        grandTotalAluminium.toFixed(2) + " ft";

    document.getElementById("glass").innerHTML =
        totalGlass.toFixed(2) + " Sqft";

    document.getElementById("hardwareCost").innerHTML =
        hardwareCost.toFixed(2) + " ৳";

    document.getElementById("fittingsCost").innerHTML =
        fittingsCost.toFixed(2) + " ৳";

    document.getElementById("labourCost").innerHTML =
        labourCost.toFixed(2) + " ৳";

    document.getElementById("materialCost").innerHTML =
        materialCost.toFixed(2) + " ৳";

    document.getElementById("materialSqft").innerHTML =
        materialSqft.toFixed(2) + " ৳";

    document.getElementById("sellingSqft").innerHTML =
        sellingSqft.toFixed(2) + " ৳";

    document.getElementById("profitSqft").innerHTML =
        profitSqft.toFixed(2) + " ৳";

    document.getElementById("costPerSqft").innerHTML =
        costPerSqft.toFixed(2) + " ৳";

    document.getElementById("sellingPrice").innerHTML =
        sellingPrice.toFixed(2) + " ৳";

    alert("Calculation Completed");

}
