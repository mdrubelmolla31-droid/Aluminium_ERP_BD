// =====================================
// MATERIAL CALCULATOR (Square Feet Based)
// calculator.js
// =====================================

let rates = JSON.parse(localStorage.getItem("rates")) || [];

document.addEventListener("DOMContentLoaded", () => {
    loadDropdowns();
});

function loadDropdowns() {
    rates = JSON.parse(localStorage.getItem("rates")) || [];

    fillSelect("company", "company");
    fillSelect("series", "series");
    fillSelect("aluThickness", "aluThickness");
    fillSelect("aluColour", "aluColour");
    fillSelect("glassCompany", "glassCompany");
    fillSelect("glassThickness", "glassThickness");
    fillSelect("glassColour", "glassColour");
}

function fillSelect(id, key) {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = `<option value="">Select Option</option>`;

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
        (r.aluColour || "") === aluColour &&
        r.glassCompany === glassCompany &&
        r.glassThickness === glassThickness &&
        r.glassColour === glassColour
    );

    if (!setting) {
        alert("সিলেক্ট করা অপশন অনুযায়ী Admin Panel-এ কোনো Rate খুঁজে পাওয়া যায়নি!");
        return;
    }

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

    // Window Calculations (Length & Sqft)
    let calcWin = (w, h, q) => {
        if (q <= 0) return { alu: 0, glass: 0, oSide: 0, oTop: 0, oBot: 0, sLock: 0, sInter: 0, sTop: 0, sBot: 0 };
        let oSide = ((h * 2) / 12) * q;
        let oTop = (w / 12) * q;
        let oBot = (w / 12) * q;
        let sLock = ((h * 2) / 12) * q;
        let sInter = ((h * 2) / 12) * q;
        let sTop = (w / 12) * q;
        let sBot = (w / 12) * q;
        return {
            oSide, oTop, oBot, sLock, sInter, sTop, sBot,
            alu: oSide + oTop + oBot + sLock + sInter + sTop + sBot,
            glass: ((w * h) / 144) * q
        };
    };

    let w1 = calcWin(width, height, qty);
    let w2 = calcWin(width2, height2, qty2);
    let w3 = calcWin(width3, height3, qty3);
    let w4 = calcWin(width4, height4, qty4);
    let w5 = calcWin(width5, height5, qty5);

    let totalOuterSide = w1.oSide + w2.oSide + w3.oSide + w4.oSide + w5.oSide;
    let totalOuterTop = w1.oTop + w2.oTop + w3.oTop + w4.oTop + w5.oTop;
    let totalOuterBottom = w1.oBot + w2.oBot + w3.oBot + w4.oBot + w5.oBot;
    let totalShutterLock = w1.sLock + w2.sLock + w3.sLock + w4.sLock + w5.sLock;
    let totalShutterInterlock = w1.sInter + w2.sInter + w3.sInter + w4.sInter + w5.sInter;
    let totalShutterTop = w1.sTop + w2.sTop + w3.sTop + w4.sTop + w5.sTop;
    let totalShutterBottom = w1.sBot + w2.sBot + w3.sBot + w4.sBot + w5.sBot;

    let grandTotalAluminium = w1.alu + w2.alu + w3.alu + w4.alu + w5.alu;
    let totalGlass = w1.glass + w2.glass + w3.glass + w4.glass + w5.glass;

    // Cutting Report Calculations
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

    // Cost Calculation (All items based on Sqft)
    let aluminiumCost = totalGlass * (setting.aluRate || 0);
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
    let setTxt = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerText = val; };

    setTxt("outerSide", totalOuterSide.toFixed(2) + " ft");
    setTxt("outerTop", totalOuterTop.toFixed(2) + " ft");
    setTxt("outerBottom", totalOuterBottom.toFixed(2) + " ft");
    setTxt("shutterLock", totalShutterLock.toFixed(2) + " ft");
    setTxt("shutterInterlock", totalShutterInterlock.toFixed(2) + " ft");
    setTxt("shutterTop", totalShutterTop.toFixed(2) + " ft");
    setTxt("shutterBottom", totalShutterBottom.toFixed(2) + " ft");

    setTxt("totalAluminium", grandTotalAluminium.toFixed(2) + " ft");
    setTxt("glass", totalGlass.toFixed(2) + " Sqft");

    setTxt("aluCost", aluminiumCost.toFixed(2) + " ৳");
    setTxt("glassCost", glassCost.toFixed(2) + " ৳");
    setTxt("hardwareCost", hardwareCost.toFixed(2) + " ৳");
    setTxt("fittingsCost", fittingsCost.toFixed(2) + " ৳");
    setTxt("labourCost", labourCost.toFixed(2) + " ৳");
    setTxt("materialCost", materialCost.toFixed(2) + " ৳");
    setTxt("materialSqft", materialSqft.toFixed(2) + " ৳");
    setTxt("sellingSqft", sellingSqft.toFixed(2) + " ৳");
    setTxt("profitSqft", profitSqft.toFixed(2) + " ৳");
    setTxt("sellingPrice", sellingPrice.toFixed(2) + " ৳");

    // Cutting Report UI
    setTxt("outerSide186", outerSide186);
    setTxt("outerSide21", outerSide21);
    setTxt("outerTop186", outerTop186);
    setTxt("outerTop21", outerTop21);
    setTxt("outerBottom186", outerBottom186);
    setTxt("outerBottom21", outerBottom21);
    setTxt("shutterLock186", shutterLock186);
    setTxt("shutterLock21", shutterLock21);
    setTxt("shutterInterlock186", shutterInterlock186);
    setTxt("shutterInterlock21", shutterInterlock21);
    setTxt("shutterTop186", shutterTop186);
    setTxt("shutterTop21", shutterTop21);
    setTxt("shutterBottom186", shutterBottom186);
    setTxt("shutterBottom21", shutterBottom21);
}
