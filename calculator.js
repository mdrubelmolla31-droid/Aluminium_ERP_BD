// =====================================
// MATERIAL CALCULATOR
// calculator.js
// PART-1
// =====================================

// ---------- Load Rate Data ----------

let rates = JSON.parse(localStorage.getItem("rates")) || [];

// ---------- Page Load ----------

document.addEventListener("DOMContentLoaded", function () {

    loadDropdowns();

});

// ---------- Dropdown ----------

function loadDropdowns() {

    rates = JSON.parse(localStorage.getItem("rates")) || [];

    fillSelect("company", "company");
    fillSelect("series", "series");
    fillSelect("aluThickness", "aluThickness");
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");

}

// ---------- Fill Select ----------

function fillSelect(id, key) {

    let select = document.getElementById(id);

    if (!select) return;

    select.innerHTML = '<option value="">Select</option>';

    let values = [

        ...new Set(

            rates
                .map(r => r[key])
                .filter(v => v && v.trim() !== "")

        )

    ];

    values.forEach(function (v) {

        let option = document.createElement("option");

        option.value = v;
        option.textContent = v;

        select.appendChild(option);

    });

}

// =====================================
// CALCULATE
// =====================================

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
        // =========================
    // WINDOW-1 INPUT
    // =========================

    let width = parseFloat(document.getElementById("width").value) || 0;
    let height = parseFloat(document.getElementById("height").value) || 0;
    let qty = parseInt(document.getElementById("qty").value) || 1;

    // =========================
    // WINDOW-2 INPUT
    // =========================

    let width2 = parseFloat(document.getElementById("width2").value) || 0;
    let height2 = parseFloat(document.getElementById("height2").value) || 0;
    let qty2 = parseInt(document.getElementById("qty2").value) || 0;

    // =========================
    // WINDOW-3 INPUT
    // =========================

    let width3 = parseFloat(document.getElementById("width3").value) || 0;
    let height3 = parseFloat(document.getElementById("height3").value) || 0;
    let qty3 = parseInt(document.getElementById("qty3").value) || 0;

    // =========================
    // WINDOW-1 ALUMINIUM
    // =========================
    // =========================
// CUTTING REPORT COUNT
// =========================

let outerSide186 = 0;
let outerSide21 = 0;

let outerTop186 = 0;
let outerTop21 = 0;

let outerBottom186 = 0;
let outerBottom21 = 0;

let shutterLock186 = 0;
let shutterLock21 = 0;

let shutterInterlock186 = 0;
let shutterInterlock21 = 0;

let shutterTop186 = 0;
let shutterTop21 = 0;

let shutterBottom186 = 0;
let shutterBottom21 = 0;
piece186 = 0;
piece21 = 0;

countPiece(height, qty);
    let outerSide =
        ((height * 2) / 12) * qty;

    let outerTop =
        (width / 12) * qty;

    let outerBottom =
        (width / 12) * qty;

    let shutterLock =
        ((height * 2) / 12) * qty;

    let shutterInterlock =
        ((height * 2) / 12) * qty;

    let shutterTop =
        (width / 12) * qty;

    let shutterBottom =
        (width / 12) * qty;

    let totalAluminium =

        outerSide +
        outerTop +
        outerBottom +
        shutterLock +
        shutterInterlock +
        shutterTop +
        shutterBottom;

    let glass =
        ((width * height) / 144) * qty;
    // ===== WINDOW-1 CUTTING =====

if (height >= 5) {

    outerSide21 += 2 * qty;
    shutterLock21 += qty;
    shutterInterlock21 += qty;

} else {

    outerSide186 += 2 * qty;
    shutterLock186 += qty;
    shutterInterlock186 += qty;

}

outerTop186 += qty;
outerBottom186 += qty;
shutterTop186 += qty;
shutterBottom186 += qty;
        // =========================
    // WINDOW-2 ALUMINIUM
    // =========================
countPiece(height2, qty2);
    let outerSide2 =
        ((height2 * 2) / 12) * qty2;

    let outerTop2 =
        (width2 / 12) * qty2;

    let outerBottom2 =
        (width2 / 12) * qty2;

    let shutterLock2 =
        ((height2 * 2) / 12) * qty2;

    let shutterInterlock2 =
        ((height2 * 2) / 12) * qty2;

    let shutterTop2 =
        (width2 / 12) * qty2;

    let shutterBottom2 =
        (width2 / 12) * qty2;

    let totalAluminium2 =

        outerSide2 +
        outerTop2 +
        outerBottom2 +
        shutterLock2 +
        shutterInterlock2 +
        shutterTop2 +
        shutterBottom2;

    let glass2 =
        ((width2 * height2) / 144) * qty2;

// ===== WINDOW-2 CUTTING =====

if (height2 >= 5) {

    outerSide21 += 2 * qty2;
    shutterLock21 += qty2;
    shutterInterlock21 += qty2;

} else {

    outerSide186 += 2 * qty2;
    shutterLock186 += qty2;
    shutterInterlock186 += qty2;

}

