// ============================
// Material Calculator
// ============================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

alert("Rates Count = " + rates.length);

document.addEventListener("DOMContentLoaded", function () {

    loadDropdowns();

});

// ============================
// LOAD DROPDOWNS
// ============================

function loadDropdowns() {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    fillSelect("company", "company");
    fillSelect("series", "series");
    fillSelect("aluThickness", "aluThickness");
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");

}

function fillSelect(id, key) {

    let select = document.getElementById(id);

    select.innerHTML = '<option value="">Select</option>';

    let values = [...new Set(

        rates
        .map(r => r[key])
        .filter(v => v && v.trim() !== "")

    )];

    values.forEach(function (v) {

        let option = document.createElement("option");

        option.value = v;
        option.textContent = v;

        select.appendChild(option);

    });

}
// ============================
// CALCULATE MATERIAL
// ============================

function calculateMaterial() {
alert("Calculate Button Pressed");
    rates = JSON.parse(localStorage.getItem("rates")) || [];
alert("Rates Count = " + rates.length);

alert(company);

alert(JSON.stringify(rates));
    let company = document.getElementById("company").value;
    let series = document.getElementById("series").value;
    let aluThickness = document.getElementById("aluThickness").value;
    let glassCompany = document.getElementById("glassCompany").value;
    let glassThickness = document.getElementById("glassThickness").value;
    let glassColour = document.getElementById("glassColour").value;

    
        
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

    // ===== Window-1 =====

    let width = parseFloat(document.getElementById("width").value) || 0;
    let height = parseFloat(document.getElementById("height").value) || 0;
    let qty = parseInt(document.getElementById("qty").value) || 1;

    // ===== Window-2 =====

    let width2 = parseFloat(document.getElementById("width2").value) || 0;
    let height2 = parseFloat(document.getElementById("height2").value) || 0;
    let qty2 = parseInt(document.getElementById("qty2").value) || 0;

    // ===== Window-3 =====

    let width3 = parseFloat(document.getElementById("width3").value) || 0;
    let height3 = parseFloat(document.getElementById("height3").value) || 0;
    let qty3 = parseInt(document.getElementById("qty3").value) || 0;

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

    // Aluminium Rate এখন Sqft অনুযায়ী
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

    let profitAmount =
        materialCost * setting.profit / 100;

    let sellingPrice =
        materialCost + profitAmount;

    let materialSqft = 0;
    let sellingSqft = 0;
    let profitSqft = 0;

    if (totalGlass > 0) {

        materialSqft = materialCost / totalGlass;

        sellingSqft = sellingPrice / totalGlass;

        profitSqft = profitAmount / totalGlass;

    }
    
    // =========================
    // RESULT
    // =========================

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

// ============================
// OPEN QUOTATION
// ============================

function openQuotation() {

    let quotation = {

        customerName: document.getElementById("customerName").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,

        company: document.getElementById("company").value,
        series: document.getElementById("series").value,
        aluThickness: document.getElementById("aluThickness").value,
        glassCompany: document.getElementById("glassCompany").value,
        glassThickness: document.getElementById("glassThickness").value,
        glassColour: document.getElementById("glassColour").value,

        outerSide: document.getElementById("outerSide").innerText,
        outerTop: document.getElementById("outerTop").innerText,
        outerBottom: document.getElementById("outerBottom").innerText,
        shutterLock: document.getElementById("shutterLock").innerText,
        shutterInterlock: document.getElementById("shutterInterlock").innerText,
        shutterTop: document.getElementById("shutterTop").innerText,
        shutterBottom: document.getElementById("shutterBottom").innerText,

        totalAluminium: document.getElementById("totalAluminium").innerText,
        glass: document.getElementById("glass").innerText,

        hardwareCost: document.getElementById("hardwareCost").innerText,
        fittingsCost: document.getElementById("fittingsCost").innerText,
        labourCost: document.getElementById("labourCost").innerText,

        materialCost: document.getElementById("materialCost").innerText,
        materialSqft: document.getElementById("materialSqft").innerText,
        sellingSqft: document.getElementById("sellingSqft").innerText,
        profitSqft: document.getElementById("profitSqft").innerText,
        costPerSqft: document.getElementById("costPerSqft").innerText,
        sellingPrice: document.getElementById("sellingPrice").innerText

    };

    localStorage.setItem("quotation", JSON.stringify(quotation));

    window.location.href = "quotation.html";

}
