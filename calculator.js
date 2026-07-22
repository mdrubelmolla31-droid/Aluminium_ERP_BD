alert("calculator.js loaded");
let rates = JSON.parse(localStorage.getItem("rates")) || [];

window.onload = function () {
    loadDropdowns();
};

function loadDropdowns() {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    alert(JSON.stringify(rates));

    fillSelect("company","company");
    fillSelect("series","series");
    fillSelect("aluThickness","aluThickness");
    fillSelect("glassCompany","glassCompany");
    fillSelect("glassThickness","glassThickness");
    fillSelect("glassColour","glassColour");

}

function fillSelect(id, key) {

    let select = document.getElementById(id);

    select.innerHTML = '<option value="">Select</option>';

    let values = [...new Set(
        rates
        .map(r => r[key])
        .filter(v => v && v.trim() !== "")
    )];

    values.forEach(function(v){

        let option = document.createElement("option");

        option.value = v;
        option.textContent = v;

        select.appendChild(option);

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

        r.company === company &&
        r.series === series &&
        r.aluThickness === aluThickness &&
        r.glassCompany === glassCompany &&
        r.glassThickness === glassThickness &&
        r.glassColour === glassColour

    );

    if (!setting) {
        alert("Rate Not Found");
        return;
    }

    let width = parseFloat(document.getElementById("width").value) || 0;
    let height = parseFloat(document.getElementById("height").value) || 0;
    let qty = parseInt(document.getElementById("qty").value) || 1;
let width2 = parseFloat(document.getElementById("width2").value) || 0;
let height2 = parseFloat(document.getElementById("height2").value) || 0;
let qty2 = parseInt(document.getElementById("qty2").value) || 0;

let width3 = parseFloat(document.getElementById("width3").value) || 0;
let height3 = parseFloat(document.getElementById("height3").value) || 0;
let qty3 = parseInt(document.getElementById("qty3").value) || 0;
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
    
    // ===== Window 2 =====
let glass2 = ((width2 * height2) / 144) * qty2;

// ===== Window 3 =====
let glass3 = ((width3 * height3) / 144) * qty3;

// ===== Total Glass =====
let totalGlass = glass + glass2 + glass3;
    // ===== Cost =====

    let aluminiumCost = glass * setting.aluRate;

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

    let sqft = ((width * height) / 144) * qty;

    let materialSqft = 0;
    let sellingSqft = 0;
    let profitSqft = 0;

    if (sqft > 0) {

        materialSqft = materialCost / sqft;

        sellingSqft = sellingPrice / sqft;

        profitSqft = profitAmount / sqft;

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
        materialSqft: materialSqft,

        profit: profitAmount,
        profitSqft: profitSqft,

        sellingPrice: sellingPrice,
        sellingSqft: sellingSqft

    };

    localStorage.setItem("quotation", JSON.stringify(quotation));

    alert("Calculation Completed");

}

function openQuotation() {

    let q = localStorage.getItem("quotation");

    if (!q) {
        alert("আগে Calculate করুন");
        return;
    }

    window.location.href = "quotation.html";

}