outerTop186 += qty2;
outerBottom186 += qty2;
shutterTop186 += qty2;
shutterBottom186 += qty2;
    // =========================
    // WINDOW-3 ALUMINIUM
    // =========================
countPiece(height3, qty3);
    let outerSide3 =
        ((height3 * 2) / 12) * qty3;

    let outerTop3 =
        (width3 / 12) * qty3;

    let outerBottom3 =
        (width3 / 12) * qty3;

    let shutterLock3 =
        ((height3 * 2) / 12) * qty3;

    let shutterInterlock3 =
        ((height3 * 2) / 12) * qty3;

    let shutterTop3 =
        (width3 / 12) * qty3;

    let shutterBottom3 =
        (width3 / 12) * qty3;

    let totalAluminium3 =

        outerSide3 +
        outerTop3 +
        outerBottom3 +
        shutterLock3 +
        shutterInterlock3 +
        shutterTop3 +
        shutterBottom3;

    let glass3 =
        ((width3 * height3) / 144) * qty3;

// ===== WINDOW-3 CUTTING =====

if (height3 >= 5) {

    outerSide21 += 2 * qty3;
    shutterLock21 += qty3;
    shutterInterlock21 += qty3;

} else {

    outerSide186 += 2 * qty3;
    shutterLock186 += qty3;
    shutterInterlock186 += qty3;

}

outerTop186 += qty3;
outerBottom186 += qty3;
shutterTop186 += qty3;
shutterBottom186 += qty3;
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
// CUTTING REPORT
// =========================

let piece186 = 0;
let piece21 = 0;

function countPiece(height, qty) {

    if (height <= 0 || qty <= 0) return;
if (height >= 5) {
        piece21 += qty;
    } else {
        piece186 += qty;
    }

}


        // =========================
    // COST CALCULATION
    // =========================

    // Aluminium Cost
    let aluminiumCost =
        totalGlass * setting.aluRate;

    // Glass Cost
    let glassCost =
        totalGlass * setting.glassRate;

    // Hardware Cost
    let hardwareCost =
        totalGlass * setting.hardwareRate;

    // Fittings Cost
    let fittingsCost =
        totalGlass * setting.fittingsRate;

    // Labour Cost
    let labourCost =
        totalGlass * setting.labourRate;

    // Total Material Cost
    let materialCost =

        aluminiumCost +
        glassCost +
        hardwareCost +
        fittingsCost +
        labourCost;

    // Cost Per Sqft

    let costPerSqft = 0;

    if (totalGlass > 0) {

        costPerSqft =
            materialCost / totalGlass;

    }

    // Profit

    let profitAmount =

        materialCost *
        setting.profit / 100;

    // Selling Price

    let sellingPrice =

        materialCost +
        profitAmount;

    // Per Sqft Calculation

    let materialSqft = 0;
    let sellingSqft = 0;
    let profitSqft = 0;

    if (totalGlass > 0) {

        materialSqft =
            materialCost / totalGlass;

        sellingSqft =
            sellingPrice / totalGlass;

        profitSqft =
            profitAmount / totalGlass;

    }
    // =========================
    // RESULT SECTION
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
    // =========================
// CUTTING REPORT RESULT
// =========================

document.getElementById("outerSide186").innerHTML = outerSide186 + " pcs";
document.getElementById("outerSide21").innerHTML = outerSide21 + " pcs";

document.getElementById("outerTop186").innerHTML = outerTop186 + " pcs";
document.getElementById("outerTop21").innerHTML = outerTop21 + " pcs";

document.getElementById("outerBottom186").innerHTML = outerBottom186 + " pcs";
document.getElementById("outerBottom21").innerHTML = outerBottom21 + " pcs";

document.getElementById("shutterLock186").innerHTML = shutterLock186 + " pcs";
document.getElementById("shutterLock21").innerHTML = shutterLock21 + " pcs";

document.getElementById("shutterInterlock186").innerHTML = shutterInterlock186 + " pcs";
document.getElementById("shutterInterlock21").innerHTML = shutterInterlock21 + " pcs";

document.getElementById("shutterTop186").innerHTML = shutterTop186 + " pcs";
document.getElementById("shutterTop21").innerHTML = shutterTop21 + " pcs";

document.getElementById("shutterBottom186").innerHTML = shutterBottom186 + " pcs";
document.getElementById("shutterBottom21").innerHTML = shutterBottom21 + " pcs";
document.getElementById("stick186").innerHTML =
    piece186 + " pcs";
document.getElementById("stick21").innerHTML =
    piece21 + " pcs";
    
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

        width: document.getElementById("width").value,
        height: document.getElementById("height").value,
        qty: document.getElementById("qty").value,

        width2: document.getElementById("width2").value,
        height2: document.getElementById("height2").value,
        qty2: document.getElementById("qty2").value,

        width3: document.getElementById("width3").value,
        height3: document.getElementById("height3").value,
        qty3: document.getElementById("qty3").value,

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

