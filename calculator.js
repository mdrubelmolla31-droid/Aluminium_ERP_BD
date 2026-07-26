// =====================================
// EXACT ALUMNIUN CUTTING CALCULATOR (FINAL FIX)
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

    // 1. Read Inputs
    let getWinData = (wId, hId, qId) => {
        return {
            w: parseFloat(document.getElementById(wId)?.value) || 0,
            h: parseFloat(document.getElementById(hId)?.value) || 0,
            q: parseInt(document.getElementById(qId)?.value) || 0
        };
    };

    let wins = [
        getWinData("width", "height", "qty"),
        getWinData("width2", "height2", "qty2"),
        getWinData("width3", "height3", "qty3"),
        getWinData("width4", "height4", "qty4"),
        getWinData("width5", "height5", "qty5")
    ];

    // Totals for Material Costing & Details
    let totalOuterSide = 0;
    let totalOuterTop = 0;
    let totalGlass = 0;

    let heightFt186 = 0;
    let heightFt21 = 0;

    wins.forEach(win => {
        if (win.q > 0 && win.w > 0 && win.h > 0) {
            // One window running feet: Height = (H*2)/12 * Q, Width = (W/12) * Q
            let hRunningFt = ((win.h * 2) / 12) * win.q;
            let wRunningFt = (win.w / 12) * win.q;

            totalOuterSide += hRunningFt;
            totalOuterTop += wRunningFt;

            totalGlass += ((win.w * win.h) / 144) * win.q;

            // Vertical Bar Logic: Height <= 54 inch (4.5 ft) goes to 18.6 ft bar
            if (win.h <= 54) {
                heightFt186 += hRunningFt;
            } else {
                heightFt21 += hRunningFt;
            }
        }
    });

    // Outer Side = Lock = Interlock (Always Equal)
    let totalOuterBottom = totalOuterTop;
    let totalShutterLock = totalOuterSide;
    let totalShutterInterlock = totalOuterSide;

    // Outer Top = Outer Bottom = Shutter Top = Shutter Bottom (Always Equal)
    let totalShutterTop = totalOuterTop;
    let totalShutterBottom = totalOuterTop;

    let grandTotalAluminium = totalOuterSide + totalOuterTop + totalOuterBottom +
                            totalShutterLock + totalShutterInterlock +
                            totalShutterTop + totalShutterBottom;

    // 2. Cutting Report Calculations
    // 18.6 FT Column: Only full bars allowed. Excess feet moves to 21 FT pool.
    let full186Pcs = Math.floor(heightFt186 / 18.6);
    let excessFtFrom186 = heightFt186 % 18.6;

    // 21 FT Column for Height Items (Side, Lock, Interlock)
    let total21FtHeightPool = heightFt21 + excessFtFrom186;
    let full21PcsHeight = Math.floor(total21FtHeightPool / 21);
    let extra21FtHeight = Math.round(total21FtHeightPool % 21);

    // 21 FT Column for Width Items (Top & Bottom)
    let full21PcsWidth = Math.floor(totalOuterTop / 21);
    let extra21FtWidth = Math.round(totalOuterTop % 21);

    // Format Functions
    let format21Str = (pcs, extra) => {
        if (pcs > 0 && extra > 0) return `${pcs} Pcs + ${extra} ft`;
        if (pcs > 0) return `${pcs} Pcs`;
        if (extra > 0) return `${extra} ft`;
        return "-";
    };

    let str186Val = full186Pcs > 0 ? `${full186Pcs} Pcs` : "-";
    let str21HeightVal = format21Str(full21PcsHeight, extra21FtHeight);
    let str21WidthVal = format21Str(full21PcsWidth, extra21FtWidth);

    // Cost Calculation
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

    // 3. Update UI
    let setTxt = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerText = val; };

    // Material Details Outputs
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

    // Cutting Report Outputs
    // Height Group (Side, Lock, Interlock - ALL EXACT MATCH)
    setTxt("outerSide186", str186Val);
    setTxt("outerSide21", str21HeightVal);

    setTxt("shutterLock186", str186Val);
    setTxt("shutterLock21", str21HeightVal);

    setTxt("shutterInterlock186", str186Val);
    setTxt("shutterInterlock21", str21HeightVal);

    // Width Group (Top, Bottom - ALL EXACT MATCH)
    setTxt("outerTop186", "-");
    setTxt("outerTop21", str21WidthVal);

    setTxt("outerBottom186", "-");
    setTxt("outerBottom21", str21WidthVal);

    setTxt("shutterTop186", "-");
    setTxt("shutterTop21", str21WidthVal);

    setTxt("shutterBottom186", "-");
    setTxt("shutterBottom21", str21WidthVal);
}
