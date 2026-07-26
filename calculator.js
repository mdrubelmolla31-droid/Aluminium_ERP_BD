// =====================================
// MATERIAL CALCULATOR
// calculator.js
// =====================================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

// ---------- Load ----------
document.addEventListener("DOMContentLoaded", () => {
    loadDropdowns();
});

// ---------- Load Dropdown ----------
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
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Select</option>`;

    const values = [...new Set(
        rates
            .map(r => r[key])
            .filter(v => v && v.trim() !== "")
    )];

    values.forEach(v => {
        const option = document.createElement("option");
        option.value = v;
        option.textContent = v;
        select.appendChild(option);
    });
}

// =====================================
// CALCULATE MATERIAL
// =====================================

function calculateMaterial() {
    rates = JSON.parse(localStorage.getItem("rates")) || [];

    let company = document.getElementById("company") ? document.getElementById("company").value : "";
    let series = document.getElementById("series") ? document.getElementById("series").value : "";
    let aluThickness = document.getElementById("aluThickness") ? document.getElementById("aluThickness").value : "";
    let aluColour = document.getElementById("aluColour") ? document.getElementById("aluColour").value : "";
    let glassCompany = document.getElementById("glassCompany") ? document.getElementById("glassCompany").value : "";
    let glassThickness = document.getElementById("glassThickness") ? document.getElementById("glassThickness").value : "";
    let glassColour = document.getElementById("glassColour") ? document.getElementById("glassColour").value : "";

    let setting = rates.find(r =>
        r.company === company &&
        r.series === series &&
        r.aluThickness === aluThickness &&
        r.aluColour === aluColour &&
        r.glassCompany === glassCompany &&
        r.glassThickness === glassThickness &&
        r.glassColour === glassColour
    );

    if (!setting) {
        alert("Rate Not Found");
        return;
    }

    // Inputs Reading
    let width = parseFloat(document.getElementById("width")?.value) || 0;
    let height = parseFloat(document.getElementById("height")?.value) || 0;
    let qty = parseInt(document.getElementById("qty")?.value) || 0;

    let width2 = parseFloat(document.getElementById("width2")?.value) || 0;
    let height2 = parseFloat(document.getElementById("height2")?.value) || 0;
    let qty2 = parseInt(document.getElementById("qty2")?.value) || 0;

    let width3 = parseFloat(document.getElementById("width3")?.value) || 0;
    let height3 = parseFloat(document.getElementById("height3")?.value) || 0;
    let qty3 = parseInt(document.getElementById("qty3")?.value) || 0;

    let width4 = parseFloat(document.getElementById("width4")?.value) || 0;
    let height4 = parseFloat(document.getElementById("height4")?.value) || 0;
    let qty4 = parseInt(document.getElementById("qty4")?.value) || 0;

    let width5 = parseFloat(document.getElementById("width5")?.value) || 0;
    let height5 = parseFloat(document.getElementById("height5")?.value) || 0;
    let qty5 = parseInt(document.getElementById("qty5")?.value) || 0;

    // Window-1
    let outerSide = ((height * 2) / 12) * qty;
    let outerTop = (width / 12) * qty;
    let outerBottom = (width / 12) * qty;
    let shutterLock = ((height * 2) / 12) * qty;
    let shutterInterlock = ((height * 2) / 12) * qty;
    let shutterTop = (width / 12) * qty;
    let shutterBottom = (width / 12) * qty;
    let totalAluminium = outerSide + outerTop + outerBottom + shutterLock + shutterInterlock + shutterTop + shutterBottom;
    let glass = ((width * height) / 144) * qty;

    // Window-2
    let outerSide2 = ((height2 * 2) / 12) * qty2;
    let outerTop2 = (width2 / 12) * qty2;
    let outerBottom2 = (width2 / 12) * qty2;
    let shutterLock2 = ((height2 * 2) / 12) * qty2;
    let shutterInterlock2 = ((height2 * 2) / 12) * qty2;
    let shutterTop2 = (width2 / 12) * qty2;
    let shutterBottom2 = (width2 / 12) * qty2;
    let totalAluminium2 = outerSide2 + outerTop2 + outerBottom2 + shutterLock2 + shutterInterlock2 + shutterTop2 + shutterBottom2;
    let glass2 = ((width2 * height2) / 144) * qty2;

    // Window-3
    let outerSide3 = ((height3 * 2) / 12) * qty3;
    let outerTop3 = (width3 / 12) * qty3;
    let outerBottom3 = (width3 / 12) * qty3;
    let shutterLock3 = ((height3 * 2) / 12) * qty3;
    let shutterInterlock3 = ((height3 * 2) / 12) * qty3;
    let shutterTop3 = (width3 / 12) * qty3;
    let shutterBottom3 = (width3 / 12) * qty3;
    let totalAluminium3 = outerSide3 + outerTop3 + outerBottom3 + shutterLock3 + shutterInterlock3 + shutterTop3 + shutterBottom3;
    let glass3 = ((width3 * height3) / 144) * qty3;

    // Window-4
    let outerSide4 = ((height4 * 2) / 12) * qty4;
    let outerTop4 = (width4 / 12) * qty4;
    let outerBottom4 = (width4 / 12) * qty4;
    let shutterLock4 = ((height4 * 2) / 12) * qty4;
    let shutterInterlock4 = ((height4 * 2) / 12) * qty4;
    let shutterTop4 = (width4 / 12) * qty4;
    let shutterBottom4 = (width4 / 12) * qty4;
    let totalAluminium4 = outerSide4 + outerTop4 + outerBottom4 + shutterLock4 + shutterInterlock4 + shutterTop4 + shutterBottom4;
    let glass4 = ((width4 * height4) / 144) * qty4;

    // Window-5
    let outerSide5 = ((height5 * 2) / 12) * qty5;
    let outerTop5 = (width5 / 12) * qty5;
    let outerBottom5 = (width5 / 12) * qty5;
    let shutterLock5 = ((height5 * 2) / 12) * qty5;
    let shutterInterlock5 = ((height5 * 2) / 12) * qty5;
    let shutterTop5 = (width5 / 12) * qty5;
    let shutterBottom5 = (width5 / 12) * qty5;
    let totalAluminium5 = outerSide5 + outerTop5 + outerBottom5 + shutterLock5 + shutterInterlock5 + shutterTop5 + shutterBottom5;
    let glass5 = ((width5 * height5) / 144) * qty5;

    // Totals
    let totalOuterSide = outerSide + outerSide2 + outerSide3 + outerSide4 + outerSide5;
    let totalOuterTop = outerTop + outerTop2 + outerTop3 + outerTop4 + outerTop5;
    let totalOuterBottom = outerBottom + outerBottom2 + outerBottom3 + outerBottom4 + outerBottom5;
    let totalShutterLock = shutterLock + shutterLock2 + shutterLock3 + shutterLock4 + shutterLock5;
    let totalShutterInterlock = shutterInterlock + shutterInterlock2 + shutterInterlock3 + shutterInterlock4 + shutterInterlock5;
    let totalShutterTop = shutterTop + shutterTop2 + shutterTop3 + shutterTop4 + shutterTop5;
    let totalShutterBottom = shutterBottom + shutterBottom2 + shutterBottom3 + shutterBottom4 + shutterBottom5;

    let grandTotalAluminium = totalAluminium + totalAluminium2 + totalAluminium3 + totalAluminium4 + totalAluminium5;
    let totalGlass = glass + glass2 + glass3 + glass4 + glass5;

    // Cost Calculation
    let aluminiumCost = grandTotalAluminium * setting.aluRate;
    let glassCost = totalGlass * setting.glassRate;
    let hardwareCost = totalGlass * setting.hardwareRate;
    let fittingsCost = totalGlass * setting.fittingsRate;
    let labourCost = totalGlass * setting.labourRate;

    let materialCost = aluminiumCost + glassCost + hardwareCost + fittingsCost + labourCost;
    let profitAmount = materialCost * (setting.profit || 0) / 100;
    let sellingPrice = materialCost + profitAmount;

    let materialSqft = totalGlass > 0 ? materialCost / totalGlass : 0;
    let sellingSqft = totalGlass > 0 ? sellingPrice / totalGlass : 0;
    let profitSqft = totalGlass > 0 ? profitAmount / totalGlass : 0;

    // UI Updates
    if (document.getElementById("outerSide")) document.getElementById("outerSide").innerText = totalOuterSide.toFixed(2) + " ft";
    if (document.getElementById("outerTop")) document.getElementById("outerTop").innerText = totalOuterTop.toFixed(2) + " ft";
    if (document.getElementById("outerBottom")) document.getElementById("outerBottom").innerText = totalOuterBottom.toFixed(2) + " ft";
    if (document.getElementById("shutterLock")) document.getElementById("shutterLock").innerText = totalShutterLock.toFixed(2) + " ft";
    if (document.getElementById("shutterInterlock")) document.getElementById("shutterInterlock").innerText = totalShutterInterlock.toFixed(2) + " ft";
    if (document.getElementById("shutterTop")) document.getElementById("shutterTop").innerText = totalShutterTop.toFixed(2) + " ft";
    if (document.getElementById("shutterBottom")) document.getElementById("shutterBottom").innerText = totalShutterBottom.toFixed(2) + " ft";

    if (document.getElementById("totalAluminium")) document.getElementById("totalAluminium").innerText = grandTotalAluminium.toFixed(2) + " ft";
    if (document.getElementById("glass")) document.getElementById("glass").innerText = totalGlass.toFixed(2) + " Sqft";

    if (document.getElementById("hardwareCost")) document.getElementById("hardwareCost").innerText = hardwareCost.toFixed(2);
    if (document.getElementById("fittingsCost")) document.getElementById("fittingsCost").innerText = fittingsCost.toFixed(2);
    if (document.getElementById("labourCost")) document.getElementById("labourCost").innerText = labourCost.toFixed(2);
    if (document.getElementById("materialCost")) document.getElementById("materialCost").innerText = materialCost.toFixed(2);
    if (document.getElementById("materialSqft")) document.getElementById("materialSqft").innerText = materialSqft.toFixed(2);
    if (document.getElementById("sellingSqft")) document.getElementById("sellingSqft").innerText = sellingSqft.toFixed(2);
    if (document.getElementById("profitSqft")) document.getElementById("profitSqft").innerText = profitSqft.toFixed(2);
    if (document.getElementById("sellingPrice")) document.getElementById("sellingPrice").innerText = sellingPrice.toFixed(2);
}

// ============================
// OPEN QUOTATION
// ============================

function openQuotation() {
    let quotation = {
        customerName: document.getElementById("customerName")?.value || "",
        mobile: document.getElementById("mobile")?.value || "",
        address: document.getElementById("address")?.value || "",

        company: document.getElementById("company")?.value || "",
        series: document.getElementById("series")?.value || "",
        aluThickness: document.getElementById("aluThickness")?.value || "",
        glassCompany: document.getElementById("glassCompany")?.value || "",
        glassThickness: document.getElementById("glassThickness")?.value || "",
        glassColour: document.getElementById("glassColour")?.value || "",

        width: document.getElementById("width")?.value || 0,
        height: document.getElementById("height")?.value || 0,
        qty: document.getElementById("qty")?.value || 0,

        width2: document.getElementById("width2")?.value || 0,
        height2: document.getElementById("height2")?.value || 0,
        qty2: document.getElementById("qty2")?.value || 0,

        width3: document.getElementById("width3")?.value || 0,
        height3: document.getElementById("height3")?.value || 0,
        qty3: document.getElementById("qty3")?.value || 0,

        width4: document.getElementById("width4")?.value || 0,
        height4: document.getElementById("height4")?.value || 0,
        qty4: document.getElementById("qty4")?.value || 0,

        width5: document.getElementById("width5")?.value || 0,
        height5: document.getElementById("height5")?.value || 0,
        qty5: document.getElementById("qty5")?.value || 0,

        outerSide: document.getElementById("outerSide")?.innerText || "",
        outerTop: document.getElementById("outerTop")?.innerText || "",
        outerBottom: document.getElementById("outerBottom")?.innerText || "",

        shutterLock: document.getElementById("shutterLock")?.innerText || "",
        shutterInterlock: document.getElementById("shutterInterlock")?.innerText || "",
        shutterTop: document.getElementById("shutterTop")?.innerText || "",
        shutterBottom: document.getElementById("shutterBottom")?.innerText || "",

        totalAluminium: document.getElementById("totalAluminium")?.innerText || "",
        glass: document.getElementById("glass")?.innerText || "",

        hardwareCost: document.getElementById("hardwareCost")?.innerText || "",
        fittingsCost: document.getElementById("fittingsCost")?.innerText || "",
        labourCost: document.getElementById("labourCost")?.innerText || "",

        materialCost: document.getElementById("materialCost")?.innerText || "",
        materialSqft: document.getElementById("materialSqft")?.innerText || "",
        sellingSqft: document.getElementById("sellingSqft")?.innerText || "",
        profitSqft: document.getElementById("profitSqft")?.innerText || "",
        sellingPrice: document.getElementById("sellingPrice")?.innerText || ""
    };

    localStorage.setItem("quotation", JSON.stringify(quotation));
    window.location.href = "quotation.html";
}
