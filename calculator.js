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
    fillSelect("aluColour", "aluColour"); // Aluminium Colour Dropdown Populate
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");
}

// ---------- Fill Select ----------
function fillSelect(id, key) {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Select Option</option>`;

    // Rates Array থেকে Unique Values বের করা
    const values = [...new Set(
        rates
            .map(r => r[key])
            .filter(v => v && String(v).trim() !== "")
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

    // ফিল্টার বা ম্যাচিং চেক
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
        alert("সিলেক্ট করা ড্রপডাউন অনুযায়ী সেটিংসে (Admin Panel) কোনো Rate পাওয়া যায়নি! দয়া করে Settings থেকে Rate সেভ করুন।");
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

    // Cutting Report
    let outerSide186 = 0, outerSide21 = 0;
    let outerTop186 = 0, outerTop21 = 0;
    let outerBottom186 = 0, outerBottom21 = 0;
    let shutterLock186 = 0, shutterLock21 = 0;
    let shutterInterlock186 = 0, shutterInterlock21 = 0;
    let shutterTop186 = 0, shutterTop21 = 0;
    let shutterBottom186 = 0, shutterBottom21 = 0;

    function addCutting(h, q) {
        if (q <= 0) return;
        if (h >= 60) {
            outerSide21 += q * 2;
            shutterLock21 += q;
            shutterInterlock21 += q;
        } else {
            outerSide186 += q * 2;
            shutterLock186 += q;
            shutterInterlock186 += q;
        }
        outerTop21 += q;
        outerBottom21 += q;
        shutterTop21 += q;
        shutterBottom21 += q;
    }

    addCutting(height, qty);
    addCutting(height2, qty2);
    addCutting(height3, qty3);
    addCutting(height4, qty4);
    addCutting(height5, qty5);

    // Cost Calculation
    let aluminiumCost = grandTotalAluminium * (setting.aluRate || 0);
    let glassCost = totalGlass * (setting.glassRate || 0);
    let hardwareCost = totalGlass * (setting.hardwareRate || 0);
    let fittingsCost = totalGlass * (setting.fittingsRate || 0);
    let labourCost = totalGlass * (setting.labourRate || 0);

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

    if (document.getElementById("hardwareCost")) document.getElementById("hardwareCost").innerText = hardwareCost.toFixed(2) + " ৳";
    if (document.getElementById("fittingsCost")) document.getElementById("fittingsCost").innerText = fittingsCost.toFixed(2) + " ৳";
    if (document.getElementById("labourCost")) document.getElementById("labourCost").innerText = labourCost.toFixed(2) + " ৳";
    if (document.getElementById("materialCost")) document.getElementById("materialCost").innerText = materialCost.toFixed(2) + " ৳";
    if (document.getElementById("materialSqft")) document.getElementById("materialSqft").innerText = materialSqft.toFixed(2) + " ৳";
    if (document.getElementById("sellingSqft")) document.getElementById("sellingSqft").innerText = sellingSqft.toFixed(2) + " ৳";
    if (document.getElementById("profitSqft")) document.getElementById("profitSqft").innerText = profitSqft.toFixed(2) + " ৳";
    if (document.getElementById("sellingPrice")) document.getElementById("sellingPrice").innerText = sellingPrice.toFixed(2) + " ৳";

    // Cutting Report UI Updates
    if (document.getElementById("outerSide186")) document.getElementById("outerSide186").innerText = outerSide186;
    if (document.getElementById("outerSide21")) document.getElementById("outerSide21").innerText = outerSide21;

    if (document.getElementById("outerTop186")) document.getElementById("outerTop186").innerText = outerTop186;
    if (document.getElementById("outerTop21")) document.getElementById("outerTop21").innerText = outerTop21;

    if (document.getElementById("outerBottom186")) document.getElementById("outerBottom186").innerText = outerBottom186;
    if (document.getElementById("outerBottom21")) document.getElementById("outerBottom21").innerText = outerBottom21;

    if (document.getElementById("shutterLock186")) document.getElementById("shutterLock186").innerText = shutterLock186;
    if (document.getElementById("shutterLock21")) document.getElementById("shutterLock21").innerText = shutterLock21;

    if (document.getElementById("shutterInterlock186")) document.getElementById("shutterInterlock186").innerText = shutterInterlock186;
    if (document.getElementById("shutterInterlock21")) document.getElementById("shutterInterlock21").innerText = shutterInterlock21;

    if (document.getElementById("shutterTop186")) document.getElementById("shutterTop186").innerText = shutterTop186;
    if (document.getElementById("shutterTop21")) document.getElementById("shutterTop21").innerText = shutterTop21;

    if (document.getElementById("shutterBottom186")) document.getElementById("shutterBottom186").innerText = shutterBottom186;
    if (document.getElementById("shutterBottom21")) document.getElementById("shutterBottom21").innerText = shutterBottom21;
}
